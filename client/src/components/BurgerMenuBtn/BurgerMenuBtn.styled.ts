import styled from "styled-components";
import BurgerMenuBtn from "./BurgerMenuBtn";
import { BREAKPOINTS } from "../../constants";

const StyledBurgerMenuBtn = styled(BurgerMenuBtn)`
  width: 24px;
  height: 24px;
  border: 0.5px solid transparent;
  color: ${({ theme }) =>
    theme.value === "dark"
      ? "var(--text-color-light)"
      : "var(--text-color-dark)"};
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    transform: scale(0.9);
    opacity: 0.5;
    border-color: currentColor;
  }

  & {
    > svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    width: 30px;
    height: 30px;
  }
`;

export default StyledBurgerMenuBtn;
