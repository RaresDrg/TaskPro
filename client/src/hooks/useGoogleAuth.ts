import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAppDispatch from "./useAppDispatch";
import { setAuthenticatedUser } from "../redux/auth/actions";
import { authService } from "../services";
import { notify, handleRequestFlow } from "../utils";

const useGoogleAuth = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const authHasFailed = searchParams.has("googleAuthFailed");
  const validationToken = searchParams.get("googleAuthSuccess");

  function removeParam(name: "googleAuthFailed" | "googleAuthSuccess") {
    setSearchParams(
      (prev) => {
        prev.delete(name);
        return prev;
      },
      { replace: true },
    );
  }

  function notifyFailedAuth() {
    notify.error("Google authentication failed. Please try again.");
  }

  useEffect(() => {
    if (authHasFailed) {
      notifyFailedAuth();
      removeParam("googleAuthFailed");
    } else if (validationToken) {
      handleRequestFlow({
        request: () => authService.googleAuth({ validationToken }),
        delay: 2500,
        loadingType: "screen",
        onSuccess: (res) => {
          dispatch(setAuthenticatedUser(res.data));
          notify.success(`Welcome, ${res.data.name} !`);
        },
        onError: () => notifyFailedAuth(),
        onFinally: () => removeParam("googleAuthSuccess"),
      });
    }
  }, [authHasFailed, validationToken]);
};

export default useGoogleAuth;
