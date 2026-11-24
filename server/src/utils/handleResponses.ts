import type { Response } from "express";
import type { ResponseError } from "../types/index.js";

export function sendSuccessResponse<T extends object>(
  res: Response,
  statusCode: 200 | 201,
  responseBody: T,
) {
  res.status(statusCode).json({ status: "success", ...responseBody });
}

export function sendFailureResponse(
  res: Response,
  statusCode: ResponseError["statusCode"],
  message: string,
) {
  res.status(statusCode).json({ status: "failed", message });
}
