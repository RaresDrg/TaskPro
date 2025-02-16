import { Theme, BoardIcon, BackgroundValue, CardPriority } from "../App.types";

export const LOADING_SCREEN_VIDEO =
  "https://cdn.pixabay.com/video/2024/01/24/197976-906217215_tiny.mp4";

export const NOT_FOUND_VIDEO =
  "https://cdn.pixabay.com/video/2016/05/18/3226-167234359_tiny.mp4";

export const EMAIL_REGEX = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const THEMES: readonly Theme[] = ["light", "dark", "violet"];

export const BOARD_ICONS: readonly BoardIcon[] = [
  "icon-project",
  "icon-star",
  "icon-loading",
  "icon-puzzlePiece",
  "icon-container",
  "icon-lightning",
  "icon-colors",
  "icon-hexagon",
];

export const BOARD_BACKGROUNDS: readonly BackgroundValue[] = [
  "bg-default",
  "bg-1",
  "bg-2",
  "bg-3",
  "bg-4",
  "bg-5",
  "bg-6",
  "bg-7",
  "bg-8",
  "bg-9",
  "bg-10",
  "bg-11",
  "bg-12",
  "bg-13",
  "bg-14",
  "bg-15",
];

export const CARD_PRIORITIES: readonly CardPriority[] = [
  "low",
  "medium",
  "high",
  "without",
];

/** Important => choose app status: inProduction = true | false */
const inProduction: boolean = false;

export const API_BASE_URL = inProduction
  ? "https://taskproserver.vercel.app"
  : "http://localhost:3000";

export const GOOGLE_AUTH_URL = `${API_BASE_URL}/api/users/google-auth`;
