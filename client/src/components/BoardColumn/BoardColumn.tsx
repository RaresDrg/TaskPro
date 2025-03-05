import { useAuth, useBoards } from "../../hooks/hooks";
import { useAppDispatch, useModals } from "../../hooks/hooks";
import { setTargetedColumn } from "../../redux/boards/slice";
import { Droppable } from "@hello-pangea/dnd";
import { ColumnTitle } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import PencilIcon from "../common/PencilIcon/PencilIcon.styled";
import TrashIcon from "../common/TrashIcon/TrashIcon.styled";
import ColumnCard from "../ColumnCard/ColumnCard.styled";
import FormButton from "../common/FormButton/FormButton.styled";
import { Column } from "../../App.types";

type Props = {
  className?: string;
  column: Column;
  isDragDisabled: boolean;
};

const BoardColumn = ({ className: styles, column, isDragDisabled }: Props) => {
  const { theme } = useAuth();
  const { filter } = useBoards();
  const { openModal } = useModals();
  const dispatch = useAppDispatch();

  const cardsList = !filter
    ? column.cards
    : column.cards.filter((card) => card.priority === filter);

  return (
    <Droppable droppableId={column["_id"]}>
      {(provided) => (
        <div
          className={styles}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-heading">
            <ColumnTitle text={column.title} />
            <div className="action-icons">
              <PencilIcon
                handlerFunction={() => {
                  dispatch(setTargetedColumn(column));
                  openModal("editColumnModal");
                }}
              />
              <TrashIcon
                handlerFunction={() => {
                  dispatch(setTargetedColumn(column));
                  openModal("deleteColumnModal");
                }}
              />
            </div>
          </div>

          <div className="cards-list">
            {cardsList.map((card, index) => (
              <ColumnCard
                key={card["_id"]}
                card={card}
                index={index}
                isDragDisabled={isDragDisabled}
              />
            ))}
            {provided.placeholder}
          </div>

          <FormButton
            type="button"
            text="Add card"
            handlerFunction={() => {
              dispatch(setTargetedColumn(column));
              openModal("addCardModal");
            }}
            variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
          />
        </div>
      )}
    </Droppable>
  );
};

export default BoardColumn;
