import { apiClient } from "../api";
import type { Board, Column, Card } from "../types";

type BoardData = Pick<Board, "title" | "icon" | "background">;
type BoardID = Board["id"];
type ColumnData = Pick<Column, "title">;
type ColumnID = Column["id"];
type CardData = Pick<Card, "title" | "description" | "priority" | "deadline">;
type CardID = Card["id"];

export async function addBoard(data: BoardData) {
  const res = await apiClient.post("/boards", data);
  return res.data;
}

export async function getBoards() {
  const res = await apiClient.get("/boards");
  return res.data;
}

export async function getBoard(boardID: BoardID) {
  const res = await apiClient.get(`/boards/${boardID}`);
  return res.data;
}

export async function updateBoard(boardID: BoardID, data: BoardData) {
  const res = await apiClient.patch(`/boards/${boardID}`, data);
  return res.data;
}

export async function deleteBoard(boardID: BoardID) {
  const res = await apiClient.delete(`/boards/${boardID}`);
  return res.data;
}

export async function addColumn(boardID: BoardID, data: ColumnData) {
  const res = await apiClient.post(`/boards/${boardID}/columns`, data);
  return res.data;
}

export async function updateColumn(
  boardID: BoardID,
  columnID: ColumnID,
  data: ColumnData,
) {
  const res = await apiClient.patch(
    `/boards/${boardID}/columns/${columnID}`,
    data,
  );
  return res.data;
}

export async function deleteColumn(boardID: BoardID, columnID: ColumnID) {
  const res = await apiClient.delete(`/boards/${boardID}/columns/${columnID}`);
  return res.data;
}

export async function addCard(
  boardID: BoardID,
  columnID: ColumnID,
  data: CardData,
) {
  const res = await apiClient.post(
    `/boards/${boardID}/columns/${columnID}/cards`,
    data,
  );
  return res.data;
}

export async function updateCard(
  boardID: BoardID,
  columnID: ColumnID,
  cardID: CardID,
  data: CardData,
) {
  const res = await apiClient.patch(
    `/boards/${boardID}/columns/${columnID}/cards/${cardID}`,
    data,
  );
  return res.data;
}

export async function deleteCard(
  boardID: BoardID,
  columnID: ColumnID,
  cardID: CardID,
) {
  const res = await apiClient.delete(
    `/boards/${boardID}/columns/${columnID}/cards/${cardID}`,
  );
  return res.data;
}
