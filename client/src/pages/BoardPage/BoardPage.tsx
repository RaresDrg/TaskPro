import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBoards, useAppDispatch } from "../../hooks/hooks";
import { getBoard } from "../../redux/boards/operations";
import BoardPageSection from "../../components/BoardPageSection/BoardPageSection.styled";
import { BoardTitle } from "../../components/common/EllipsisTooltip/EllipsisTooltip.styled";
import BoardColumns from "../../components/BoardColumns/BoardColumns.styled";
import FilterBtn from "../../components/FilterBtn/FilterBtn.styled";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner.styled";

const BoardPage = () => {
  const [shouldWait, setShouldWait] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { board, boardsList } = useBoards();

  useEffect(() => {
    setShouldWait(true);

    if (board && board["_id"] === boardId) {
      setShouldWait(false);
    } else {
      const isInTheList = boardsList?.some((board) => board["_id"] === boardId);

      if (!isInTheList) {
        navigate("/*", { replace: true });
      } else {
        dispatch(getBoard(boardId!))
          .unwrap()
          .then(() => setShouldWait(false))
          .catch(() => navigate("/*", { replace: true }));
      }
    }
  }, [boardId]);

  if (shouldWait) return <LoadingSpinner />;

  const showFilterBtn = board?.columns.some((column) => {
    return column.cards.length > 0;
  });

  return (
    <BoardPageSection backgroundSources={board!.background.sources}>
      <>
        <BoardTitle
          text={board!.title}
          className={`animate__animated animate__slideInDown`}
        />
        {showFilterBtn && (
          <FilterBtn
            className={`animate__animated animate__flipInX animate__slow`}
          />
        )}
        <BoardColumns
          className={`animate__animated animate__fadeIn animate__slower`}
        />
      </>
    </BoardPageSection>
  );
};

export default BoardPage;
