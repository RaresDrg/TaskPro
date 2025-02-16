import { renderIcon } from "../../utils/utils";
import { useAuth, useModals } from "../../hooks/hooks";
import { Username } from "../common/EllipsisTooltip/EllipsisTooltip.styled";

type Props = {
  className?: string;
};

const UserInfo = ({ className: styles }: Props) => {
  const { user, theme } = useAuth();
  const { openModal } = useModals();

  return (
    <div className={styles}>
      <Username text={user!.name} />

      <div className="user-photo" onClick={() => openModal("editUserModal")}>
        {user?.profilePhotoUrl ? (
          <img src={user.profilePhotoUrl} alt="profile" />
        ) : (
          renderIcon(`icon-no-profile-${theme}`)
        )}
      </div>
    </div>
  );
};

export default UserInfo;
