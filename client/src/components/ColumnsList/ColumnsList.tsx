import { useModal, useReduxState, useAppDispatch } from "../../hooks";
import { setColumn } from "../../redux/boards/actions";
import { EllipsisTooltip, Icon, FormButton } from "../common";
import { CardsList } from "..";
import type { Column } from "../../types";

type Props = {
  className?: string;
  columns: Column[];
};

const ColumnsList = ({ className, columns }: Props) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  const filter = useReduxState("selectFilter");

  return (
    <ul className={className}>
      {columns.map((column) => {
        const cards = !filter
          ? column.cards
          : column.cards.filter((card) => card.priority === filter);
        return (
          <li key={column.id}>
            <div className="heading">
              <EllipsisTooltip
                tag="h2"
                text={column.title}
                className="column-title"
              />
              <div className="actions">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setColumn(column));
                    openModal("editColumnModal");
                  }}
                  title="Edit column"
                  aria-label="Edit column"
                >
                  <Icon name="icon-pencil" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setColumn(column));
                    openModal("deleteColumnModal");
                  }}
                  title="Delete column"
                  aria-label="Delete column"
                >
                  <Icon name="icon-trash" />
                </button>
              </div>
            </div>
            <CardsList cards={cards} columnId={column.id} />
            <FormButton
              className="add-card-btn"
              type="button"
              text="Add a card"
              onClick={() => {
                dispatch(setColumn(column));
                openModal("addCardModal");
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ColumnsList;
