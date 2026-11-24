import type { Request } from "express";
import { envVariables } from "../config/index.js";

export function getClientIp(req: Request) {
  const ip = envVariables.IN_DEVELOPMENT
    ? req.ip
    : (req.headers["x-forwarded-for"] as string)?.split(",")[0];
  return ip ?? "unknown";
}
