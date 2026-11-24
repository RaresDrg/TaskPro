import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import { BREAKPOINTS } from "../../../constants";

const StyledRegisterForm = styled(RegisterForm)`
  & {
    > form {
      margin-top: 40px;

      & {
        > div:not(:last-of-type) {
          margin-bottom: 30px;
        }

        > div:last-of-type {
          margin-bottom: 40px;
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 40px;
    width: 425px;
  }
`;

export default StyledRegisterForm;
