import { Request, Response, NextFunction } from "express";
import { sendFailureResponse } from "../utils/utils.js";

const missingRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  sendFailureResponse(res, 404, "Not found");
};

export default missingRouteMiddleware;
