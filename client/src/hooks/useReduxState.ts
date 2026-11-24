import { useSelector } from "react-redux";
import type { RootState } from "../types";
import generalSelectors from "../redux/general/selectors";
import authSelectors from "../redux/auth/selectors";
import boardsSelectors from "../redux/boards/selectors";

const allSelectors = {
  ...generalSelectors,
  ...authSelectors,
  ...boardsSelectors,
};

type TypedSelector<K extends keyof typeof allSelectors> = (
  state: RootState,
) => ReturnType<(typeof allSelectors)[K]>;

const useReduxState = <K extends keyof typeof allSelectors>(key: K) => {
  return useSelector(allSelectors[key] as TypedSelector<K>);
};

export default useReduxState;
