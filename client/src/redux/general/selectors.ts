import type { RootState } from "../../types";

const generalSelectors = {
  selectActiveLoader: (state: RootState) => state.general.activeLoader,
  selectActiveModal: (state: RootState) => state.general.activeModal,
};

export default generalSelectors;
