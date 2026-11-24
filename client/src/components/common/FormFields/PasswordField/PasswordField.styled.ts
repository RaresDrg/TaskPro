import styled from "styled-components";
import PasswordField from "./PasswordField";
import { BREAKPOINTS } from "../../../../constants";

const StyledPasswordField = styled(PasswordField)`
  position: relative;

  & {
    > input {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      color: var(--text-color-light);
      padding: 14px 60px 14px 18px;
      border-radius: 8px;
      border: 1px solid var(--green-color-active);
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
        box-shadow: 0 0 0 1px var(--green-color-active);
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
        -webkit-text-fill-color: var(--text-color-light);
        caret-color: var(--text-color-light);
        transition: background-color 9999s 0s;
      }
    }

    .toggle-btn {
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      padding: 2px;
      color: var(--text-color-light);
      opacity: 0.4;
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

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        background-color: currentColor;
        width: 2px;
        height: 0;
        transition: var(--transition);
      }

      &[data-visible="true"]::before {
        height: 100%;
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > input {
        font-size: 1rem;
      }
    }
  }
`;

export default StyledPasswordField;
