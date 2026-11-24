import type { ErrorRequestHandler } from "express";
import type { ResponseError } from "../types/index.js";
import { sendFailureResponse } from "../utils/index.js";
import { JSON_BODY_LIMIT, PROFILE_PHOTO_MAX_SIZE } from "../constants/index.js";

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode: ResponseError["statusCode"];
  let message: string;

  switch (error.name as ResponseError["name"]) {
    case "ValidationError":
      statusCode = 400;
      message = error.message;
      break;
    case "MulterError":
      statusCode = 400;
      message =
        error.code === "LIMIT_FILE_SIZE"
          ? `Profile photo must be smaller than ${PROFILE_PHOTO_MAX_SIZE / 1_000_000} MB`
          : error.message;
      break;
    case "CastError":
      statusCode = 400;
      message = `Invalid ID format — it must be a 24-character hexadecimal string`;
      break;
    case "SyntaxError":
      if (error.type === "entity.parse.failed") {
        statusCode = 400;
        message = "Invalid request body — it must be valid JSON format";
      } else {
        statusCode = 500;
        message = "Internal server error";
        console.error("❌ [Syntax Error]");
        console.error(error);
      }
      break;
    case "UnauthorizedError":
      statusCode = 401;
      message = error.message;
      break;
    case "ForbiddenError":
      statusCode = 403;
      message = error.message;
      break;
    case "NotFoundError":
      statusCode = 404;
      message = error.message;
      break;
    case "ConflictError":
      statusCode = 409;
      message = error.message;
      break;
    case "PayloadTooLargeError":
      statusCode = 413;
      message = `Payload too large — maximum allowed is ${JSON_BODY_LIMIT}`;
      break;
    case "UnsupportedMediaTypeError":
      statusCode = 415;
      message = "Unsupported Media Type — only application/json is allowed";
      break;
    case "RateLimitError":
      statusCode = 429;
      message = error.message;
      break;
    case "InternalServerError":
      statusCode = 500;
      message = `We're experiencing technical difficulties. Please try again later`;
      break;
    case "BadGatewayError":
      statusCode = 502;
      message = `We're experiencing issues with an external service. Please try again later`;
      break;
    default:
      statusCode = 500;
      message = "Internal server error";
      console.error("❌ [Unhandled error]");
      console.error(error);
  }

  sendFailureResponse(res, statusCode, message);
};

export default errorMiddleware;
