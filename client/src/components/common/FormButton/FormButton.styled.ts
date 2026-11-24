import styled from "styled-components";
import FormButton from "./FormButton";
import { BREAKPOINTS } from "../../../constants";

const StyledFormButton = styled(FormButton)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: var(--text-color-dark);
  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #808080;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background-color: ${({ theme }) =>
    theme.value === "violet" ? "var(--violet-color)" : "var(--green-color)"};
  transition: var(--transition);

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: ${({ theme }) =>
      theme.value === "violet"
        ? "var(--violet-color-active)"
        : "var(--green-color-active)"};
    transition: var(--transition);
  }

  &:disabled {
    opacity: 0.7;
    background-color: #808080;
  }

  &:hover:not(:disabled),
  &:focus-visible {
    color: var(--text-color-light);
    box-shadow: ${({ theme }) =>
      theme.value === "violet"
        ? "0px 0px 8px 0px var(--violet-color), 0px 4px 10px -2px #00000026"
        : "0px 0px 8px 0px var(--green-color), 0px 4px 10px -2px #00000026"};

    &::before {
      width: 100%;
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    font-size: 1rem;
  }
`;

export default StyledFormButton;
