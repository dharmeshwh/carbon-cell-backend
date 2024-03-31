import express, { Request, Response } from "express";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());

app.use(cookieParser("CookieSecret"));

app.use("/", apiRoutes);

app.get("/status", (_request: Request, response: Response) => {
  return response
    .status(StatusCodes.OK)
    .send({ status: true, message: "server is running" });
});

export = app;
