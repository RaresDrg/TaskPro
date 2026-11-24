import { useState } from "react";
import { useModal, useReduxState, useAppDispatch } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoard } from "../../../../redux/boards/actions";
import { notify, handleRequestFlow } from "../../../../utils";
import {
  ModalContainer,
  FormContainer,
  FormTitle,
  FormButton,
  CloseBtn,
} from "../../../common";

type Props = {
  className?: string;
};

const DeleteCardModal = ({ className }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const board = useReduxState("selectBoard")!;
  const card = useReduxState("selectCard")!;

  function handleDelete() {
    setIsSubmitting(true);

    const column = board.columns.find((item) =>
      item.cards.find((cardItem) => cardItem.id === card.id),
    )!;

    handleRequestFlow({
      request: () => boardService.deleteCard(board.id, column.id, card.id),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const updatedCards = column.cards.filter((item) => item.id !== card.id);
        const updatedColumn = { ...column, cards: updatedCards };
        const updatedColumns = board.columns.map((item) => {
          if (item.id !== column.id) return item;
          return updatedColumn;
        });
        const updatedBoard = { ...board, columns: updatedColumns };
        dispatch(setBoard(updatedBoard));
        notify.success(res.message);
        closeModal();
      },
      onError: (error) => {
        notify.errorResponse(error);
        setIsSubmitting(false);
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <FormTitle id="modal-title">Delete card</FormTitle>
        <CloseBtn onClick={closeModal} />
        <p>
          Are you sure you want to delete <b>{card.title}</b> ?
        </p>
        <FormButton
          type="button"
          text={isSubmitting ? "Loading..." : "Delete"}
          isDisabled={isSubmitting}
          onClick={handleDelete}
        />
      </FormContainer>
    </ModalContainer>
  );
};

export default DeleteCardModal;
