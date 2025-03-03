import Board from "../models/Board.js";
import { FilterQuery } from "mongoose";
import { BoardType, ColumnType, CardType } from "../app.types.js";

export function findDocument(query: FilterQuery<BoardType>) {
  return Board.findOne(query);
}

export function addBoardToDB(
  data: Pick<BoardType, "title" | "icon" | "background" | "owner">
) {
  return Board.create(data);
}

export function getBoardsListFromDB(owner: string) {
  return Board.find({ owner }, { _id: 1, title: 1, icon: 1 });
}

export function deleteBoardFromDB(boardId: string) {
  return Board.findByIdAndDelete(boardId);
}

export function updateBoardInDB(
  boardId: string,
  updates: Pick<BoardType, "title" | "icon" | "background">
) {
  return Board.findByIdAndUpdate(boardId, updates, {
    new: true,
    runValidators: true,
  });
}

export function addColumnToDB(
  boardId: string,
  newColumn: Pick<ColumnType, "title">
) {
  return Board.findByIdAndUpdate(
    boardId,
    { $push: { columns: newColumn } },
    { new: true, runValidators: true }
  );
}

export function deleteColumnFromDB(ids: { boardId: string; columnId: string }) {
  return Board.findOneAndUpdate(
    { _id: ids.boardId, "columns._id": ids.columnId },
    { $pull: { columns: { _id: ids.columnId } } },
    { new: true }
  );
}

export function updateColumnInDB(
  ids: { boardId: string; columnId: string },
  updatedTitle: string
) {
  const { boardId, columnId } = ids;

  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    { $set: { "columns.$[column].title": updatedTitle } },
    {
      arrayFilters: [{ "column._id": columnId }],
      new: true,
      runValidators: true,
    }
  );
}

export function updateColumnsInDB(
  boardId: string,
  updatedColumns: ColumnType[]
) {
  return Board.findByIdAndUpdate(
    boardId,
    { columns: updatedColumns },
    { new: true, runValidators: true }
  );
}

export function addCardToDB(
  ids: { boardId: string; columnId: string },
  newCard: Pick<CardType, "title" | "description" | "priority" | "deadline">
) {
  return Board.findOneAndUpdate(
    { _id: ids.boardId, "columns._id": ids.columnId },
    { $push: { "columns.$[column].cards": newCard } },
    {
      arrayFilters: [{ "column._id": ids.columnId }],
      new: true,
      runValidators: true,
    }
  );
}

export function deleteCardFromDB(ids: {
  boardId: string;
  columnId: string;
  cardId: string;
}) {
  const { boardId, columnId, cardId } = ids;

  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId, "columns.cards._id": cardId },
    { $pull: { "columns.$[column].cards": { _id: cardId } } },
    { arrayFilters: [{ "column._id": columnId }], new: true }
  );
}

export function updateCardInDB(
  ids: { boardId: string; columnId: string; cardId: string },
  updates: Pick<CardType, "title" | "description" | "priority" | "deadline">
) {
  const { boardId, columnId, cardId } = ids;

  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId, "columns.cards._id": cardId },
    {
      $set: {
        "columns.$[column].cards.$[card].title": updates.title,
        "columns.$[column].cards.$[card].description": updates.description,
        "columns.$[column].cards.$[card].priority": updates.priority,
        "columns.$[column].cards.$[card].deadline": updates.deadline,
      },
    },
    {
      arrayFilters: [{ "column._id": columnId }, { "card._id": cardId }],
      new: true,
      runValidators: true,
    }
  );
}
