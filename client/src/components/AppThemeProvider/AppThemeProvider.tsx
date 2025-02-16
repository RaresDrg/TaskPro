import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { useAuth } from "../../hooks/hooks";

type Props = {
  children: ReactElement;
};

const AppThemeProvider = ({ children }: Props) => {
  const { theme } = useAuth();

  const appTheme = {
    headerBg:
      theme === "dark" ? "var(--header-bg-black)" : "var(--header-bg-white)",
    dashboardPageBg:
      (theme === "dark" && "var(--dashboard-page-bg-black)") ||
      (theme === "light" && "var(--dashboard-page-bg-white)") ||
      (theme === "violet" && "var(--dashboard-page-bg-violet)"),
    dashboardTextColor:
      theme === "dark"
        ? "var(--dashboard-text-color-white)"
        : "var(--dashboard-text-color-black)",
    leftsideBarBg:
      (theme === "dark" && "var(--leftsideBar-bg-black)") ||
      (theme === "light" && "var(--leftsideBar-bg-white)") ||
      (theme === "violet" && "var(--leftsideBar-bg-violet)"),
    leftsideBarTextColor:
      (theme === "dark" && "var(--text-color-white)") ||
      (theme === "light" && "var(--text-color-black)") ||
      (theme === "violet" && "var(--text-color-white)"),
    logoutBtnStroke:
      theme === "violet"
        ? "var(--text-color-white)"
        : "var(--green-color-active)",
    highlightColor:
      theme === "violet" ? "var(--violet-color)" : "var(--green-color)",
    highlightColorActive:
      theme === "violet"
        ? "var(--violet-color-active)"
        : "var(--green-color-active)",
    textColor:
      theme === "dark" ? "var(--text-color-white)" : "var(--text-color-black)",
    goBackBtnBg:
      (theme === "dark" && "var(--green-color-active)") ||
      (theme === "light" && "var(--green-color-active)") ||
      (theme === "violet" && "var(--violet-color-active)") ||
      (theme === null && "red"),
    needHelpBg:
      (theme === "dark" && "#1f1f1f") ||
      (theme === "light" && "#f6f6f7") ||
      (theme === "violet" && "#ecedfd66"),
    deadlineDateColor:
      (theme === "dark" && "var(--text-color-white)") ||
      (theme === "light" && "var(--green-color-active)") ||
      (theme === "violet" && "var(--violet-color-active)"),
    deadlineBg: theme === "dark" ? "#1f1f1f" : "#ffffff",
    deadlineSeparatorBg: theme === "dark" ? "#ffffff33" : "#16161633",
    deadlineArrow: theme === "dark" ? "#ffffff80" : "#16161680",
    deadlineDaysColor: theme === "dark" ? "#ffffff80" : "#16161680",
    deadlineDayColor:
      theme === "dark" ? "var(--text-color-black)" : "var(--text-color-white)",
    deadlineDisabledColor: theme === "dark" ? "#ffffff33" : "#16161633",
    addColumnBg: theme === "dark" ? "#121212" : "var(--text-color-white)",
    addColumnIconBg:
      (theme === "dark" && "var(--text-color-white)") ||
      (theme === "light" && "var(--text-color-black)") ||
      (theme === "violet" && "var(--violet-color-active)"),
    boardItemActiveBg:
      (theme === "dark" && "#1f1f1f") ||
      (theme === "light" && "#f6f6f7") ||
      (theme === "violet" && "#ffffff80"),
    boardItemActiveAfterBg:
      theme === "violet" ? "var(--text-color-white)" : "var(--green-color)",
    cardSeparator: theme === "dark" ? "#ffffff1a" : "#1616161a",
    boardBg: theme === "violet" ? "#5255BCb3" : "#9dc888b3",
    filterModalSeaprator: theme === "dark" ? "#ffffff1a" : "#1616161a",
    myBoardsSepartor: theme === "light" ? "#1616161a" : "#ffffff1a",
    formBg: theme === "dark" ? "var(--form-bg-black)" : "var(--form-bg-white)",
    formBorderColor: theme === "dark" ? "#ffffff99" : "#161616e6",
    formShadowColor: theme === "dark" ? "#ffffff33" : "#16161699",
    exitButonColorHover:
      theme === "dark" ? "var(--text-color-black)" : "var(--text-color-white)",
    formInputColor:
      !theme || theme == "dark"
        ? "var(--text-color-white)"
        : "var(--text-color-black)",
  };

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
