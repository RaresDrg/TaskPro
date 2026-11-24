import crypto from "crypto";
import { envVariables } from "../config/index.js";

export function generateRandomBytes() {
  return crypto.randomBytes(envVariables.RANDOM_BYTES_LENGTH).toString("hex");
}
