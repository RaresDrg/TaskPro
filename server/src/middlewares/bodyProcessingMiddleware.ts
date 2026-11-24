import { json, type RequestHandler } from "express";
import { JSON_BODY_LIMIT } from "../constants/index.js";
import { createError } from "../utils/index.js";

const EXCLUDED_ENDPOINTS = [{ method: "PATCH", path: "/api/users/profile" }];

const validateJsonContentType: RequestHandler = (req, _res, next) => {
  const isExcluded = EXCLUDED_ENDPOINTS.some(
    (endpoint) => endpoint.method === req.method && endpoint.path === req.path,
  );
  if (isExcluded) return next();

  const isInvalid =
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    !req.headers["content-type"]?.includes("application/json");
  if (isInvalid) return next(createError("UnsupportedMediaTypeError"));

  next();
};

const ensureBody: RequestHandler = (req, _res, next) => {
  req.body ??= {};
  next();
};

const bodyProcessingMiddleware = [
  validateJsonContentType,
  json({ limit: JSON_BODY_LIMIT }),
  ensureBody,
];

export default bodyProcessingMiddleware;
