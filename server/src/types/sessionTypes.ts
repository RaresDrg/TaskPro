import type { Types } from "mongoose";
import type { UserType } from "./userTypes.js";

type BaseSession = {
  _id: Types.ObjectId;
  owner: UserType["_id"];
  expiresAt: Date;
};

export type AuthSession = BaseSession & {
  type: "auth";
  accessToken: string;
  refreshToken: string;
};

export type ValidationSession = BaseSession & {
  type: "validation";
  validationToken: string;
};

export type SessionType = AuthSession | ValidationSession;
