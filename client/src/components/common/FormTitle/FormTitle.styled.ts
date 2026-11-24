import styled from "styled-components";
import { BREAKPOINTS } from "../../../constants";

const FormTitle = styled.h2`
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${({ theme }) =>
    theme.value === "dark"
      ? "var(--text-color-light)"
      : "var(--text-color-dark)"};
  transition: var(--transition);

  @media (min-width: ${BREAKPOINTS.tablet}) {
    font-size: 1.25rem;
  }
`;

export default FormTitle;
