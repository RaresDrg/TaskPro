import Container from "../common/Container/Container.styled";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn.styled";
import ThemeDropdown from "../ThemeDropdown/ThemeDropdown.styled";
import UserInfo from "../UserInfo/UserInfo.styled";
import { useReactResponsive } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const Header = ({ className: styles }: Props) => {
  const { isOnMobile, isOnTablet } = useReactResponsive();

  return (
    <header className={styles}>
      <Container>
        {(isOnMobile || isOnTablet) && <BurgerMenuBtn />}
        <ThemeDropdown />
        <UserInfo />
      </Container>
    </header>
  );
};

export default Header;
