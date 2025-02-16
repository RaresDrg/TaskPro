import { renderIcon } from "../../utils/utils";
import { useBoards, useModals } from "../../hooks/hooks";
import BoardItem from "../BoardItem/BoardItem.styled";

type Props = {
  className?: string;
};

const MyBoards = ({ className: styles }: Props) => {
  const { boardsList } = useBoards();
  const { openModal } = useModals();

  return (
    <div className={styles}>
      <span>My Boards</span>
      <div>
        <span>Create a new board</span>
        <button
          type="button"
          className="create-btn"
          onClick={() => openModal("addBoardModal")}
          data-secondary-action="close burger menu"
        >
          {renderIcon("icon-plus")}
        </button>
      </div>

      {boardsList && (
        <ul className="boards-list">
          {boardsList.map((item) => (
            <BoardItem key={item["_id"]} board={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBoards;
