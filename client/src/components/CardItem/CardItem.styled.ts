import styled from "styled-components";
import CardItem from "./CardItem";

const StyledCardItem = styled(CardItem)`
  cursor: grab;
  position: relative;
  overflow: hidden;
  width: 334px;
  padding: 14px 20px 14px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.value === "dark" ? "#121212" : "#FFFFFF"};
  transition: var(--transition);

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }

  & {
    &[data-priority="without"] {
      &::before,
      & > div .priority > span:nth-of-type(2)::before {
        background-color: var(--priority-without-color);
      }
    }

    &[data-priority="low"] {
      &::before,
      & > div .priority > span:nth-of-type(2)::before {
        background-color: var(--priority-low-color);
      }
    }

    &[data-priority="medium"] {
      &::before,
      & > div .priority > span:nth-of-type(2)::before {
        background-color: var(--priority-medium-color);
      }
    }

    &[data-priority="high"] {
      &::before,
      & > div .priority > span:nth-of-type(2)::before {
        background-color: var(--priority-high-color);
      }
    }

    &[data-overdue="true"] {
      &::before {
        background-color: var(--error-color);
      }

      & > div .deadline > span:nth-of-type(2) {
        color: var(--error-color);
        font-weight: 600;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
  }

  & {
    .card-title {
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "dark"
          ? "var(--text-color-light)"
          : "var(--text-color-dark)"};
      transition: var(--transition);
    }

    .description {
      margin-bottom: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
      height: calc(1.5em * 3);
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "dark" ? "#FFFFFF80" : "#161616B2"};
      transition: var(--transition);
    }

    > div {
      display: flex;
      align-items: center;
      gap: 20px;
      padding-top: 14px;
      border-top: 1px solid
        ${({ theme }) => (theme.value === "dark" ? "#ffffff1a" : "#1616161a")};
      transition: var(--transition);

      & {
        .priority {
          display: flex;
          flex-direction: column;
          gap: 2px;

          & {
            > span:nth-of-type(1) {
              font-weight: 400;
              font-size: 0.625rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              color: ${({ theme }) =>
                theme.value === "dark" ? "#FFFFFF80" : "#16161680"};
              transition: var(--transition);
            }

            > span:nth-of-type(2) {
              display: flex;
              align-items: center;
              gap: 4px;
              font-weight: 400;
              font-size: 0.75rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              text-transform: capitalize;
              color: ${({ theme }) =>
                theme.value === "dark"
                  ? "var(--text-color-light)"
                  : "var(--text-color-dark)"};
              transition: var(--transition);

              &::before {
                content: "";
                width: 13px;
                height: 13px;
                border-radius: 50%;
              }
            }
          }
        }

        .deadline {
          display: flex;
          flex-direction: column;
          gap: 2px;

          & {
            > span:nth-of-type(1) {
              font-weight: 400;
              font-size: 0.625rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              color: ${({ theme }) =>
                theme.value === "dark" ? "#FFFFFF80" : "#16161680"};
              transition: var(--transition);
            }

            > span:nth-of-type(2) {
              font-weight: 400;
              font-size: 0.75rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              color: ${({ theme }) =>
                theme.value === "dark"
                  ? "var(--text-color-light)"
                  : "var(--text-color-dark)"};
              transition: var(--transition);
            }
          }
        }

        .actions {
          display: flex;
          gap: 8px;
          margin-left: auto;

          & {
            > button {
              width: 16px;
              height: 16px;
              color: ${({ theme }) =>
                theme.value === "dark"
                  ? "var(--text-color-light)"
                  : "var(--text-color-dark)"};
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
`;

export default StyledCardItem;
