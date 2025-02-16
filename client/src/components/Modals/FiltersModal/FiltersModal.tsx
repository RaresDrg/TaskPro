import { useBoards, useAppDispatch, useModals } from "../../../hooks/hooks";
import { setFilter } from "../../../redux/boards/slice";
import { CARD_PRIORITIES } from "../../../constants/constants";
import { CardPriority } from "../../../App.types";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";

type Props = {
  className?: string;
};

const FiltersModal = ({ className: styles }: Props) => {
  const { filter } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  function handleShowAll() {
    if (filter === null) {
      closeModal();
    } else {
      dispatch(setFilter(null));
      closeModal();
    }
  }

  function handleShowChosenValue(e: React.MouseEvent) {
    if (e.target instanceof HTMLButtonElement) {
      const priorityChosen = e.target.textContent as CardPriority;

      if (filter === priorityChosen) {
        closeModal();
      } else {
        dispatch(setFilter(priorityChosen));
        closeModal();
      }
    }
  }

  return (
    <Modal className={styles}>
      <>
        <FormTitle text="Filters" />
        <div>
          <h3>Card priority</h3>
          <button type="button" onMouseDown={handleShowAll}>
            Show all
          </button>
          <div onMouseDown={handleShowChosenValue}>
            {CARD_PRIORITIES.map((cardPriority) => (
              <button
                type="button"
                key={cardPriority}
                className={`${cardPriority === filter && "active"}`}
              >
                {cardPriority}
              </button>
            ))}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default FiltersModal;
