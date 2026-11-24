import { useEffect, useRef } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { useModal, useMediaQueries, useReduxState } from "../../hooks";
import { Icon, EllipsisTooltip } from "../common";
import type { BoardsState } from "../../types";

type Props = {
  className?: string;
  boards: NonNullable<BoardsState["boardsList"]>;
};

const BoardsList = ({ className, boards }: Props) => {
  const { openModal } = useModal();
  const { prefersReducedMotion } = useMediaQueries();
  const board = useReduxState("selectBoard");

  const activeRef = useRef<HTMLLIElement>(null);
  const activeBoardId = useMatch("/dashboard/boards/:boardId")?.params.boardId;

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeBoardId]);

  return (
    <ul className={className}>
      {boards.map(({ id, title, icon }) => (
        <li key={id} ref={id === activeBoardId ? activeRef : undefined}>
          <NavLink to={`/dashboard/boards/${id}`}>
            <Icon name={icon} />
            <EllipsisTooltip text={title} />
          </NavLink>
          {id === activeBoardId && id === board?.id && (
            <div className="board-actions">
              <button
                type="button"
                onClick={() => openModal("editBoardModal")}
                title="Edit board"
                aria-label="Edit board"
              >
                <Icon name="icon-pencil" />
              </button>
              <button
                type="button"
                onClick={() => openModal("deleteBoardModal")}
                title="Delete board"
                aria-label="Delete board"
              >
                <Icon name="icon-trash" />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
