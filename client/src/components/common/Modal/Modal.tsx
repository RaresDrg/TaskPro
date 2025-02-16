import { ReactElement } from "react";
import { useBoards, useModals, useEventListener } from "../../../hooks/hooks";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.styled";
import { renderIcon } from "../../../utils/utils";

type Props = {
  className?: string;
  children: ReactElement;
};

const Modal = ({ children, className: styles }: Props) => {
  const { isLoading } = useBoards();
  const { closeModal } = useModals();

  useEventListener("keydown", (e) => {
    if (e instanceof KeyboardEvent && e.key === "Escape") {
      closeModal();
    }
  });

  useEventListener("mousedown", (e) => {
    if (
      (e.target as Element).classList.contains("close-btn") ||
      (e.target as Element).classList.contains("modal")
    ) {
      closeModal();
    }
  });

  return (
    <>
      <div className={`${styles} modal`}>
        <div className="modal-content">
          {renderIcon("icon-closeBtn", "close-btn")}

          {children}
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default Modal;
