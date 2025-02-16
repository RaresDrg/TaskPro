import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardsState, Column, Card, CardPriority } from "../../App.types";
import { utils } from "../../utils/handleState";
import {
  addBoard,
  getBoardsList,
  getBoard,
  deleteBoard,
  updateBoard,
  updateBoardColumns,
  addColumn,
  deleteColumn,
  updateColumn,
  addCard,
  deleteCard,
  updateCard,
} from "./operations";

const initialState: BoardsState = {
  isLoading: false,
  error: null,
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
    setTargetedColumn: (state, action: PayloadAction<Column>) => {
      state.column = action.payload;
    },
    setTargetedCard: (state, action: PayloadAction<Card>) => {
      state.card = action.payload;
    },
    setFilter: (state, action: PayloadAction<null | CardPriority>) => {
      state.filter = action.payload;
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      if (state.board) {
        state.board.columns = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // *Add board
      .addCase(addBoard.pending, utils.handlePending)
      .addCase(addBoard.rejected, utils.handleRejected)
      .addCase(addBoard.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.boardsList = action.payload.data.boardsList;
        state.board = action.payload.data.board;
        state.filter = null;
      })
      // *Get list
      .addCase(getBoardsList.rejected, (state, action) => {
        utils.handleError(state, action);
        state.boardsList = null;
      })
      .addCase(getBoardsList.fulfilled, (state, action) => {
        state.error = null;
        state.boardsList = action.payload.data;
      })
      // *Get board
      .addCase(getBoard.rejected, (state, action) => {
        utils.handleError(state, action);
        state.board = null;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.error = null;
        state.board = action.payload.data;
        state.filter = null;
      })
      // *Delete board
      .addCase(deleteBoard.pending, utils.handlePending)
      .addCase(deleteBoard.rejected, utils.handleRejected)
      .addCase(deleteBoard.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.boardsList = action.payload.data;
      })
      // *Update board
      .addCase(updateBoard.pending, utils.handlePending)
      .addCase(updateBoard.rejected, utils.handleRejected)
      .addCase(updateBoard.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.board = action.payload.data.board;
        state.boardsList = action.payload.data.boardsList;
      })

      // *Update board columns
      .addCase(updateBoardColumns.rejected, utils.handleError)
      .addCase(updateBoardColumns.fulfilled, utils.handleColumns)

      // *Add column
      .addCase(addColumn.pending, utils.handlePending)
      .addCase(addColumn.rejected, utils.handleRejected)
      .addCase(addColumn.fulfilled, utils.handleColumns)
      // *Delete column
      .addCase(deleteColumn.pending, utils.handlePending)
      .addCase(deleteColumn.rejected, utils.handleRejected)
      .addCase(deleteColumn.fulfilled, utils.handleColumns)
      // *Update column
      .addCase(updateColumn.pending, utils.handlePending)
      .addCase(updateColumn.rejected, utils.handleRejected)
      .addCase(updateColumn.fulfilled, utils.handleColumns)

      // *Add card
      .addCase(addCard.pending, utils.handlePending)
      .addCase(addCard.rejected, utils.handleRejected)
      .addCase(addCard.fulfilled, utils.handleColumns)
      // *Delete card
      .addCase(deleteCard.pending, utils.handlePending)
      .addCase(deleteCard.rejected, utils.handleRejected)
      .addCase(deleteCard.fulfilled, utils.handleColumns)
      // *Update card
      .addCase(updateCard.pending, utils.handlePending)
      .addCase(updateCard.rejected, utils.handleRejected)
      .addCase(updateCard.fulfilled, utils.handleColumns);
  },
});

export const { setTargetedColumn, setTargetedCard, setFilter, setColumns } =
  boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
