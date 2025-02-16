import { Field, FormikProps } from "formik";
import { ChangeEvent, useState } from "react";
import { useAuth } from "../../../hooks/hooks";
import { notify, renderIcon } from "../../../utils/utils";

type Props = {
  className?: string;
  setFieldValue: FormikProps<{ profilePhoto: File }>["setFieldValue"];
};

const FormFileField = ({ className: styles, setFieldValue }: Props) => {
  const { user, theme } = useAuth();
  const [file, setFile] = useState(user!.profilePhotoUrl);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (e.target.files[0].size > 5000000) {
        const msg = "Error: The file is larger than the allowed 5 MB limit.";
        notify.warning(msg);
      } else {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFieldValue("profilePhoto", e.target.files[0]);
      }
    }
  }

  return (
    <div className={styles}>
      {file ? (
        <img src={file} alt="profile" />
      ) : (
        renderIcon(`icon-no-profile-${theme}`)
      )}

      <Field
        id="fileInput"
        type="file"
        name="profilePhoto"
        accept="image/*"
        value=""
        onChange={handleChange}
      />
      <label htmlFor="fileInput">{renderIcon("icon-plus")}</label>
    </div>
  );
};

export default FormFileField;
