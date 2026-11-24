import type { RateLimitInfo } from "express-rate-limit";
import type { BaseUser, UserType } from "./userTypes.js";

declare global {
  namespace Express {
    interface Request {
      rateLimit?: RateLimitInfo;
    }
    interface User extends BaseUser {
      authMethod: UserType["authMethod"];
      password?: string;
    }
  }
}
