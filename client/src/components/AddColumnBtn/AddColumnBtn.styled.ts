import styled from "styled-components";
import AddColumnBtn from "./AddColumnBtn";
import { BREAKPOINTS } from "../../constants";

const StyledAddColumnBtn = styled(AddColumnBtn)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: ${({ theme }) =>
    theme.value === "dark"
      ? "var(--text-color-light)"
      : "var(--text-color-dark)"};
  width: 100%;
  min-width: 334px;
  height: 56px;
  border-radius: 8px;
  border: 0.5px solid
    ${({ theme }) => (theme.value === "dark" ? "#ffffff33" : "#16161633")};
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background-color: ${({ theme }) =>
    theme.value === "dark" ? "#121212" : "#FFFFFF"};
  transition: var(--transition);

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    height: 100%;
    width: 0;
    background-color: ${({ theme }) =>
      theme.value === "violet"
        ? "var(--violet-color-active)"
        : "var(--green-color-active)"};
    transition: var(--transition);
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) =>
      theme.value === "dark"
        ? "var(--text-color-dark)"
        : "var(--text-color-light)"};

    &::before {
      width: 100%;
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    font-size: 1rem;
    width: 334px;
  }
`;

export default StyledAddColumnBtn;
