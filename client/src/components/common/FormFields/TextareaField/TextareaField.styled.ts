import styled from "styled-components";
import TextareaField from "./TextareaField";
import { BREAKPOINTS } from "../../../../constants";

const StyledTextareaField = styled(TextareaField)`
  position: relative;

  & {
    > textarea {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "light" || theme.value === "violet"
          ? "var(--text-color-dark)"
          : "var(--text-color-light)"};
      padding: 14px 18px;
      border-radius: 8px;
      border: 1px solid
        ${({ theme }) =>
          theme.value === "violet"
            ? "var(--violet-color-active)"
            : "var(--green-color-active)"};
      scrollbar-width: thin;
      scrollbar-color: #808080 transparent;
      opacity: 0.4;
      transition: var(--transition);

      &::placeholder {
        color: currentColor;
      }

      &:not(:placeholder-shown) {
        opacity: 1;
      }

      &:focus {
        opacity: 1;
        box-shadow: 0 0 0 1px
          ${({ theme }) =>
            theme.value === "violet"
              ? "var(--violet-color-active)"
              : "var(--green-color-active)"};
      }

      &:has(+ p.error) {
        opacity: 1;
        border-color: var(--error-color);

        &:focus {
          box-shadow: 0 0 0 1px var(--error-color);
        }
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-background-clip: text;
        -webkit-text-fill-color: ${({ theme }) =>
          theme.value === "light" || theme.value === "violet"
            ? "var(--text-color-dark)"
            : "var(--text-color-light)"};
        caret-color: ${({ theme }) =>
          theme.value === "light" || theme.value === "violet"
            ? "var(--text-color-dark)"
            : "var(--text-color-light)"};
        transition: background-color 9999s 0s;
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > textarea {
        font-size: 1rem;
      }
    }
  }
`;

export default StyledTextareaField;
