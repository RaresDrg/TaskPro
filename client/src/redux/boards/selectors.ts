import { RootState } from "../../App.types";

const selectIsLoading = (state: RootState) => state.boards.isLoading;
const selectBoardsList = (state: RootState) => state.boards.boardsList;
const selectBoard = (state: RootState) => state.boards.board;
const selectColumns = (state: RootState) => state.boards.board?.columns;
const selectColumn = (state: RootState) => state.boards.column;
const selectCard = (state: RootState) => state.boards.card;
const selectFilter = (state: RootState) => state.boards.filter;

export default {
  selectIsLoading,
  selectBoardsList,
  selectBoard,
  selectColumns,
  selectColumn,
  selectCard,
  selectFilter,
};
