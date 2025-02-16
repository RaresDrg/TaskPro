import styled from "styled-components";
import ForgotPasswordModal from "./ForgotPasswordModal";

const StyledForgotPasswordModal = styled(ForgotPasswordModal)`
  form > div > input {
    color: var(--text-color-black);
    caret-color: var(--text-color-black);

    &::placeholder {
      color: var(--text-color-black);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: var(--text-color-black);
    }
  }
`;

export default StyledForgotPasswordModal;
