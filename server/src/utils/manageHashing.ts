import bcrypt from "bcrypt";
import { envVariables } from "../config/index.js";

export function hash(text: string) {
  return bcrypt.hash(text, envVariables.SALT_ROUNDS);
}

export function compareHashedData(plainText: string, hashedText: string) {
  return bcrypt.compare(plainText, hashedText);
}
