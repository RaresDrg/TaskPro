/**
 * Prettify is used to normalize nested types.
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type AppDispatch = typeof import("./redux/store").store.dispatch;

export type RootState = ReturnType<
  typeof import("./redux/store").store.getState
>;

export type AuthState = {
  isLoading: boolean;
  error: null | string;
  isLoggedIn: boolean;
  user: null | Prettify<User>;
};

export type User = {
  isGoogleUser: boolean;
  name: string;
  email: string;
  theme: Theme;
  profilePhotoUrl: null | string;
};

export type UserDataResponse = Prettify<{
  data: {
    user: Prettify<User>;
  };
}>;

export type Theme = "light" | "dark" | "violet";

export type ErrorResponse = {
  status?: number;
  response?: { data?: { message?: string } };
};

export type BoardsState = {
  isLoading: boolean;
  error: null | string;
  boardsList: null | Prettify<BoardsList>;
  board: null | Prettify<Board>;
  column: null | Prettify<Column>;
  card: null | Prettify<Card>;
  filter: null | CardPriority;
};

export type BoardsList = Array<Prettify<BoardItemProp>>;

export type BoardItemProp = { _id: string; title: string; icon: BoardIcon };

export type Board = {
  _id: string;
  title: string;
  icon: BoardIcon;
  background: {
    value: BackgroundValue;
    sources: BackgroundSources | null;
  };
  columns: Prettify<Column>[];
};

export type BoardIcon =
  | "icon-project"
  | "icon-star"
  | "icon-loading"
  | "icon-puzzlePiece"
  | "icon-container"
  | "icon-lightning"
  | "icon-colors"
  | "icon-hexagon";

export type BackgroundValue =
  | "bg-default"
  | "bg-1"
  | "bg-2"
  | "bg-3"
  | "bg-4"
  | "bg-5"
  | "bg-6"
  | "bg-7"
  | "bg-8"
  | "bg-9"
  | "bg-10"
  | "bg-11"
  | "bg-12"
  | "bg-13"
  | "bg-14"
  | "bg-15";

export type BackgroundSources = Prettify<{
  mobile: string;
  tablet: string;
  desktop: string;
  mobile_2x: string;
  tablet_2x: string;
  desktop_2x: string;
}>;

export type Column = {
  _id: string;
  title: string;
  cards: Prettify<Card>[];
};

export type Card = {
  _id: string;
  title: string;
  description: string;
  priority: CardPriority;
  deadline: string;
};

export type CardPriority = "low" | "medium" | "high" | "without";

export type BoardValues = Prettify<{
  title: string;
  icon: BoardIcon;
  background: BackgroundValue;
}>;

export type ColumnValues = Prettify<{ title: string }>;

export type CardValues = Prettify<{
  title: string;
  description: string;
  priority: CardPriority;
  deadline: string;
}>;

export type FormButtonProps = Prettify<{
  className?: string;
  type: "button" | "submit";
  text: string;
  handlerFunction?: () => void;
  isDisabled?: boolean;
  variant: "greenBtn" | "violetBtn" | "blackBtn" | "redBtn";
}>;

export type FormTextFieldProps = Prettify<{
  className?: string;
  id: string;
  name: string;
  placeholder: string;
  hasErrors?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
}>;

export type FormPasswordFieldProps = Prettify<{
  className?: string;
  id: string;
  name: string;
  placeholder: string;
  hasErrors?: boolean;
  values?: string;
  isFocused?: boolean;
}>;

export type FormTextareaFieldProps = Prettify<{
  className?: string;
  id: string;
  name: string;
  placeholder: string;
  rows: number;
  hasErrors?: boolean;
  isFocused?: boolean;
}>;

export type ActionIcon = {
  className?: string;
  handlerFunction?: () => void;
  secondAction?: string;
};

export type EventTypes = Prettify<{
  click: MouseEvent;
  mousedown: MouseEvent;
  mouseup: MouseEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
  focus: FocusEvent;
  blur: FocusEvent;
  touchstart: TouchEvent;
  touchend: TouchEvent;
}>;
