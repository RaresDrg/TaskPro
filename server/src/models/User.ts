import { Schema, model } from "mongoose";
import { AUTH_METHODS, THEMES } from "../constants/index.js";
import type { UserType } from "../types/index.js";

const userSchema = new Schema<UserType>(
  {
    authMethod: {
      type: String,
      enum: AUTH_METHODS,
      immutable: true,
      required: true,
    },
    theme: {
      type: String,
      enum: THEMES,
      default: "violet",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: function (): boolean {
        return this.authMethod === "local";
      },
    },
    profilePhotoID: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        const { authMethod, theme, name, email, profilePhotoID } = ret;
        return { authMethod, theme, name, email, profilePhotoID };
      },
    },
  },
);

const User = model<UserType>("User", userSchema);

export default User;
