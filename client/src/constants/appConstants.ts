export const BREAKPOINTS = {
  tablet: "768px",
  desktop: "1280px",
} as const;

export const MEDIA_QUERIES = {
  mobile: `(max-width: calc(${BREAKPOINTS.tablet} - 1px))`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}) and (max-width: calc(${BREAKPOINTS.desktop} - 1px))`,
  desktop: `(min-width: ${BREAKPOINTS.desktop})`,
  retina: "(min-resolution: 2dppx)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

export const FOCUSABLE_ELEMENTS = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([type='hidden']):not([type='radio']):not([tabindex='-1'])",
  "input[type='radio']:checked:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
] as const;

export const GOOGLE_AUTH_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/auth/google"
  : "/api/auth/google";

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
