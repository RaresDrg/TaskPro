import { Schema, model } from "mongoose";
import type { SessionType } from "../types/index.js";

const sessionSchema = new Schema<SessionType>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["auth", "validation"],
      immutable: true,
      required: true,
    },
    accessToken: {
      type: String,
      required: function (): boolean {
        return this.type === "auth";
      },
    },
    refreshToken: {
      type: String,
      required: function (): boolean {
        return this.type === "auth";
      },
    },
    validationToken: {
      type: String,
      required: function (): boolean {
        return this.type === "validation";
      },
    },
    expiresAt: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return value.getTime() > Date.now();
        },
        message: "expiresAt must be in the future",
      },
      expires: 0,
      required: true,
    },
  },
  { versionKey: false, strict: true },
);
sessionSchema.index({ owner: 1, type: 1 }, { unique: true });

const Session = model<SessionType>("Session", sessionSchema);

export default Session;
