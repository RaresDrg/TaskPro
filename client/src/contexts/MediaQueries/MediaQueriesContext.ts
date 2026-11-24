import { createContext } from "react";

type MediaQueriesInfo = {
  isOnMobile: boolean;
  isOnTablet: boolean;
  isOnDesktop: boolean;
  isRetina: boolean;
  prefersReducedMotion: boolean;
};

const MediaQueriesContext = createContext<MediaQueriesInfo | null>(null);

export default MediaQueriesContext;
