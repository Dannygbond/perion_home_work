import { Request, Response, NextFunction } from "express";

export const cors = (req: Request, res: Response, next: NextFunction) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  res.setHeader(
    "Access-Control-Allow-Origin",
    isDevelopment ? "*" : "https://localhost"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};
