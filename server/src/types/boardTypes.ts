import type { Types } from "mongoose";
import type { UserType } from "./userTypes.js";
import type {
  BOARD_ICONS,
  BOARD_BACKGROUNDS,
  CARD_PRIORITIES,
} from "../constants/index.js";

export type CardType = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  priority: (typeof CARD_PRIORITIES)[number];
  deadline: string;
};

export type ColumnType = {
  _id: Types.ObjectId;
  title: string;
  cards: CardType[];
};

export type BoardType = {
  _id: Types.ObjectId;
  owner: UserType["_id"];
  title: string;
  icon: (typeof BOARD_ICONS)[number];
  background: (typeof BOARD_BACKGROUNDS)[number];
  columns: ColumnType[];
};
