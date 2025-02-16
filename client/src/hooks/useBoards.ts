import { useSelector } from "react-redux";
import boardsSelectors from "../redux/boards/selectors";

const useBoards = () => {
  return {
    isLoading: useSelector(boardsSelectors.selectIsLoading),
    boardsList: useSelector(boardsSelectors.selectBoardsList),
    board: useSelector(boardsSelectors.selectBoard),
    columns: useSelector(boardsSelectors.selectColumns),
    column: useSelector(boardsSelectors.selectColumn),
    card: useSelector(boardsSelectors.selectCard),
    filter: useSelector(boardsSelectors.selectFilter),
  };
};

export default useBoards;
