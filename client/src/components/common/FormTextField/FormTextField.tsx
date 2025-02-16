import { Field, ErrorMessage } from "formik";
import { FormTextFieldProps } from "../../../App.types";

const FormTextField = (props: FormTextFieldProps) => {
  return (
    <div className={`${props.className} ${props.hasErrors ? "onError" : ""}`}>
      <Field
        type="text"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        autoFocus={props.isFocused}
        disabled={props.isDisabled}
      />
      <ErrorMessage className="error" name={props.name} component="span" />
    </div>
  );
};

export default FormTextField;
