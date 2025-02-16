import styled from "styled-components";
import FormPasswordField from "./FormPasswordField";

const StyledFormPasswordField = styled(FormPasswordField)`
  margin-bottom: 24px;
  position: relative;

  &.onError {
    & {
      input {
        border: 1px solid var(--error-color);
        opacity: 1;
      }

      .showPassword {
        opacity: 1;
      }
    }
  }

  & {
    input {
      border-radius: 8px;
      padding: 14px 64px 14px 18px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.02em;
      border: 1px solid var(--green-color-active);
      color: var(--text-color-white);
      caret-color: var(--text-color-white);
      opacity: 0.4;
      transition: var(--transition);

      &::placeholder {
        color: var(--text-color-white);
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--text-color-white);
        -webkit-background-clip: text;
      }

      &:focus {
        opacity: 1;
      }
    }

    .error {
      color: var(--error-color);
      font-style: italic;
      font-size: 12px;
      text-transform: lowercase;
    }

    .showPassword {
      position: absolute;
      top: 10.5px;
      right: 18px;
      cursor: pointer;
      opacity: 0.4;
      color: var(--text-color-white);
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default StyledFormPasswordField;
