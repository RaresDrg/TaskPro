import type { RootState } from "../../types";

const authSelectors = {
  selectIsLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  selectUserAuthMethod: (state: RootState) => state.auth.user?.authMethod,
  selectUserTheme: (state: RootState) => state.auth.user?.theme,
  selectUserName: (state: RootState) => state.auth.user?.name ?? "",
  selectUserEmail: (state: RootState) => state.auth.user?.email ?? "",
  selectUserProfilePhotoID: (state: RootState) =>
    state.auth.user?.profilePhotoID,
};

export default authSelectors;
