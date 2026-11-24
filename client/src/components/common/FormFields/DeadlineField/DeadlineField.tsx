import { Field, type FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "../../";

type Props = {
  className?: string;
};

const DeadlineField = ({ className }: Props) => {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Tab") {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <div className={className}>
      <h3 id="deadline-label">Deadline</h3>
      <Field name="deadline">
        {({ field, form }: FieldProps) => (
          <DatePicker
            selected={field.value}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            calendarStartDay={1}
            showIcon
            icon={<Icon name="icon-dropdown" />}
            popperPlacement="top-start"
            ariaLabelledBy="deadline-label"
            onKeyDown={handleKeyDown}
            onChange={(date: Date | null) => {
              if (date) form.setFieldValue(field.name, date);
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default DeadlineField;
