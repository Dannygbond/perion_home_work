import { Router } from "express";
import { databaseProvider } from "..";
import { analyticsService } from "@src/controllers/analytics";

const analyticsRoutes = Router();

analyticsRoutes.get("/", analyticsService);

export default analyticsRoutes;
