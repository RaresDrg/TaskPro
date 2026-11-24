import styled from "styled-components";
import RegisterPage from "./RegisterPage";

const StyledRegisterPage = styled(RegisterPage)`
  display: flex;

  & {
    > div {
      margin: auto;
      width: 100%;
      animation: zoomIn 1s ease-in-out both;
    }
  }
`;

export default StyledRegisterPage;
