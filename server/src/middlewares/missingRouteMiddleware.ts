import type { RequestHandler } from "express";
import { createError } from "../utils/index.js";
import { envVariables } from "../config/index.js";

const missingRouteMiddleware: RequestHandler = (_req, _res, next) => {
  next(
    createError(
      "NotFoundError",
      `API route not found. Check the documentation at: ${envVariables.SERVER_URL}/api-docs`,
    ),
  );
};

export default missingRouteMiddleware;
