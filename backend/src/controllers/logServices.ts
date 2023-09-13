import { Request, Response } from "express";
import { databaseProvider } from "..";

const isDevelopemnt = process.env.NODE_ENV === "development";

export const writeLog = async (req: Request, res: Response) => {
  const { type, ...log } = req.query;

  try {
    const newRecord = await databaseProvider.createRecord(type as string, log);

    if (type === "adClick") res.redirect(log.redirectUrl as string);
    res.status(200).send();

    console.log(`[INFO] ::: Log '${type}' Saved:\n`, newRecord);
  } catch (error) {
    if (isDevelopemnt) res.status(500).send(error);
    else res.status(500).send("Internal Server Error");

    console.log(`[ERROR] ::: Log Failed : ${error.message}\n `);
    console.log(`[ERROR] ::: Log '${type}' Faild:\n`, log);
  }
};
