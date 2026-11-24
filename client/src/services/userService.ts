import { apiClient } from "../api";
import type { User } from "../types";

type UserThemeData = Pick<User, "theme">;
type UserProfileData = {
  name: User["name"];
  email?: User["email"];
  profilePhoto?: File;
};

export async function updateUserTheme(data: UserThemeData) {
  const res = await apiClient.patch("/users/theme", data);
  return res.data;
}

export async function updateUserProfile(data: UserProfileData) {
  const res = await apiClient.patch("/users/profile", data, {
    headers: {
      "Content-Type": data.profilePhoto
        ? "multipart/form-data"
        : "application/json",
    },
  });
  return res.data;
}
