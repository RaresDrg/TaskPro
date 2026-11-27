import { useSortable } from "@dnd-kit/react/sortable";
import { useModal, useAppDispatch } from "../../hooks";
import { setCard } from "../../redux/boards/actions";
import { formatDateForDisplay } from "../../utils";
import { EllipsisTooltip, Icon } from "../common";
import type { Card, Column } from "../../types";

type Props = {
  className?: string;
  card: Card;
  index: number;
  columnId: Column["id"];
};

const CardItem = ({ className, card, index, columnId }: Props) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const { ref } = useSortable({
    id: card.id,
    index,
    group: columnId,
    type: "card",
    accept: "card",
  });

  function isOverdue(deadline: string) {
    const today = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(deadline).setHours(0, 0, 0, 0);
    return today > dueDate;
  }

  return (
    <li
      className={className}
      ref={ref}
      data-priority={card.priority}
      data-overdue={isOverdue(card.deadline)}
    >
      <EllipsisTooltip tag="h3" text={card.title} className="card-title" />
      <EllipsisTooltip text={card.description} className="description" />
      <div>
        <div className="priority">
          <span>Priority</span>
          <span>{card.priority}</span>
        </div>
        <div className="deadline">
          <span>Deadline</span>
          <span>{formatDateForDisplay(card.deadline)}</span>
        </div>
        <div className="actions">
          <button
            type="button"
            onClick={() => {
              dispatch(setCard(card));
              openModal("editCardModal");
            }}
            title="Edit card"
            aria-label="Edit card"
          >
            <Icon name="icon-pencil" />
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(setCard(card));
              openModal("deleteCardModal");
            }}
            title="Delete card"
            aria-label="Delete card"
          >
            <Icon name="icon-trash" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CardItem;
