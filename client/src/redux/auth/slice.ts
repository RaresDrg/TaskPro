import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, Theme } from "../../App.types";
import { utils } from "../../utils/handleState";
import {
  register,
  login,
  logout,
  handleGoogleAuth,
  updateUser,
  changePassword,
} from "./operations";

const initialState: AuthState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      if (state.user) {
        state.user.theme = action.payload;
      }
    },
    forceLogout: (state) => {
      utils.handleLogout(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // *Register
      .addCase(register.pending, utils.handlePending)
      .addCase(register.rejected, utils.handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        utils.handleAuth(state, action);
      })
      // *Login
      .addCase(login.pending, utils.handlePending)
      .addCase(login.rejected, utils.handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        utils.handleAuth(state, action);
      })
      // *Logout
      .addCase(logout.pending, utils.handlePending)
      .addCase(logout.rejected, (state, action) => {
        utils.handleRejected(state, action);
        utils.handleLogout(state);
      })
      .addCase(logout.fulfilled, (state) => {
        utils.handleFulfilled(state);
        utils.handleLogout(state);
      })
      // *Handle Google Auth
      .addCase(handleGoogleAuth.rejected, utils.handleRejected)
      .addCase(handleGoogleAuth.fulfilled, utils.handleAuth)
      // *Change Password
      .addCase(changePassword.rejected, utils.handleRejected)
      .addCase(changePassword.fulfilled, utils.handleAuth)
      // *Update User
      .addCase(updateUser.rejected, utils.handleRejected)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;

        if (state.user) {
          state.user = {
            ...state.user,
            name: action.payload.data.user.name,
            email: action.payload.data.user.email,
            profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
          };
        }
      });
  },
});

export const { setTheme, forceLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
