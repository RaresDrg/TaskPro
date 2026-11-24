import styled from "styled-components";
import MyBoards from "./MyBoards";
import { BREAKPOINTS } from "../../constants";

const StyledMyBoards = styled(MyBoards)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 40px;

  & {
    .title {
      margin-left: 14px;
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "light" ? "#16161680" : "#FFFFFF80"};
      transition: var(--transition);
    }

    .action {
      margin: 8px 14px 0 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      padding-bottom: 14px;
      border-top: 1px solid
        ${({ theme }) => (theme.value === "light" ? "#1616161A" : "#FFFFFF1A")};
      border-bottom: 1px solid
        ${({ theme }) => (theme.value === "light" ? "#1616161A" : "#FFFFFF1A")};
      transition: var(--transition);

      & {
        > span {
          width: 76px;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: ${({ theme }) =>
            theme.value === "light"
              ? "var(--text-color-dark)"
              : "var(--text-color-light)"};
          transition: var(--transition);
        }

        > button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 36px;
          border-radius: 6px;
          border: 0.5px solid #808080;
          background-color: ${({ theme }) =>
            theme.value === "violet"
              ? "var(--violet-color)"
              : "var(--green-color)"};
          transition: var(--transition);

          & {
            > svg {
              width: 20px;
              height: 20px;
              stroke: var(--text-color-dark);
              transition: var(--transition);
            }
          }

          &:hover,
          &:focus-visible {
            background-color: ${({ theme }) =>
              theme.value === "violet"
                ? "var(--violet-color-active)"
                : "var(--green-color-active)"};
            box-shadow: 0 2px 6px #808080;
            border-color: var(--text-color-light);

            & {
              > svg {
                stroke: var(--text-color-light);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      .title {
        margin-left: 24px;
        font-size: 0.875rem;
      }

      .action {
        margin: 8px 24px 0 24px;

        & {
          > span {
            width: 84px;
            font-size: 1rem;
          }

          > button {
            width: 42px;
            height: 38px;

            & {
              > svg {
                width: 21px;
                height: 21px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledMyBoards;
