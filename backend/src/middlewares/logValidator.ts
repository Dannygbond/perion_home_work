import { NextFunction, Request, Response } from "express";

const logTypes = [
  "load",
  "adview",
  "adclick",
  "visitduration",
  "outoffocusduration",
  "pagevisitduration",
  "mouseout",
];

const logContent = {
  load: [
    "userId",
    "timestamp",
    "page",
    "isUnique",
    "lastVisit",
    "userAgent",
    "screenSize",
    "language",
    "timezone",
  ],
  adview: ["userId", "timestamp", "adId", "time"],
  adclick: ["userId", "timestamp", "adId", "redirectUrl"],
  visitduration: ["userId", "timestamp", "duration"],
  outoffocusduration: ["userId", "timestamp", "page", "duration", "time"],
  pagevisitduration: ["userId", "visitTime", "newPage", "page", "timestamp"],
  mouseout: ["userId", "timestamp", "page", "time"],
};

export const logValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, ...log } = req.query;
  const logType = (type as string).toLowerCase();
  if (!type) return res.status(400).send("Missing type");
  if (!logTypes.includes(logType)) return res.status(400).send("Invalid type");
  if (Object.keys(log).length === 0)
    return res.status(400).send("Missing log content");
  if (
    Object.keys(log).length !==
    logContent[logType as keyof typeof logContent].length
  )
    return res.status(400).send("Log Content Is Missing");
  if (
    Object.keys(log).some(
      (key) => !logContent[logType as keyof typeof logContent].includes(key)
    )
  )
    return res.status(400).send("Log Content Is Invalid");
  if (Object.values(log).some((value) => !value))
    return res.status(400).send("Log Content is Empty");
  next();
};
