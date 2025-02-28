import User from "../models/User";
import { FilterQuery } from "mongoose";
import { UserType } from "../app.types";
import { hash } from "../utils/utils";

export async function addUsertoDB(
  data: Pick<UserType, "name" | "email" | "password">
) {
  return User.create({
    name: data.name,
    email: data.email,
    password: hash(data.password),
  });
}

export function updateUser(userId: string, updates: Partial<UserType>) {
  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });
}

export function findUser(query: FilterQuery<UserType>) {
  return User.findOne(query);
}

export function addGoogleUserToDB(
  data: Pick<UserType, "isGoogleUser" | "name" | "email" | "profilePhotoUrl">
) {
  return User.create(data);
}
