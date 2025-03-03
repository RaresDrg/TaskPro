import User from "../models/User.js";
import { UserType } from "../app.types.js";
import { FilterQuery } from "mongoose";
import { hash } from "../utils/utils.js";

export function addUsertoDB(
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
