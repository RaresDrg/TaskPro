import { apiClient } from "../api";

type NewUserData = { name: string; email: string; password: string };
type LoginCredentials = { email: string; password: string };
type GoogleAuthData = { validationToken: string };
type PasswordForgotData = { email: string };
type PasswordChangeData = { password: string; validationToken: string };

export async function register(data: NewUserData) {
  const res = await apiClient.post("/auth/register", data);
  return res.data;
}

export async function login(data: LoginCredentials) {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await apiClient.delete("/auth/logout");
  return res.data;
}

export async function googleAuth(data: GoogleAuthData) {
  const res = await apiClient.post("/auth/google/finalize", data);
  return res.data;
}

export async function forgotPassword(data: PasswordForgotData) {
  const res = await apiClient.post("/auth/forgot-password", data);
  return res.data;
}

export async function changePassword(data: PasswordChangeData) {
  const res = await apiClient.patch("/auth/update-password", data);
  return res.data;
}
