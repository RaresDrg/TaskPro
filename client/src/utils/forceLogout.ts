import { store } from "../redux/store";
import { resetStore } from "./resetStore";
import { notify } from "./notify";

export function forceLogout() {
  if (store.getState().auth.isLoggedIn) {
    resetStore();
    sessionStorage.removeItem("sessionId");
    notify.warning("Your session has expired. Please log in again.");
  }
}
