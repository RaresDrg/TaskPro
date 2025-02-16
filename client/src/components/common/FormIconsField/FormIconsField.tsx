import { Field } from "formik";
import { renderIcon } from "../../../utils/renderIcon";
import { BOARD_ICONS } from "../../../constants/constants";

type Props = {
  className?: string;
};

const FormIconsField = ({ className: styles }: Props) => {
  return (
    <div className={styles}>
      <h3>Icons</h3>
      <div className="radio-options">
        {BOARD_ICONS.map((item) => (
          <div key={item}>
            <Field type="radio" id={item} value={item} name="icon" />
            <label htmlFor={item}>{renderIcon(item)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormIconsField;
