import { Board } from "../models/index.js";
import type { BoardType, ColumnType, CardType } from "../types/index.js";
import { createError } from "../utils/createError.js";

type NewBoardData = Pick<BoardType, "owner" | "title" | "icon" | "background">;
type BoardUpdatesData =
  Pick<BoardType, "title" | "icon" | "background"> | Pick<BoardType, "columns">;

type ColumnData = Pick<ColumnType, "title">;

type CardData = Pick<
  CardType,
  "title" | "description" | "priority" | "deadline"
>;

type Query = {
  owner: BoardType["owner"];
  _id: BoardType["_id"];
  "columns._id"?: ColumnType["_id"];
  "columns.cards._id"?: CardType["_id"];
};

// Boards
export async function addBoard(data: NewBoardData) {
  try {
    return await Board.create(data);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      throw createError(
        "ConflictError",
        "Title is already in use by another board",
      );
    }
    throw error;
  }
}

export function findBoards(query: { owner: BoardType["owner"] }) {
  return Board.find(
    query,
    { _id: 1, title: 1, icon: 1 },
    { sort: { _id: -1 } },
  );
}

export function findBoard(query: Query) {
  return Board.findOne(query);
}

export async function updateBoard(query: Query, data: BoardUpdatesData) {
  try {
    return await Board.findOneAndUpdate(query, data, {
      returnDocument: "after",
      runValidators: true,
    });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      throw createError(
        "ConflictError",
        "Title is already in use by another board",
      );
    }
    throw error;
  }
}

export function deleteBoard(query: Query) {
  return Board.findOneAndDelete(query);
}

// Columns
export async function addColumn(query: Query, data: ColumnData) {
  const board = await Board.findOneAndUpdate(
    { ...query, "columns.title": { $ne: data.title } },
    { $push: { columns: data } },
    {
      returnDocument: "after",
      runValidators: true,
      projection: { columns: { $slice: -1 } },
    },
  );
  return board?.columns[0] ?? null;
}

export async function updateColumn(query: Query, data: ColumnData) {
  const board = await Board.findOneAndUpdate(
    {
      ...query,
      columns: {
        $not: {
          $elemMatch: { _id: { $ne: query["columns._id"] }, title: data.title },
        },
      },
    },
    { $set: { "columns.$[column].title": data.title } },
    {
      arrayFilters: [{ "column._id": query["columns._id"] }],
      returnDocument: "after",
      runValidators: true,
      projection: { columns: { $elemMatch: { _id: query["columns._id"] } } },
    },
  );
  return board?.columns[0] ?? null;
}

export async function deleteColumn(query: Query) {
  const board = await Board.findOneAndUpdate(
    query,
    { $pull: { columns: { _id: query["columns._id"] } } },
    { projection: { columns: { $elemMatch: { _id: query["columns._id"] } } } },
  );
  return board?.columns[0] ?? null;
}

// Cards
export async function addCard(query: Query, data: CardData) {
  const board = await Board.findOneAndUpdate(
    {
      ...query,
      columns: {
        $elemMatch: {
          _id: query["columns._id"],
          "cards.title": { $ne: data.title },
        },
      },
    },
    { $push: { "columns.$[column].cards": data } },
    {
      arrayFilters: [{ "column._id": query["columns._id"] }],
      returnDocument: "after",
      runValidators: true,
      projection: { columns: { $elemMatch: { _id: query["columns._id"] } } },
    },
  );
  return board?.columns[0].cards.at(-1) ?? null;
}

export async function updateCard(query: Query, data: CardData) {
  const board = await Board.findOneAndUpdate(
    {
      ...query,
      columns: {
        $elemMatch: {
          _id: query["columns._id"],
          "cards._id": query["columns.cards._id"],
          cards: {
            $not: {
              $elemMatch: {
                _id: { $ne: query["columns.cards._id"] },
                title: data.title,
              },
            },
          },
        },
      },
    },
    {
      $set: {
        "columns.$[column].cards.$[card].title": data.title,
        "columns.$[column].cards.$[card].description": data.description,
        "columns.$[column].cards.$[card].priority": data.priority,
        "columns.$[column].cards.$[card].deadline": data.deadline,
      },
    },
    {
      arrayFilters: [
        { "column._id": query["columns._id"] },
        { "card._id": query["columns.cards._id"] },
      ],
      returnDocument: "after",
      runValidators: true,
      projection: { columns: { $elemMatch: { _id: query["columns._id"] } } },
    },
  );
  return (
    board?.columns[0].cards.find((card) =>
      card._id.equals(query["columns.cards._id"]!),
    ) ?? null
  );
}

export async function deleteCard(query: Query) {
  const board = await Board.findOneAndUpdate(
    {
      ...query,
      columns: {
        $elemMatch: {
          _id: query["columns._id"],
          "cards._id": query["columns.cards._id"],
        },
      },
    },
    {
      $pull: { "columns.$[column].cards": { _id: query["columns.cards._id"] } },
    },
    {
      arrayFilters: [{ "column._id": query["columns._id"] }],
      projection: { columns: { $elemMatch: { _id: query["columns._id"] } } },
    },
  );
  return (
    board?.columns[0].cards.find((card) =>
      card._id.equals(query["columns.cards._id"]!),
    ) ?? null
  );
}
