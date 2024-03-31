import { Router } from "express";
import { AuthController } from "../../controllers/authentication.controller";
import { validate } from "../../middleware/joi.middleware";
import { loginContract, signupContract } from "./contract";

const authRoutes = Router();
const authService = new AuthController();

authRoutes.post("/register", validate(signupContract), authService.signup);

authRoutes.post("/login", validate(loginContract), authService.login);

authRoutes.get("/logout", authService.logout);

export = authRoutes;
