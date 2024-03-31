import { Router } from "express";
import authRoutes from "./authentication";
import publicApiRoutes from "./publicapis";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);

apiRoutes.use("/public-api", publicApiRoutes);

export = apiRoutes;
