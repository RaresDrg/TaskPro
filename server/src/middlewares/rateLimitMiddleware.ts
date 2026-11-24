import type { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import { getClientIp, createError } from "../utils/index.js";
import { envVariables } from "../config/index.js";

function createLimiter(options: Parameters<typeof rateLimit>[0]) {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => getClientIp(req),
    handler: (req, _res, next) => {
      let errorMessage: string;
      const resetTime = req.rateLimit?.resetTime;
      if (!resetTime) {
        errorMessage = "Too many requests — try again later";
      } else {
        const remainingTime = resetTime.getTime() - Date.now();
        const remainingMinutes = Math.ceil(remainingTime / 1000 / 60);
        errorMessage = `Too many requests — try again in ${remainingMinutes} ${remainingMinutes === 1 ? "minute" : "minutes"}`;
      }
      next(createError("RateLimitError", errorMessage));
    },
    ...options,
  });
}

const LIMITERS = {
  registerLimiter: createLimiter({ windowMs: 10 * 60 * 1000, limit: 5 }),
  loginLimiter: createLimiter({ windowMs: 15 * 60 * 1000, limit: 10 }),
  forgotPasswordLimiter: createLimiter({ windowMs: 30 * 60 * 1000, limit: 5 }),
  supportLimiter: createLimiter({ windowMs: 60 * 60 * 1000, limit: 5 }),
  profilePhotoLimiter: createLimiter({ windowMs: 10 * 60 * 1000, limit: 10 }),
  generalLimiter: createLimiter({ windowMs: 1 * 60 * 1000, limit: 100 }),
};

const EXCLUDED_FROM_LIMITING = [
  { method: "GET", path: "/" },
  { method: "GET", path: "/api-docs", prefix: true },
  { method: "GET", path: "/health-check" },
  { method: "HEAD", path: "/health-check" },
];

const rateLimitMiddleware: RequestHandler = (req, res, next) => {
  if (envVariables.IN_DEVELOPMENT) return next();

  const path = req.path.toLowerCase().replace(/\/+$/, "") || "/";

  const isExcluded = EXCLUDED_FROM_LIMITING.some((rule) => {
    return rule.prefix
      ? req.method === rule.method && path.startsWith(rule.path)
      : req.method === rule.method && path === rule.path;
  });
  if (isExcluded) return next();

  switch (`${req.method} ${path}`) {
    case "POST /api/auth/register":
      return LIMITERS.registerLimiter(req, res, next);
    case "POST /api/auth/login":
      return LIMITERS.loginLimiter(req, res, next);
    case "POST /api/auth/forgot-password":
      return LIMITERS.forgotPasswordLimiter(req, res, next);
    case "POST /api/support":
      return LIMITERS.supportLimiter(req, res, next);
    case "PATCH /api/users/profile":
      return LIMITERS.profilePhotoLimiter(req, res, next);
    default:
      return LIMITERS.generalLimiter(req, res, next);
  }
};

export default rateLimitMiddleware;
