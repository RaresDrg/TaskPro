import styled from "styled-components";
import ChangePasswordForm from "./ChangePasswordForm";
import { BREAKPOINTS } from "../../../constants";

const StyledChangePasswordForm = styled(ChangePasswordForm)`
  background-color: #fcfcfc;
  border: 0.5px solid #16161680;

  & {
    > form {
      margin-top: 40px;

      & {
        > div {
          &:not(:last-of-type) {
            margin-bottom: 30px;
          }

          &:last-of-type {
            margin-bottom: 40px;
          }

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

            .toggle-btn {
              color: var(--text-color-dark);
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

export default StyledChangePasswordForm;
