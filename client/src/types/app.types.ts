import type { store } from "../redux/store";
import type {
  AUTH_METHODS,
  THEMES,
  BOARD_ICONS,
  BOARD_BACKGROUNDS,
  CARD_PRIORITIES,
} from "../constants";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type LoadingType = "screen" | "spinner";

export type ModalType =
  | "editUserModal"
  | "logoutModal"
  | "needHelpModal"
  | "burgerMenuModal"
  | "filtersModal"
  | "addBoardModal"
  | "editBoardModal"
  | "deleteBoardModal"
  | "addColumnModal"
  | "editColumnModal"
  | "deleteColumnModal"
  | "addCardModal"
  | "editCardModal"
  | "deleteCardModal";

export type GeneralState = {
  activeLoader: LoadingType | null;
  activeModal: ModalType | null;
};

export type User = {
  authMethod: (typeof AUTH_METHODS)[number];
  theme: (typeof THEMES)[number];
  name: string;
  email: string;
  profilePhotoID: string | null;
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

export type Card = {
  id: string;
  title: string;
  description: string;
  priority: (typeof CARD_PRIORITIES)[number];
  deadline: string;
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
};

export type Board = {
  id: string;
  title: string;
  icon: (typeof BOARD_ICONS)[number];
  background: (typeof BOARD_BACKGROUNDS)[number];
  columns: Column[];
};

export type BoardsState = {
  boardsList: Pick<Board, "id" | "title" | "icon">[] | null;
  board: Board | null;
  column: Column | null;
  card: Card | null;
  filter: Card["priority"] | null;
};

export type ErrorResponse = {
  status?: number;
  response?: { data?: { message?: string } };
};

export type IconName =
  | "icon-logo"
  | "icon-google"
  | "icon-eye"
  | "icon-burgerMenu"
  | "icon-helpCircle"
  | "icon-dropdown"
  | "icon-noProfile"
  | "icon-plus"
  | "icon-trash"
  | "icon-pencil"
  | "icon-logout"
  | "icon-close"
  | "icon-filter"
  | "icon-project"
  | "icon-star"
  | "icon-loading"
  | "icon-puzzlePiece"
  | "icon-container"
  | "icon-lightning"
  | "icon-colors"
  | "icon-hexagon";

export type ImageName = "heroAvatar";

export type ImageBgName = Exclude<Board["background"], "bgdefault">;

export type VideoBgName = "taskpro_loading-screen" | "taskpro_notfound";
