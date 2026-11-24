import { createPortal } from "react-dom";
import GlobalLoading from "./Loaders/GlobalLoading";
import GlobalModal from "./Modals/GlobalModal";
import Notification from "./Notification/Notification";

const GlobalUI = () => {
  const modalRoot = document.getElementById("modal-root")!;
  const loadingRoot = document.getElementById("loading-root")!;
  const notificationRoot = document.getElementById("notification-root")!;

  return (
    <>
      {createPortal(<GlobalModal />, modalRoot)}
      {createPortal(<GlobalLoading />, loadingRoot)}
      {createPortal(<Notification />, notificationRoot)}
    </>
  );
};

export default GlobalUI;
