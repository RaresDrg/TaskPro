import styled from "styled-components";
import LoginPage from "./LoginPage";

const StyledLoginPage = styled(LoginPage)`
  display: flex;

  & {
    > div {
      margin: auto;
      width: 100%;
      animation: zoomIn 1s ease-in-out both;
    }
  }
`;

export default StyledLoginPage;
