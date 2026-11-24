import { BurgerMenuBtn, ThemeDropdown, UserInfo } from "..";
import { Container } from "../common";
import { useMediaQueries } from "../../hooks";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const { isOnMobile, isOnTablet } = useMediaQueries();

  return (
    <header className={className}>
      <Container>
        {(isOnMobile || isOnTablet) && <BurgerMenuBtn />}
        <ThemeDropdown />
        <UserInfo />
      </Container>
    </header>
  );
};

export default Header;
