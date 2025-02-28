import corsMiddleware from "./corsMiddleware";
import cookieParserMiddleware from "./cookieParserMiddleware";
import loggerMiddleware from "./loggerMiddleware";
import missingRouteMiddleware from "./missingRouteMiddleware";
import errorMiddleware from "./errorMiddleware";
import jwtAuthMiddleware from "./jwtAuthMiddleware";
import { profilePhotoMiddleware } from "./multipartMiddleware";
import validateTokenMiddleware from "./validateTokenMiddleware";

export {
  corsMiddleware,
  cookieParserMiddleware,
  loggerMiddleware,
  missingRouteMiddleware,
  errorMiddleware,
  jwtAuthMiddleware,
  validateTokenMiddleware,
  profilePhotoMiddleware,
};
