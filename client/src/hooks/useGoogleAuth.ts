import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { handleGoogleAuth } from "./../redux/auth/operations";
import { notify } from "./../utils/notify";

const useGoogleAuth = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const googleAuthError = queryParams.get("googleAuthFailed");
    if (googleAuthError) {
      notify.warning(googleAuthError);
      window.history.replaceState({}, document.title, location.pathname);
      return;
    }

    const validationToken = queryParams.get("googleAuthSuccess");
    if (validationToken) {
      dispatch(handleGoogleAuth(validationToken))
        .unwrap()
        .then((value) => notify.success(`Welcome, ${value.data.user.name} !`))
        .catch(() => notify.warning("Google authentication failed !"))
        .finally(() => {
          window.history.replaceState({}, document.title, location.pathname);
        });
      return;
    }
  }, [location.search]);
};

export default useGoogleAuth;
