import express from "express";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser("CookieSecret"));

app.use("/", apiRoutes);

export = app;
