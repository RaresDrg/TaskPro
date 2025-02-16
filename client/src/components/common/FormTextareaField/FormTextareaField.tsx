import { Field, ErrorMessage } from "formik";
import { FormTextareaFieldProps } from "../../../App.types";

const FormTextareaField = (props: FormTextareaFieldProps) => {
  return (
    <div className={`${props.className} ${props.hasErrors ? "onError" : ""}`}>
      <Field
        as="textarea"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        autoFocus={props.isFocused}
        rows={props.rows}
      />
      <ErrorMessage className="error" name={props.name} component="span" />
    </div>
  );
};

export default FormTextareaField;
