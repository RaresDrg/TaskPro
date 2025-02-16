import { NavLink, useParams } from "react-router-dom";
import { useModals } from "../../hooks/hooks";
import { renderIcon } from "../../utils/utils";
import { BoardItemTitle } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import PencilIcon from "../common/PencilIcon/PencilIcon.styled";
import TrashIcon from "../common/TrashIcon/TrashIcon.styled";
import { BoardItemProp } from "../../App.types";

type Props = {
  className?: string;
  board: BoardItemProp;
};

const BoardItem = ({ className: styles, board }: Props) => {
  const { openModal } = useModals();

  const { boardId } = useParams();
  const isActive = boardId === board["_id"];

  return (
    <li className={styles}>
      <NavLink to={`${board["_id"]}`} data-secondary-action="close burger menu">
        {renderIcon(board.icon)}
        <BoardItemTitle text={board.title} />
      </NavLink>

      {isActive && (
        <div className="action-icons">
          <PencilIcon
            handlerFunction={() => openModal("editBoardModal")}
            secondAction="close burger menu"
          />
          <TrashIcon
            handlerFunction={() => openModal("deleteBoardModal")}
            secondAction="close burger menu"
          />
        </div>
      )}
    </li>
  );
};

export default BoardItem;
