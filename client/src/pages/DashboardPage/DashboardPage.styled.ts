import styled from "styled-components";
import DashboardPage from "./DashboardPage";

const StyledDashboardPage = styled(DashboardPage)`
  min-height: calc(100dvh - 60px);
  padding: 14px 0px;
  display: flex;
  align-items: center;
  border-top: 1px solid grey;
  background-color: ${(props) => props.theme.dashboardPageBg};
  transition: var(--transition);

  & > div {
    display: flex;
    justify-content: center;
    min-width: 100%;

    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: -0.02em;
      text-align: center;
      width: 335px;
      color: ${(props) => props.theme.dashboardTextColor};
      transition: var(--transition);

      b {
        cursor: pointer;
        color: ${(props) => props.theme.highlightColorActive};
        transition: var(--transition);

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  @media (min-width: 768px) {
    min-height: calc(100dvh - 68px);

    & > div {
      p {
        font-size: 14px;
        line-height: 18px;
        width: 486px;
      }
    }
  }

  @media (min-width: 1440px) {
    margin-left: 260px;
  }
`;

export default StyledDashboardPage;
