import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal, useReduxState, useAppDispatch } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoardsList } from "../../../../redux/boards/actions";
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

const DeleteBoardModal = ({ className }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const boardsList = useReduxState("selectBoardsList")!;
  const board = useReduxState("selectBoard")!;

  function handleDelete() {
    setIsSubmitting(true);
    handleRequestFlow({
      request: () => boardService.deleteBoard(board.id),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const updatedBoardsList = boardsList.filter(
          (item) => item.id !== board.id,
        );
        dispatch(setBoardsList(updatedBoardsList));
        notify.success(res.message);
        navigate("/dashboard", { replace: true });
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
        <FormTitle id="modal-title">Delete board</FormTitle>
        <CloseBtn onClick={closeModal} />
        <p>
          Are you sure you want to delete <b>{board.title}</b> ?
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

export default DeleteBoardModal;
