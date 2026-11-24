import { Logo } from "..";
import { MyBoards, SupportCard, LogoutBtn } from "../../";

type Props = {
  className?: string;
};

const LeftSidebar = ({ className }: Props) => {
  return (
    <aside className={className}>
      <Logo className="logo" />
      <MyBoards />
      <SupportCard />
      <LogoutBtn />
    </aside>
  );
};

export default LeftSidebar;
