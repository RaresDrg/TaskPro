import { Field, ErrorMessage } from "formik";

type Props = {
  className?: string;
  name: string;
  placeholder: string;
  maxLength?: number;
};

const TextField = (props: Props) => {
  const { className, name, placeholder, maxLength } = props;

  return (
    <div className={className}>
      <Field
        type="text"
        name={name}
        maxLength={maxLength}
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

export default TextField;
