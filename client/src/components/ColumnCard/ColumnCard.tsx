import { useAppDispatch, useModals } from "../../hooks/hooks";
import { setTargetedCard } from "../../redux/boards/slice";
import { Draggable } from "@hello-pangea/dnd";
import { CardTitle } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import { CardDescription } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import DeadlineIcon from "../common/DeadlineIcon/DeadlineIcon.styled";
import PencilIcon from "../common/PencilIcon/PencilIcon.styled";
import TrashIcon from "../common/TrashIcon/TrashIcon.styled";
import { Card } from "../../App.types";

type Props = {
  className?: string;
  index: number;
  card: Card;
  isDragDisabled: boolean;
};

const ColumnCard = ({ className, card, index, isDragDisabled }: Props) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModals();

  const today = new Date().toDateString();
  const deadline = new Date(card.deadline).toDateString();

  const isDeadlineTime = today === deadline;
  const overdue = new Date(today).getTime() > new Date(deadline).getTime();

  return (
    <Draggable
      draggableId={card["_id"]}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardTitle text={card.title} />
          <CardDescription text={card.description} />

          <div>
            <div className="priority">
              <span>Priority</span>
              <span>{card.priority}</span>
            </div>
            <div className="deadline">
              <span>Deadline</span>
              <span className={overdue ? "red" : ""}>{deadline}</span>
            </div>
            <div className="action-icons">
              {isDeadlineTime && <DeadlineIcon />}
              <PencilIcon
                handlerFunction={() => {
                  dispatch(setTargetedCard(card));
                  openModal("editCardModal");
                }}
              />
              <TrashIcon
                handlerFunction={() => {
                  dispatch(setTargetedCard(card));
                  openModal("deleteCardModal");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnCard;
