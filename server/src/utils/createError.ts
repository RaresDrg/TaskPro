import type { ResponseError } from "../types/index.js";

export function createError(name: ResponseError["name"], message?: string) {
  const error = new Error(message);
  error.name = name;
  return error;
}
