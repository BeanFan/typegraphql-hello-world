import { Request, Response } from "express";
import { createAuthorsLoader } from "../modules/utils/authorLoader";

export interface MyContext {
  req: Request;
  res: Response;
  authorsLoader: ReturnType<typeof createAuthorsLoader>;
}
