import { Field } from "formik";
import { BOARD_ICONS } from "../../../../constants";
import { Icon } from "../../../common";

type Props = {
  className?: string;
};

const IconsField = ({ className }: Props) => {
  return (
    <div className={className}>
      <h3 id="icon-label">Icon</h3>
      <div role="radiogroup" aria-labelledby="icon-label">
        {BOARD_ICONS.map((item, index) => (
          <label key={item}>
            <Field
              type="radio"
              name="icon"
              value={item}
              aria-label={`Icon option ${index + 1}`}
            />
            <Icon name={item} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default IconsField;
