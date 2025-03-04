import { useState } from "react";
import { FormikProps } from "formik";
import DatePicker from "react-datepicker";
import { renderIcon } from "../../../utils/renderIcon";
import DateInput from "../DateInput/DateInput";

type Props = {
  className?: string;
  deadline?: Date;
  setFieldValue: FormikProps<{ deadline: Date }>["setFieldValue"];
};

const FormDeadlineField = ({ className, deadline, setFieldValue }: Props) => {
  const [startDate, setStartDate] = useState(deadline ?? new Date());

  function handleChange(date: Date) {
    setStartDate(date);
    setFieldValue("deadline", date.toDateString());
  }

  return (
    <div className={className}>
      <h3>Deadline</h3>
      <DatePicker
        customInput={<DateInput />}
        selected={startDate}
        dateFormat="MMMM d, yyyy"
        minDate={!deadline ? new Date() : new Date(0)}
        calendarStartDay={1}
        showPopperArrow={false}
        popperPlacement="top-start"
        showIcon
        icon={renderIcon("icon-dropdown")}
        toggleCalendarOnIconClick
        onChange={(date) => date && handleChange(date)}
      />
    </div>
  );
};

export default FormDeadlineField;
