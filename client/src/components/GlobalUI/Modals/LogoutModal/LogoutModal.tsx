import { useState } from "react";
import { useModal } from "../../../../hooks";
import { authService } from "../../../../services";
import { notify, handleRequestFlow, resetStore } from "../../../../utils";
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

const LogoutModal = ({ className }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModal();

  function handleLogout() {
    setIsSubmitting(true);
    closeModal();
    handleRequestFlow({
      request: () => authService.logout(),
      delay: 1500,
      loadingType: "screen",
      onFinally: () => {
        resetStore();
        sessionStorage.removeItem("sessionId");
        notify.success("Logged out successfully");
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <FormTitle id="modal-title">Log out</FormTitle>
        <CloseBtn onClick={closeModal} />
        <p>Are you sure you want to exit ?</p>
        <FormButton
          type="button"
          text={isSubmitting ? "Loading..." : "Exit"}
          isDisabled={isSubmitting}
          onClick={handleLogout}
        />
      </FormContainer>
    </ModalContainer>
  );
};

export default LogoutModal;
