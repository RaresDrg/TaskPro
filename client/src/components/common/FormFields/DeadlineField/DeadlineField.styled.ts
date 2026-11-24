import styled from "styled-components";
import DeadlineField from "./DeadlineField";
import { BREAKPOINTS } from "../../../../constants";

const StyledDeadlineField = styled(DeadlineField)`
  & {
    > h3 {
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "dark" ? "#FFFFFF80" : "#16161680"};
      transition: var(--transition);
    }

    .react-datepicker-wrapper {
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
      &:has(input:focus-visible),
      &:has(+ .react-datepicker__tab-loop) {
        &::after {
          width: 100%;
          opacity: 1;
          left: 0;
        }
      }

      & {
        > div {
          & {
            > input {
              padding: 0;
              padding-right: 22px;
              field-sizing: content;
              cursor: pointer;
              font-weight: 400;
              font-size: 0.875rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              color: inherit;
              caret-color: transparent;

              &::selection {
                background-color: transparent;
              }
            }

            > svg {
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              pointer-events: none;
              width: 18px;
              height: 18px;
              padding: 0;
              fill: none;
              stroke: currentColor;
            }
          }
        }
      }
    }

    .react-datepicker__day--disabled {
      cursor: not-allowed;
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > h3 {
        font-size: 0.875rem;
      }

      .react-datepicker-wrapper {
        & {
          > div {
            & {
              > input {
                font-size: 1rem;
                padding-right: 24px;
              }

              > svg {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledDeadlineField;
