import { Schema, model } from "mongoose";
import type { BoardType, ColumnType, CardType } from "../types/index.js";
import {
  BOARD_ICONS,
  BOARD_BACKGROUNDS,
  CARD_PRIORITIES,
} from "../constants/index.js";

const cardSchema = new Schema<CardType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: CARD_PRIORITIES,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        const { _id, title, description, priority, deadline } = ret;
        return { id: _id.toString(), title, description, priority, deadline };
      },
    },
  },
);

const columnSchema = new Schema<ColumnType>(
  {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: [cardSchema],
    },
  },
  {
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        const { _id, title, cards } = ret;
        return { id: _id.toString(), title, cards };
      },
    },
  },
);

const boardSchema = new Schema<BoardType>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      enum: BOARD_ICONS,
      required: true,
    },
    background: {
      type: String,
      enum: BOARD_BACKGROUNDS,
      required: true,
    },
    columns: {
      type: [columnSchema],
    },
  },
  {
    versionKey: false,
    strict: true,
    toJSON: {
      transform(_doc, ret) {
        const { _id, title, icon, background, columns } = ret;
        return { id: _id.toString(), title, icon, background, columns };
      },
    },
  },
);
boardSchema.index({ owner: 1, title: 1 }, { unique: true });

const Board = model<BoardType>("Board", boardSchema);

export default Board;
