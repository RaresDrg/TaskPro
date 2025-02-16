import { forwardRef } from "react";

type DateInputProps = {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const DateInput = forwardRef<HTMLSpanElement, DateInputProps>(
  ({ value, onClick }, ref) => (
    <span onClick={onClick} ref={ref}>
      {value}
    </span>
  )
);

DateInput.displayName = "DateInput";

export default DateInput;
