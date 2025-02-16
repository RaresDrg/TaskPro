import { RootState } from "../../App.types";

const selectIsLoading = (state: RootState) => state.auth.isLoading;
const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const selectUser = (state: RootState) => state.auth.user;
const selectTheme = (state: RootState) => state.auth.user?.theme;

export default { selectIsLoading, selectIsLoggedIn, selectUser, selectTheme };
