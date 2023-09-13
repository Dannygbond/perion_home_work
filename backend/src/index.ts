import Express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import logRoutes from "./routes/logRoutes";
import { cors } from "./middlewares/security";
import PostgreSQLDB from "./modules/database/postgresql";
import analyticsRoutes from "./routes/analyticsRoutes";

config();
const app = Express();
export const databaseProvider = new PostgreSQLDB();
const port = process.env.PORT || 5000;

databaseProvider
  .connect()
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(`[ERROR] ::: ${error.message}`));

app.use(cors);

app.use("/log", logRoutes);
app.use("/analytics", analyticsRoutes);

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
