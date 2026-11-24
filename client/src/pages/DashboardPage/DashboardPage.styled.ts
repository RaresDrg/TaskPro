import styled from "styled-components";
import DashboardPage from "./DashboardPage";
import { BREAKPOINTS } from "../../constants";

const StyledDashboardPage = styled(DashboardPage)`
  display: flex;

  & {
    > div {
      margin: auto;

      & {
        > p {
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1.33;
          letter-spacing: -0.02em;
          text-align: center;
          color: ${({ theme }) =>
            theme.value === "dark" ? "#FFFFFF80" : "#161616B2"};
          transition: var(--transition);
          animation: fadeIn 0.35s ease-in-out both;

          & {
            > button {
              font-weight: 500;
              position: relative;
              color: ${({ theme }) =>
                theme.value === "violet"
                  ? "var(--violet-color-active)"
                  : "var(--green-color-active)"};
              transition: var(--transition);

              &::after {
                content: "";
                position: absolute;
                bottom: -1px;
                right: 0;
                background-color: currentColor;
                height: 1px;
                width: 0;
                opacity: 0;
                transition: var(--transition);
              }

              &:hover,
              &:focus-visible {
                &::after {
                  width: 100%;
                  opacity: 1;
                  left: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div {
        & {
          > p {
            font-size: 1rem;
            width: 550px;
          }
        }
      }
    }
  }
`;

export default StyledDashboardPage;
