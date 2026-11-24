import { ToastContainer, Slide } from "react-toastify";
import { useTheme } from "styled-components";
import { useMediaQueries } from "../../../hooks";

const Notification = () => {
  const { value: userTheme } = useTheme();
  const { prefersReducedMotion } = useMediaQueries();

  return (
    <ToastContainer
      theme={userTheme === "dark" ? "dark" : "light"}
      position="top-right"
      autoClose={2500}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnFocusLoss
      pauseOnHover
      transition={Slide}
      hideProgressBar={prefersReducedMotion}
    />
  );
};

export default Notification;
