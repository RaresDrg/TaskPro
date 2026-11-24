import styled from "styled-components";
import PriorityField from "./PriorityField";
import { BREAKPOINTS } from "../../../../constants";

const StyledPriorityField = styled(PriorityField)`
  & {
    > h3 {
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "dark" ? "#FFFFFF80" : "#16161680"};
      transition: var(--transition);
    }

    > div {
      display: flex;
      gap: 8px;

      & {
        > label {
          cursor: pointer;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid transparent;
          background-color: currentColor;
          transition: var(--transition);

          & {
            &[data-priority="without"] {
              color: var(--priority-without-color);
            }
            &[data-priority="low"] {
              color: var(--priority-low-color);
            }
            &[data-priority="medium"] {
              color: var(--priority-medium-color);
            }
            &[data-priority="high"] {
              color: var(--priority-high-color);
            }
          }

          &::after {
            content: "";
            position: absolute;
            inset: -3px;
            border: 1px solid transparent;
            transition: var(--transition);
          }

          &:has(> input:hover),
          &:has(> input:focus-visible) {
            &::after {
              border-color: #808080;
            }
          }

          &:has(> input:checked) {
            background-color: transparent;
            border-color: currentColor;
            transform: scale(1.3);

            & {
              > input {
                opacity: 1;
                transform: scale(1);
              }
            }
          }

          & {
            > input {
              cursor: pointer;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              color: inherit;
              background-color: currentColor;
              opacity: 0;
              transform: scale(0);
              transition: var(--transition);
            }
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > h3 {
        font-size: 0.875rem;
      }

      > div {
        & {
          > label {
            width: 18px;
            height: 18px;

            & {
              > input {
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledPriorityField;
