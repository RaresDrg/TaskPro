import apiClient from "../../utils/config-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BoardValues, ColumnValues, CardValues, Column } from "../../App.types";

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (newBoard: BoardValues, thunkAPI) => {
    try {
      const response = await apiClient.post("/api/boards", newBoard);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBoardsList = createAsyncThunk(
  "boards/getList",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/api/boards");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBoard = createAsyncThunk(
  "boards/getBoard",
  async (boardId: string, thunkAPI) => {
    try {
      const response = await apiClient.get(`/api/boards/${boardId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId: string, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/api/boards/${boardId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (data: { boardId: string; updates: BoardValues }, thunkAPI) => {
    const { boardId, updates } = data;

    try {
      const response = await apiClient.put(`/api/boards/${boardId}`, updates);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBoardColumns = createAsyncThunk(
  "boards/updateBoardColumns",
  async (data: { boardId: string; updatedColumns: Column[] }, thunkAPI) => {
    const { boardId, updatedColumns } = data;

    try {
      const response = await apiClient.put(`/api/boards/${boardId}/columns`, {
        columns: updatedColumns,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addColumn = createAsyncThunk(
  "boards/addBoardColumn",
  async (data: { boardId: string; column: ColumnValues }, thunkAPI) => {
    const { boardId, column } = data;

    try {
      const response = await apiClient.post(
        `/api/boards/${boardId}/columns`,
        column
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "boards/deleteBoardColumn",
  async (data: { boardId: string; columnId: string }, thunkAPI) => {
    const { boardId, columnId } = data;

    try {
      const response = await apiClient.delete(
        `/api/boards/${boardId}/columns/${columnId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColumn = createAsyncThunk(
  "boards/updateBoardColumn",
  async (
    data: { boardId: string; columnId: string; updates: ColumnValues },
    thunkAPI
  ) => {
    const { boardId, columnId, updates } = data;

    try {
      const response = await apiClient.patch(
        `/api/boards/${boardId}/columns/${columnId}`,
        updates
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addCard = createAsyncThunk(
  "boards/addBoardColumnCard",
  async (
    data: { boardId: string; columnId: string; newCard: CardValues },
    thunkAPI
  ) => {
    const { boardId, columnId, newCard } = data;

    try {
      const response = await apiClient.post(
        `/api/boards/${boardId}/columns/${columnId}/cards`,
        newCard
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "boards/deleteBoardColumnCard",
  async (
    data: { boardId: string; columnId: string; cardId: string },
    thunkAPI
  ) => {
    const { boardId, columnId, cardId } = data;

    try {
      const response = await apiClient.delete(
        `/api/boards/${boardId}/columns/${columnId}/cards/${cardId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCard = createAsyncThunk(
  "boards/updateBoardColumnCard",
  async (
    data: {
      boardId: string;
      columnId: string;
      cardId: string;
      updates: CardValues;
    },
    thunkAPI
  ) => {
    const { boardId, columnId, cardId, updates } = data;

    try {
      const response = await apiClient.patch(
        `/api/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
        updates
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
