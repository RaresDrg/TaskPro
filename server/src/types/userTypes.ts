import type { Types } from "mongoose";
import type { THEMES } from "../constants/index.js";

export type BaseUser = {
  _id: Types.ObjectId;
  theme: (typeof THEMES)[number];
  name: string;
  email: string;
  profilePhotoID: string | null;
};

export type LocalUser = BaseUser & { authMethod: "local"; password: string };

export type GoogleUser = BaseUser & { authMethod: "google" };

export type UserType = LocalUser | GoogleUser;
