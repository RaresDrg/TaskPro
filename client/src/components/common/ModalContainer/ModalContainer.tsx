import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useModal, useReduxState, useUpdateEffect } from "../../../hooks";
import { FOCUSABLE_ELEMENTS } from "../../../constants";

type Props = {
  className?: string;
  children: ReactNode;
};

const ModalContainer = ({ className, children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const activeLoader = useReduxState("selectActiveLoader");
  const { closeModal } = useModal();
  const { pathname } = useLocation();

  function handleMouseDown(e: MouseEvent) {
    if (e.button === 0 && e.target === e.currentTarget) closeModal();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (activeLoader) {
      e.preventDefault();
      return;
    }

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab") {
      const modalElement = modalRef.current;
      const focusableElements = modalElement?.querySelectorAll<HTMLElement>(
        FOCUSABLE_ELEMENTS.join(","),
      );

      if (!focusableElements?.length) {
        e.preventDefault();
        modalElement?.focus();
        return;
      }

      if (
        focusableElements.length === 1 ||
        !modalElement?.contains(document.activeElement)
      ) {
        e.preventDefault();
        focusableElements[0].focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (
          document.activeElement === modalElement ||
          document.activeElement === firstElement
        ) {
          e.preventDefault();
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    return () => trigger?.focus();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useUpdateEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <div
      ref={modalRef}
      className={className}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ModalContainer;
