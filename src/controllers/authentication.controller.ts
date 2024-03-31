import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { cookieName } from "../utils/extra";

export class AuthController {
  async signup(request: Request, response: Response) {
    try {
      console.log(request.body);

      const { firstname, lastname, email, password, username } = request.body;

      const isUserAlreadyExists = await UserModel.findOne({
        $or: [{ email }, { username }],
      });

      if (isUserAlreadyExists) {
        return response.status(StatusCodes.BAD_REQUEST).send({
          status: false,
          message: "username or email already exists!",
        });
      }

      // Create a new UserProfile instance and set its properties
      const user = new UserModel();
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      user.username = username;

      // Save the new user profile to the database
      const userDetails = await user.save();

      // Return the success response with the user details
      return response.status(StatusCodes.OK).send({
        status: true,
        data: userDetails,
        message: "Signup Successfully!",
      });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }

  /**
   *
   * @param request username, password
   * @param response Jwt token
   * Flow:
   * check if user exist by using username
   * If exist match it's password
   * If password match create JWT token and send in response
   * else throw error
   */
  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const user = await UserModel.findOne({
        username,
      });

      if (!user) {
        // If user does not exist, return unauthorized response
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "User not exits!!" });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(
        password,
        String(user.password)
      );

      if (!isPasswordValid) {
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "password is invalid!" });
      }

      return response
        .cookie(cookieName, signJwt(user.id), {
          httpOnly: true,
          signed: true,
          secure: true,
          sameSite: "none",
        })
        .send({ status: true });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }

  async logout(_request: Request, response: Response) {
    try {
      // Clear the authentication cookie in the response
      response.clearCookie(cookieName, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
      });

      // Return a success response
      response.json({ status: true });
    } catch (error: Error | any) {
      // Return an error response if there's an issue with logging out
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}
