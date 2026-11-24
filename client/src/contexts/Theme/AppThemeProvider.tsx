import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { useReduxState } from "../../hooks";

type Props = {
  children: ReactNode;
};

const AppThemeProvider = ({ children }: Props) => {
  const userTheme = useReduxState("selectUserTheme");

  return <ThemeProvider theme={{ value: userTheme }}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
