import { Router } from "express";
import { PublicApiController } from "../../controllers/public-api.controller";

const publicApiRoutes = Router();

const publicApiService = new PublicApiController();

publicApiRoutes.get("/data", publicApiService.getPubliApiData);

export = publicApiRoutes;
