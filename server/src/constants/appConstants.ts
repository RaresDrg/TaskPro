export const JSON_BODY_LIMIT = "100kb";

export const AUTH_METHODS = ["local", "google"] as const;

export const THEMES = ["light", "dark", "violet"] as const;

export const PROFILE_PHOTO_MAX_SIZE = 5_000_000;

export const PROFILE_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const BOARD_ICONS = [
  "icon-project",
  "icon-star",
  "icon-loading",
  "icon-puzzlePiece",
  "icon-container",
  "icon-lightning",
  "icon-colors",
  "icon-hexagon",
] as const;

export const BOARD_BACKGROUNDS = [
  "bgdefault",
  "bg1",
  "bg2",
  "bg3",
  "bg4",
  "bg5",
  "bg6",
  "bg7",
  "bg8",
  "bg9",
  "bg10",
  "bg11",
  "bg12",
  "bg13",
  "bg14",
  "bg15",
] as const;

export const CARD_PRIORITIES = ["without", "low", "medium", "high"] as const;
