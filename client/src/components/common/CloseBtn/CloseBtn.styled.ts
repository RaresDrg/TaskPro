import styled from "styled-components";
import CloseBtn from "./CloseBtn";

const StyledCloseBtn = styled(CloseBtn)`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 2px;
  color: ${({ theme }) =>
    theme.value === "dark"
      ? "var(--text-color-light)"
      : "var(--text-color-dark)"};
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) =>
      theme.value === "violet"
        ? "var(--violet-color-active)"
        : "var(--green-color-active)"};
    color: ${({ theme }) =>
      theme.value === "dark"
        ? "var(--text-color-dark)"
        : "var(--text-color-light)"};
    transform: scale(1.1);
  }

  & {
    > svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
    }
  }
`;

export default StyledCloseBtn;
