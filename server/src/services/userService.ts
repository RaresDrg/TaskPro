import { User } from "../models/index.js";
import type { LocalUser, GoogleUser, AtLeastOne } from "../types/index.js";
import { createError } from "../utils/createError.js";

type NewUserData =
  | Pick<LocalUser, "authMethod" | "name" | "email" | "password">
  | (Pick<GoogleUser, "authMethod" | "name" | "email"> &
      Partial<Pick<GoogleUser, "profilePhotoID" | "_id">>);

type UserUpdatesData =
  | AtLeastOne<
      LocalUser,
      "name" | "email" | "password" | "theme" | "profilePhotoID"
    >
  | AtLeastOne<GoogleUser, "name" | "email" | "theme" | "profilePhotoID">;

type Query = AtLeastOne<LocalUser | GoogleUser, "_id" | "email">;

export async function addUser(data: NewUserData) {
  try {
    return await User.create(data);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      throw createError(
        "ConflictError",
        "Email address is already in use by another account",
      );
    }
    throw error;
  }
}

export function findUser(query: Query) {
  return User.findOne(query);
}

export async function updateUser(query: Query, data: UserUpdatesData) {
  try {
    return await User.findOneAndUpdate(query, data, {
      returnDocument: "after",
      runValidators: true,
    });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      throw createError(
        "ConflictError",
        "Email address is already in use by another account",
      );
    }
    throw error;
  }
}
