import { writeLog } from "@src/controllers/logServices";
import { Router } from "express";
import { logValidator } from "@src/middlewares/logValidator";

const logRoutes = Router();

logRoutes.use(logValidator);
logRoutes.get("/", writeLog);

export default logRoutes;
