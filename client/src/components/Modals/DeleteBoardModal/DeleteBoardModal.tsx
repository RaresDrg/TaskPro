import { useNavigate } from "react-router-dom";
import { useAppDispatch, useModals } from "../../../hooks/hooks";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { deleteBoard } from "../../../redux/boards/operations";
import { notify } from "../../../utils/utils";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

type Props = {
  className?: string;
};

const DeleteBoardModal = ({ className: styles }: Props) => {
  const { theme } = useAuth();
  const { board } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleDelete() {
    dispatch(deleteBoard(board!["_id"]))
      .unwrap()
      .then((value) => {
        notify.success(value.message);
        closeModal();
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => notify.error(error));
  }

  return (
    <Modal className={styles}>
      <>
        <p>Are you sure you want to delete the board?</p>
        <div className="buttons-wrapper">
          <FormButton
            type="button"
            text="Delete"
            variant="redBtn"
            handlerFunction={handleDelete}
          />
          <FormButton
            type="button"
            text="Close"
            variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            handlerFunction={closeModal}
          />
        </div>
      </>
    </Modal>
  );
};

export default DeleteBoardModal;
