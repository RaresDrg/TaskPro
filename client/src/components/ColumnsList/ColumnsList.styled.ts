import styled from "styled-components";
import ColumnsList from "./ColumnsList";
import { BREAKPOINTS } from "../../constants";

const StyledColumnsList = styled(ColumnsList)`
  display: flex;
  gap: 20px;

  & {
    > li {
      width: 348px;
      display: flex;
      flex-direction: column;

      & {
        .heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: 334px;
          height: 56px;
          padding: 0 20px;
          border-radius: 8px;
          background-color: ${({ theme }) =>
            theme.value === "dark" ? "#121212" : "#FFFFFF"};
          transition: var(--transition);

          & {
            .column-title {
              font-weight: 500;
              font-size: 0.875rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              color: ${({ theme }) =>
                theme.value === "dark"
                  ? "var(--text-color-light)"
                  : "var(--text-color-dark)"};
              transition: var(--transition);
            }

            .actions {
              display: flex;
              gap: 8px;

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

        .add-card-btn {
          width: 334px;

          &:hover,
          &:focus-visible {
            box-shadow: none;
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > li {
        & {
          .heading {
            & {
              .column-title {
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledColumnsList;
