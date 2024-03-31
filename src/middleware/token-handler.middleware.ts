import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

interface IVerifyTokenResponse {
  userId: string;
}

const verifyToken = async (
  token: any
): Promise<IVerifyTokenResponse | null> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      throw new Error(`No JWT_SECRET exists`);
    }
    // Verify the token using the JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Middleware function to validate the route based on the JWT token
const validateRoute = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Get the JWT token from the request header
    const authCookie = request.signedCookies["AUTH_COOKIES"];

    // Verify the token and get the user credentials
    const userCreds = await verifyToken(authCookie);

    // Assign the user credentials to the `request.user` object
    request[`user`] = {
      userId: userCreds?.userId,
    };

    next();
  } catch (error: Error | any) {
    // Handle any errors that occur during token verification
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .send({ status: false, message: error.message });
  }
};

export { validateRoute };
