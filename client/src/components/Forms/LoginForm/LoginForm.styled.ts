import styled from "styled-components";
import LoginForm from "./LoginForm";
import { BREAKPOINTS } from "../../../constants";

const StyledLoginForm = styled(LoginForm)`
  & {
    > form {
      margin-top: 40px;

      & {
        > div:not(:last-of-type) {
          margin-bottom: 30px;
        }

        .forgot-btn {
          display: block;
          margin: 10px 0px 30px auto;
          width: fit-content;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
          color: var(--text-color-light);
          opacity: 0.4;
          transition: var(--transition);

          &:hover,
          &:focus-visible {
            opacity: 1;
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

export default StyledLoginForm;
