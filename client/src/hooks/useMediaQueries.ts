import { useContext } from "react";
import MediaQueriesContext from "../contexts/MediaQueries/MediaQueriesContext";

const useMediaQueries = () => {
  const context = useContext(MediaQueriesContext);
  if (context) return context;

  throw new Error(`useMediaQueries must be used inside <MediaQueriesProvider>`);
};

export default useMediaQueries;
