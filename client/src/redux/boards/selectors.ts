import type { RootState } from "../../types";

const boardsSelectors = {
  selectBoardsList: (state: RootState) => state.boards.boardsList,
  selectBoard: (state: RootState) => state.boards.board,
  selectColumn: (state: RootState) => state.boards.column,
  selectCard: (state: RootState) => state.boards.card,
  selectFilter: (state: RootState) => state.boards.filter,
};

export default boardsSelectors;
