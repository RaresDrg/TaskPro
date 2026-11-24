import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types";

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
    setAuthenticatedUser(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setUserTheme(state, action: PayloadAction<User["theme"]>) {
      if (state.user) state.user.theme = action.payload;
    },
    setUserProfile(
      state,
      action: PayloadAction<Pick<User, "name" | "email" | "profilePhotoID">>,
    ) {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { actions, reducer } = authSlice;
