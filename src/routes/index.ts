import { Router } from "express";
import authRoutes from "./authentication";
import publicApiRoutes from "./publicapis";
import { validateRoute } from "../middleware/token-handler.middleware";

const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);

apiRoutes.use("/public-api", validateRoute, publicApiRoutes);

export = apiRoutes;
