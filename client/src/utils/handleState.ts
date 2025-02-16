import { PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  BoardsState,
  Column,
  UserDataResponse,
  ErrorResponse,
} from "../App.types";

export const utils = {
  handlePending: (state: AuthState | BoardsState) => {
    state.isLoading = true;
  },
  handleRejected: (
    state: AuthState | BoardsState,
    action: PayloadAction<unknown>
  ) => {
    state.isLoading = false;
    state.error =
      (action.payload as ErrorResponse)?.response?.data?.message ||
      "Internal server error";
  },
  handleFulfilled: (state: AuthState | BoardsState) => {
    state.isLoading = false;
    state.error = null;
  },
  handleError: (
    state: AuthState | BoardsState,
    action: PayloadAction<unknown>
  ) => {
    state.error =
      (action.payload as ErrorResponse)?.response?.data?.message ||
      "Internal server error";
  },
  handleLogout: (state: AuthState) => {
    state.isLoggedIn = false;
    state.user = null;
  },
  handleAuth: (state: AuthState, action: PayloadAction<UserDataResponse>) => {
    state.error = null;
    state.isLoggedIn = true;
    state.user = { ...action.payload.data.user };
  },
  handleColumns: (
    state: BoardsState,
    action: PayloadAction<{ data: { columns: Column[] } }>
  ) => {
    state.isLoading = false;
    state.error = null;

    if (state.board) {
      state.board.columns = action.payload.data.columns;
    }
  },
};
