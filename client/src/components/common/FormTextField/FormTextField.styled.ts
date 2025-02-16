import styled from "styled-components";
import FormTextField from "./FormTextField";

const StyledFormTextField = styled(FormTextField)`
  margin-bottom: 24px;

  &.onError {
    & {
      input {
        border: 1px solid var(--error-color);
        opacity: 1;
      }
    }
  }

  & {
    input {
      border-radius: 8px;
      padding: 14px 18px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.02em;
      border: ${(props) => `1px solid ${props.theme.highlightColorActive}`};
      color: ${(props) => props.theme.formInputColor};
      caret-color: ${(props) => props.theme.formInputColor};
      opacity: 0.4;
      transition: var(--transition);

      &::placeholder {
        color: ${(props) => props.theme.formInputColor};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${(props) => props.theme.formInputColor};
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
  }
`;

export default StyledFormTextField;
