import corsMiddleware from "./corsMiddleware.js";
import cookieParserMiddleware from "./cookieParserMiddleware.js";
import loggerMiddleware from "./loggerMiddleware.js";
import missingRouteMiddleware from "./missingRouteMiddleware.js";
import errorMiddleware from "./errorMiddleware.js";
import jwtAuthMiddleware from "./jwtAuthMiddleware.js";
import { profilePhotoMiddleware } from "./multipartMiddleware.js";
import validateTokenMiddleware from "./validateTokenMiddleware.js";
import googleAuthMiddleware from "./googleAuthMiddleware.js";

export {
  corsMiddleware,
  cookieParserMiddleware,
  loggerMiddleware,
  missingRouteMiddleware,
  errorMiddleware,
  jwtAuthMiddleware,
  validateTokenMiddleware,
  profilePhotoMiddleware,
  googleAuthMiddleware,
};
