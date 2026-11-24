import styled from "styled-components";
import BgsField from "./BgsField";
import { BREAKPOINTS } from "../../../../constants";

const StyledBgsField = styled(BgsField)`
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
      flex-wrap: wrap;
      gap: 8px;

      & {
        > label {
          width: 28px;
          height: 28px;
          position: relative;
          color: ${({ theme }) =>
            theme.value === "dark"
              ? "var(--text-color-light)"
              : "var(--text-color-dark)"};
          filter: brightness(65%) opacity(65%);
          outline: 1px solid transparent;
          outline-offset: 1px;
          transition: var(--transition);

          &:has(> input:hover),
          &:has(> input:focus-visible) {
            outline-color: currentColor;
            filter: brightness(85%) opacity(85%);
          }

          &:has(> input:checked) {
            filter: brightness(100%) opacity(100%);
            transform: scale(1.2);
          }

          & {
            > input {
              cursor: pointer;
              position: absolute;
              inset: 0;
              opacity: 0;
            }

            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
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
            width: 34px;
            height: 34px;
          }
        }
      }
    }
  }
`;

export default StyledBgsField;
