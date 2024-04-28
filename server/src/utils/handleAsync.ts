import { Request, Response, NextFunction } from "express";

import { sendResponse } from "./response";

export const handleAsync =
  (
    asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFn(req, res, next);
    } catch (error: any) {
      next(sendResponse(res, 500, error.message, error));
    }
  };
