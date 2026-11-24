import styled from "styled-components";
import BoardsList from "./BoardsList";
import { BREAKPOINTS } from "../../constants";

const StyledBoardsList = styled(BoardsList)`
  margin-top: 40px;
  flex: 1 0 200px;
  overflow-y: auto;
  animation: fadeIn 0.35s ease-in-out both;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: ${({ theme }) =>
      theme.value === "violet" ? "#FFFFFF" : "var(--green-color-active)"};
    cursor: pointer;
  }

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
        theme.value === "violet" ? "#FFFFFF" : "var(--green-color-active)"}
      transparent;
  }

  & {
    > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 20px 14px;

      &:has(> a.active) {
        background-color: #8080804d;
      }

      & {
        > a {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          color: ${({ theme }) =>
            theme.value === "light"
              ? "var(--text-color-dark)"
              : "var(--text-color-light)"};
          opacity: 0.5;
          transition: var(--transition);

          &:not(.active) {
            &:hover,
            &:focus-visible {
              opacity: 0.75;
            }
          }

          &.active {
            opacity: 1;
          }

          & {
            > svg {
              width: 18px;
              height: 18px;
              flex-shrink: 0;
              fill: none;
              stroke: currentColor;
            }

            > span {
              font-weight: 500;
              font-size: 0.875rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
            }
          }
        }

        .board-actions {
          display: flex;
          gap: 8px;

          & {
            > button {
              width: 16px;
              height: 16px;
              color: ${({ theme }) =>
                theme.value === "light"
                  ? "var(--text-color-dark)"
                  : "var(--text-color-light)"};
              opacity: 0.5;
              transition: var(--transition);

              &:hover,
              &:focus-visible {
                opacity: 1;
              }

              & {
                > svg {
                  width: 100%;
                  height: 100%;
                  fill: none;
                  stroke: currentColor;
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
      > li {
        padding: 20px 24px;

        & {
          > a {
            & {
              > svg {
                width: 20px;
                height: 20px;
              }

              > span {
                font-size: 1rem;
              }
            }
          }

          .board-actions {
            & {
              > button {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledBoardsList;
