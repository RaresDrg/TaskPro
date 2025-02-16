import { LogoOnSidebar as Logo } from "../../common/Logo/Logo.styled";
import MyBoards from "../../MyBoards/MyBoards.styled";
import NeedHelp from "../../NeedHelp/NeedHelp.styled";
import LogoutBtn from "../../LogoutBtn/LogoutBtn.styled";

type Props = {
  className?: string;
};

const LeftSidebar = ({ className: styles }: Props) => {
  return (
    <aside className={styles}>
      <Logo />
      <MyBoards />
      <NeedHelp />
      <LogoutBtn />
    </aside>
  );
};

export default LeftSidebar;
