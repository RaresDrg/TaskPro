import { useModal } from "../../hooks";
import { Icon } from "../common";

type Props = {
  className?: string;
};

const LogoutBtn = ({ className }: Props) => {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openModal("logoutModal")}
    >
      <Icon name="icon-logout" />
      <span>Log out</span>
    </button>
  );
};

export default LogoutBtn;
