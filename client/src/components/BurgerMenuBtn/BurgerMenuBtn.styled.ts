import styled from "styled-components";
import BurgerMenuBtn from "./BurgerMenuBtn";

const StyledBurgerMenuBtn = styled(BurgerMenuBtn)`
  width: 24px;
  height: 24px;
  stroke: ${(props) => props.theme.textColor};
  transition: var(--transition);

  &:hover {
    transform: scale(0.9);
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export default StyledBurgerMenuBtn;
