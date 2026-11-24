import { useAppDispatch, useModal, useReduxState } from "../../../../hooks";
import { setFilter } from "../../../../redux/boards/actions";
import { CARD_PRIORITIES } from "../../../../constants";
import {
  ModalContainer,
  FormContainer,
  FormTitle,
  CloseBtn,
} from "../../../common";

type Props = {
  className?: string;
};

const FiltersModal = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const { closeModal } = useModal();
  const filter = useReduxState("selectFilter");

  function handleFilterChange(newFilter: typeof filter) {
    if (filter !== newFilter) dispatch(setFilter(newFilter));
    closeModal();
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <FormTitle id="modal-title">Filters</FormTitle>
        <CloseBtn onClick={closeModal} />
        <div className="actions" role="group" aria-labelledby="priority-title">
          <h3 id="priority-title">Priority</h3>
          <button
            type="button"
            className="show-all-btn"
            aria-pressed={filter === null}
            onClick={() => handleFilterChange(null)}
          >
            Show all
          </button>
          {CARD_PRIORITIES.map((item) => (
            <button
              key={item}
              type="button"
              className="priority-btn"
              data-priority={item}
              aria-pressed={item === filter}
              onClick={() => handleFilterChange(item)}
            >
              <span className="circle"></span>
              <span className="text">{item}</span>
            </button>
          ))}
        </div>
      </FormContainer>
    </ModalContainer>
  );
};

export default FiltersModal;
