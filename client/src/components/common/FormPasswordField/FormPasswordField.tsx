import { useToggle } from "../../../hooks/hooks";
import { Field, ErrorMessage } from "formik";
import { FormPasswordFieldProps } from "../../../App.types";
import UseAnimations from "react-useanimations";
import visibility from "react-useanimations/lib/visibility";

const FormPasswordField = (props: FormPasswordFieldProps) => {
  const [isVisible, toggleVisible] = useToggle(false);

  function handleClick() {
    if (!isVisible) {
      const field = document.querySelector(`#${props.id}`) as HTMLInputElement;
      field.focus();
    }

    toggleVisible();
  }

  return (
    <div className={`${props.className} ${props.hasErrors ? "onError" : ""}`}>
      <Field
        type={isVisible ? "text" : "password"}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        autoFocus={props.isFocused}
      />
      <ErrorMessage className="error" name={props.name} component="span" />
      {props.values && (
        <UseAnimations
          animation={visibility}
          onClick={handleClick}
          size={30}
          className="showPassword"
          strokeColor="currentColor"
          speed={2}
        />
      )}
    </div>
  );
};

export default FormPasswordField;
