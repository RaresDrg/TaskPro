import { useState, useEffect, type ChangeEvent } from "react";
import { Field, useFormikContext } from "formik";
import { useReduxState } from "../../../../hooks";
import { getCloudinaryImage, notify } from "../../../../utils";
import {
  PROFILE_PHOTO_MAX_SIZE,
  PROFILE_PHOTO_TYPES,
} from "../../../../constants";
import { Icon } from "../../";

type Props = {
  className?: string;
};

const ProfilePhotoField = ({ className }: Props) => {
  const userProfilePhotoID = useReduxState("selectUserProfilePhotoID");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    userProfilePhotoID ? getCloudinaryImage(userProfilePhotoID) : null,
  );
  const { setFieldValue } = useFormikContext();

  function handleProfilePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.currentTarget.files?.[0];
    if (!selectedFile) return;

    if (!PROFILE_PHOTO_TYPES.includes(selectedFile.type)) {
      notify.warning("Supported formats: JPEG, PNG, or WebP.");
      return;
    }

    if (selectedFile.size > PROFILE_PHOTO_MAX_SIZE) {
      notify.warning("The image must be smaller than 5 MB.");
      return;
    }

    setProfilePhotoUrl(URL.createObjectURL(selectedFile));
    setFieldValue("profilePhoto", selectedFile);
  }

  useEffect(() => {
    return () => {
      if (profilePhotoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePhotoUrl);
      }
    };
  }, [profilePhotoUrl]);

  return (
    <div className={className}>
      <div>
        {profilePhotoUrl ? (
          <img src={profilePhotoUrl} alt="Profile photo" />
        ) : (
          <Icon name="icon-noProfile" />
        )}
      </div>
      <label title="Add profile photo">
        <Field
          type="file"
          name="profilePhoto"
          accept={PROFILE_PHOTO_TYPES.join(",")}
          onChange={handleProfilePhotoChange}
          value=""
          aria-label="Add profile photo"
        />
        <Icon name="icon-plus" />
      </label>
    </div>
  );
};

export default ProfilePhotoField;
