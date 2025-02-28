import { Schema, model } from "mongoose";
import { UserType } from "../app.types";

const schema = new Schema<UserType>(
  {
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      trim: true,
      validate: [
        {
          validator: function (v) {
            return v?.trim().length > 0;
          },
          message: "=> this field is required",
        },
        {
          validator: function (v) {
            if (this.isGoogleUser) {
              return true;
            } else {
              return v?.trim().length >= 3 && v?.trim().length <= 50;
            }
          },
          message: "=> it must be between 3 and 50 characters long",
        },
      ],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: [
        {
          validator: function (v) {
            return v?.trim().length > 0;
          },
          message: "=> this field is required",
        },
        {
          validator: function (v) {
            return v && /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v.trim());
          },
          message: "=> Invalid email address",
        },
      ],
    },
    password: {
      type: String,
      default: null,
      validate: [
        {
          validator: function (v) {
            if (this.isGoogleUser) {
              return true;
            } else {
              return v?.length > 0;
            }
          },
          message: "=> this field is required",
        },
        {
          validator: function (v) {
            if (this.isGoogleUser) {
              return true;
            } else {
              return v && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
            }
          },
          message:
            "=> it must be at least 8 characters long and must include an uppercase, a lowercase and a digit",
        },
      ],
    },
    profilePhotoUrl: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: "violet",
      enum: {
        values: ["light", "dark", "violet"],
        message: "=> is either: light, dark or violet",
      },
    },
    token: {
      type: String,
      default: null,
    },
    validationToken: {
      type: {
        value: { type: String, required: true },
        expiresAt: { type: Date, required: true },
      },
      default: null,
    },
  },
  { versionKey: false }
);

const User = model<UserType>("user", schema);

export default User;
