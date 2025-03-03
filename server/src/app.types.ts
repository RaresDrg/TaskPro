export type UserType = {
  _id: string;
  isGoogleUser: boolean;
  name: string;
  email: string;
  password: string;
  profilePhotoUrl: string | null;
  theme: "light" | "dark" | "violet";
  token: string | null;
  validationToken: { value: string; expiresAt: Date } | null;
};

export type BoardType = {
  id: string;
  owner: string;
  title: string;
  icon: BoardIcon;
  background: {
    value: BackgroundValue;
    sources: BackgroundSources | null;
  };
  columns: ColumnType[];
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

export type BackgroundSources = {
  mobile: string;
  tablet: string;
  desktop: string;
  mobile_2x: string;
  tablet_2x: string;
  desktop_2x: string;
};

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

export type CardType = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "without";
  deadline: string;
};
