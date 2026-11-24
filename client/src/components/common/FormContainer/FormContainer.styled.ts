import styled from "styled-components";
import { BREAKPOINTS } from "../../../constants";

const FormContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 60px 0px #00000040;
  border: 1px solid
    ${({ theme }) =>
      theme.value === "light" || theme.value === "violet"
        ? "#161616bf"
        : "#80808080"};
  background-color: ${({ theme }) =>
    theme.value === "light" || theme.value === "violet"
      ? "#FCFCFC"
      : "#151515"};
  transition: var(--transition);

  @media (min-width: ${BREAKPOINTS.tablet}) {
    width: 400px;
    margin: 0 auto;
  }
`;

export default FormContainer;
