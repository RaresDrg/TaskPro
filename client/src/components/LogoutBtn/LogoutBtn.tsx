import { renderIcon } from "../../utils/utils";
import { useModals } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const LogoutBtn = ({ className: styles }: Props) => {
  const { openModal } = useModals();

  return (
    <button
      type="button"
      className={styles}
      onClick={() => openModal("logoutModal")}
      data-secondary-action="close burger menu"
    >
      {renderIcon("icon-logout")}
      <span>Log out</span>
    </button>
  );
};

export default LogoutBtn;
