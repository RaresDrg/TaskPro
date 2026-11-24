import { Session } from "../models/index.js";
import type {
  AuthSession,
  ValidationSession,
  AtLeastOne,
  UserType,
} from "../types/index.js";

type SessionData = Omit<AuthSession, "_id"> | Omit<ValidationSession, "_id">;

type Query =
  | AtLeastOne<AuthSession, "_id" | "accessToken" | "refreshToken">
  | AtLeastOne<ValidationSession, "_id" | "validationToken">
  | Pick<AuthSession | ValidationSession, "owner" | "type">;

type Owner = UserType | null;

export async function addSession(data: SessionData) {
  await Session.deleteOne({ owner: data.owner, type: data.type });
  return Session.create(data);
}

export function findSession(query: Query) {
  return Session.findOne(query).populate<{ owner: Owner }>("owner");
}

export function findSessionAndDelete(query: Query) {
  return Session.findOneAndDelete(query).populate<{ owner: Owner }>("owner");
}

export function updateSession(query: Query, data: SessionData) {
  return Session.findOneAndUpdate(query, data, {
    returnDocument: "after",
    runValidators: true,
  });
}

export function deleteSession(query: Query) {
  return Session.findOneAndDelete(query);
}
