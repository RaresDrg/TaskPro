import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BoardsState, Board, Column, Card } from "../../types";

const initialState: BoardsState = {
  boardsList: null,
  board: null,
  column: null,
  card: null,
  filter: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
    setBoardsList(state, action: PayloadAction<BoardsState["boardsList"]>) {
      state.boardsList = action.payload;
    },
    setBoard(state, action: PayloadAction<Board>) {
      if (state.board?.id !== action.payload.id) state.filter = null;
      state.board = action.payload;
    },
    setColumn(state, action: PayloadAction<Column>) {
      state.column = action.payload;
    },
    setCard(state, action: PayloadAction<Card>) {
      state.card = action.payload;
    },
    setFilter(state, action: PayloadAction<BoardsState["filter"]>) {
      state.filter = action.payload;
    },
  },
});

export const { actions, reducer } = boardsSlice;
