import apiClient from "../../utils/config-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../../utils/utils";
import { Theme } from "../../App.types";

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      await delay(2500);
      const response = await apiClient.post("/api/users/register", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; loginPassword: string }, thunkAPI) => {
    try {
      await delay(2500);
      const response = await apiClient.post("/api/users/login", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await delay(1500);
    const response = await apiClient.delete("/api/users/logout");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const handleGoogleAuth = createAsyncThunk(
  "auth/handleGoogleAuth",
  async (validationToken: string, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/api/users/google-auth/getUser?validationToken=${validationToken}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    updates: { name: string; email: string; profilePhoto: null | File },
    thunkAPI
  ) => {
    try {
      const response = await apiClient.put("/api/users/profile", updates, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: { validationToken: string; password: string }, thunkAPI) => {
    const { validationToken, password } = data;

    try {
      const response = await apiClient.patch(
        `/api/users/update-password?validationToken=${validationToken}`,
        { password }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateTheme = (theme: Theme) => {
  apiClient.patch("/api/users/theme", { theme });
};
const reachCustomerSupport = async (comment: string) => {
  const response = await apiClient.post("/api/users/support", { comment });
  return response.data;
};
const handleForgotPassword = async (email: string) => {
  const res = await apiClient.post("/api/users/forgot-password", { email });
  return res.data;
};

export { updateTheme, reachCustomerSupport, handleForgotPassword };
