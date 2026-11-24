import styled from "styled-components";
import ResetPasswordPage from "./ResetPasswordPage";

const StyledResetPasswordPage = styled(ResetPasswordPage)`
  display: flex;

  & {
    > div {
      margin: auto;
      width: 100%;
      animation: fadeInDown 0.5s ease-in-out both;
    }
  }
`;

export default StyledResetPasswordPage;
