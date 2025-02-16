import { useAuth, useAppDispatch, useModals } from "../../../hooks/hooks";
import { logout } from "../../../redux/auth/operations";
import { notify } from "../../../utils/utils";
import Modal from "../../common/Modal/Modal.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

type Props = {
  className?: string;
};

const LogoutModal = ({ className: styles }: Props) => {
  const { theme } = useAuth();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  function handleExit() {
    closeModal();
    dispatch(logout())
      .unwrap()
      .finally(() => notify.success("Logged out successfully"));
  }

  return (
    <Modal className={styles}>
      <>
        <p>Are you sure you want to exit ?</p>
        <div className="buttons-wrapper">
          <FormButton
            type="button"
            text="Exit"
            variant="redBtn"
            handlerFunction={handleExit}
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

export default LogoutModal;
