import { useAppDispatch } from "../../hooks/hooks";
import { register } from "../../redux/auth/operations";
import { capitalize, getValidationSchema, notify } from "../../utils/utils";
import { Form, Formik, FormikHelpers } from "formik";
import AuthNavigation from "../common/AuthNavigation/AuthNavigation.styled";
import FormTextField from "../common/FormTextField/FormTextField.styled";
import FormPasswordField from "../common/FormPasswordField/FormPasswordField.styled";
import FormButton from "../common/FormButton/FormButton.styled";

type Props = {
  className?: string;
};

const RegisterForm = ({ className: styles }: Props) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  type Values = typeof initialValues;

  const config = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = getValidationSchema(config);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { email, password } = values;
    const name = capitalize(values.name);

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => notify.success(`Welcome, ${name} !`))
      .catch((error) => {
        notify.error(error);

        if (error?.response?.status === 409) {
          formikBag.setFieldError("email", "Invalid email address");
        }
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <div className={`${styles} animate__animated animate__zoomIn`}>
      <AuthNavigation />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, values, touched }) => (
          <Form>
            <FormTextField
              id="nameInput"
              name="name"
              placeholder="Name"
              hasErrors={!!(errors.name && touched.name)}
              isFocused
            />
            <FormTextField
              id="emailInput"
              name="email"
              placeholder="Email"
              hasErrors={!!(errors.email && touched.email)}
            />
            <FormPasswordField
              id="passwordInput"
              name="password"
              placeholder="Password"
              hasErrors={!!(errors.password && touched.password)}
              values={values.password}
            />
            <FormPasswordField
              id="confirmPasswordInput"
              name="confirmPassword"
              placeholder="Please, confirm your password"
              hasErrors={
                !!(
                  (errors.confirmPassword || errors.password) &&
                  touched.confirmPassword
                )
              }
              values={values.confirmPassword}
            />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Register"}
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.name && touched.name) ||
                  (errors.email && touched.email) ||
                  (errors.password && touched.password) ||
                  (errors.confirmPassword && touched.confirmPassword)
                )
              }
              variant="greenBtn"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
