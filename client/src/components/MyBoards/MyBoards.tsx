import { BoardsList } from "..";
import { Icon } from "../common";
import { useModal, useReduxState } from "../../hooks";

type Props = {
  className?: string;
};

const MyBoards = ({ className }: Props) => {
  const { openModal } = useModal();
  const boardsList = useReduxState("selectBoardsList");
  const hasBoards = boardsList && boardsList.length > 0;

  return (
    <div className={className}>
      <span className="title">My boards</span>
      <div className="action">
        <span>Create a new board</span>
        <button
          type="button"
          onClick={() => openModal("addBoardModal")}
          title="Add a board"
          aria-label="Add a board"
        >
          <Icon name="icon-plus" />
        </button>
      </div>
      {hasBoards && <BoardsList boards={boardsList} />}
    </div>
  );
};

export default MyBoards;
