import useAppDispatch from "./useAppDispatch";
import { setActiveModal } from "../redux/general/actions";
import type { ModalType } from "../types";

const useModal = () => {
  const dispatch = useAppDispatch();

  function closeModal() {
    return new Promise<void>((resolve) => {
      const modal = document.querySelector('[aria-modal="true"]');
      if (!(modal instanceof HTMLElement)) return resolve();

      if (modal.classList.contains("hidden")) return resolve();

      modal.classList.add("hidden");

      const handleAnimationEnd = (e: AnimationEvent) => {
        if (e.target === modal) {
          modal.removeEventListener("animationend", handleAnimationEnd);
          dispatch(setActiveModal(null));
          resolve();
        }
      };
      modal.addEventListener("animationend", handleAnimationEnd);
    });
  }

  async function openModal(modal: ModalType) {
    await closeModal();
    dispatch(setActiveModal(modal));
  }

  return { openModal, closeModal };
};

export default useModal;
