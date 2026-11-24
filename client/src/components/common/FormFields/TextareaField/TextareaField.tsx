import { Field, ErrorMessage } from "formik";

type Props = {
  className?: string;
  name: string;
  placeholder: string;
  maxLength?: number;
  rows: number;
};

const TextareaField = (props: Props) => {
  const { className, name, placeholder, maxLength, rows } = props;

  return (
    <div className={className}>
      <Field
        as="textarea"
        name={name}
        maxLength={maxLength}
        rows={rows}
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
    </div>
  );
};

export default TextareaField;
