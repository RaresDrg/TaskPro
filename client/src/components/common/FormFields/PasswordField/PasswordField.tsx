import { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import Icon from "../../Icon/Icon";

type Props = {
  className?: string;
  name: string;
  placeholder: string;
};

const PasswordField = ({ className, name, placeholder }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [field] = useField(name);

  return (
    <div className={className}>
      <Field
        type={isVisible ? "text" : "password"}
        name={name}
        maxLength={51}
        spellCheck={false}
        autoComplete="off"
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby={`${name}-error`}
      />
      <ErrorMessage name={name}>
        {(message) => (
          <p className="error" id={`${name}-error`} role="alert">
            {message}
          </p>
        )}
      </ErrorMessage>
      {!!field.value && (
        <button
          type="button"
          className="toggle-btn"
          data-visible={isVisible}
          onClick={() => setIsVisible((prev) => !prev)}
          title={isVisible ? "Hide password" : "Show password"}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          <Icon name="icon-eye" />
        </button>
      )}
    </div>
  );
};

export default PasswordField;
