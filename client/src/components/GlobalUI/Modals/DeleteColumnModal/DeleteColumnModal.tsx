import { useState } from "react";
import { useAppDispatch, useModal, useReduxState } from "../../../../hooks";
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

const DeleteColumnModal = ({ className }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const board = useReduxState("selectBoard")!;
  const column = useReduxState("selectColumn")!;

  function handleDelete() {
    setIsSubmitting(true);
    handleRequestFlow({
      request: () => boardService.deleteColumn(board.id, column.id),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const updatedColumns = board.columns.filter(
          (item) => item.id !== column.id,
        );
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
        <FormTitle id="modal-title">Delete column</FormTitle>
        <CloseBtn onClick={closeModal} />
        <p>
          Are you sure you want to delete <b>{column.title}</b> ?
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

export default DeleteColumnModal;
