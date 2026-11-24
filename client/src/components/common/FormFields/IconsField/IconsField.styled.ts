import styled from "styled-components";
import IconsField from "./IconsField";
import { BREAKPOINTS } from "../../../../constants";

const StyledIconsField = styled(IconsField)`
  & {
    > h3 {
      margin-bottom: 14px;
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

    > div {
      display: flex;
      gap: 8px;

      & {
        > label {
          width: 18px;
          height: 18px;
          position: relative;
          color: ${({ theme }) =>
            theme.value === "dark"
              ? "var(--text-color-light)"
              : "var(--text-color-dark)"};
          opacity: 0.5;
          outline: 1px solid transparent;
          outline-offset: 1px;
          transition: var(--transition);

          &:has(> input:hover),
          &:has(> input:focus-visible) {
            outline-color: currentColor;
          }

          &:has(> input:checked) {
            opacity: 1;
            transform: scale(1.2);
          }

          & {
            > input {
              cursor: pointer;
              position: absolute;
              inset: 0;
              opacity: 0;
            }

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

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > h3 {
        font-size: 1rem;
      }

      > div {
        & {
          > label {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
`;

export default StyledIconsField;
