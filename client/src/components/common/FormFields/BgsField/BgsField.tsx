import { Field } from "formik";
import { BOARD_BACKGROUNDS } from "../../../../constants";
import { getCloudinaryImage } from "../../../../utils";

type Props = {
  className?: string;
};

const BgsField = ({ className }: Props) => {
  return (
    <div className={className}>
      <h3 id="background-label">Background</h3>
      <div role="radiogroup" aria-labelledby="background-label">
        {BOARD_BACKGROUNDS.map((item, index) => (
          <label key={item}>
            <Field
              type="radio"
              name="background"
              value={item}
              aria-label={`Background option ${index + 1}`}
            />
            <img src={getCloudinaryImage(`${item}_micro`)} alt="" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default BgsField;
