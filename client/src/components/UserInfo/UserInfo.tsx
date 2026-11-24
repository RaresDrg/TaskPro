import { EllipsisTooltip, Icon } from "../common";
import { useReduxState, useModal } from "../../hooks";
import { getCloudinaryImage } from "../../utils";

type Props = {
  className?: string;
};

const UserInfo = ({ className }: Props) => {
  const userName = useReduxState("selectUserName");
  const userProfilePhotoID = useReduxState("selectUserProfilePhotoID");
  const { openModal } = useModal();

  return (
    <div className={className}>
      <EllipsisTooltip text={userName} className="username" />
      <button
        type="button"
        className="profile-photo"
        onClick={() => openModal("editUserModal")}
        title="Edit user profile"
        aria-label="Edit user profile"
      >
        {userProfilePhotoID ? (
          <img
            src={getCloudinaryImage(userProfilePhotoID)}
            alt="Profile photo"
          />
        ) : (
          <Icon name="icon-noProfile" />
        )}
      </button>
    </div>
  );
};

export default UserInfo;
