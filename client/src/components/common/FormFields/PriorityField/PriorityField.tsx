import { Field } from "formik";
import { CARD_PRIORITIES } from "../../../../constants";

type Props = {
  className?: string;
};

const PriorityField = ({ className }: Props) => {
  return (
    <div className={className}>
      <h3 id="priority-label">Priority</h3>
      <div role="radiogroup" aria-labelledby="priority-label">
        {CARD_PRIORITIES.map((item) => (
          <label key={item} title={item} data-priority={item}>
            <Field
              type="radio"
              name="priority"
              value={item}
              aria-label={`Priority: ${item}`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default PriorityField;
