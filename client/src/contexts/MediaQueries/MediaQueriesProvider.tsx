import type { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { MEDIA_QUERIES } from "../../constants";
import MediaQueriesContext from "./MediaQueriesContext";

type Props = {
  children: ReactNode;
};

const MediaQueriesProvider = ({ children }: Props) => {
  const isOnMobile = useMediaQuery({ query: MEDIA_QUERIES.mobile });
  const isOnTablet = useMediaQuery({ query: MEDIA_QUERIES.tablet });
  const isOnDesktop = useMediaQuery({ query: MEDIA_QUERIES.desktop });
  const isRetina = useMediaQuery({ query: MEDIA_QUERIES.retina });
  const prefersReducedMotion = useMediaQuery({
    query: MEDIA_QUERIES.reducedMotion,
  });

  const mediaQueriesInfo = {
    isOnMobile,
    isOnTablet,
    isOnDesktop,
    isRetina,
    prefersReducedMotion,
  };

  return (
    <MediaQueriesContext.Provider value={mediaQueriesInfo}>
      {children}
    </MediaQueriesContext.Provider>
  );
};

export default MediaQueriesProvider;
