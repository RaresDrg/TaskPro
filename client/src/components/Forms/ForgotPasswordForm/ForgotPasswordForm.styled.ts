import styled from "styled-components";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { BREAKPOINTS } from "../../../constants";

const StyledForgotPasswordForm = styled(ForgotPasswordForm)`
  background-color: #fcfcfc;
  border: 0.5px solid #16161680;

  & {
    > form {
      margin-top: 40px;

      & {
        > div {
          margin-bottom: 40px;

          & {
            > input {
              color: var(--text-color-dark);

              &:-webkit-autofill,
              &:-webkit-autofill:hover,
              &:-webkit-autofill:focus {
                -webkit-text-fill-color: var(--text-color-dark);
                caret-color: var(--text-color-dark);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 40px;
    width: 425px;
  }
`;

export default StyledForgotPasswordForm;
