import { useAppDispatch, useModals } from "../../hooks/hooks";
import { login } from "../../redux/auth/operations";
import { getValidationSchema, notify } from "../../utils/utils";
import { Form, Formik, FormikHelpers } from "formik";
import AuthNavigation from "../common/AuthNavigation/AuthNavigation.styled";
import FormTextField from "../common/FormTextField/FormTextField.styled";
import FormPasswordField from "../common/FormPasswordField/FormPasswordField.styled";
import FormButton from "../common/FormButton/FormButton.styled";

type Props = {
  className?: string;
};

const LoginForm = ({ className: styles }: Props) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModals();

  const initialValues = { email: "", loginPassword: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["email", "loginPassword"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { email, loginPassword } = values;

    dispatch(login({ email, loginPassword }))
      .unwrap()
      .then((value) => notify.success(`Welcome, ${value.data.user.name} !`))
      .catch((error) => {
        notify.error(error);

        if (error?.status === 404) {
          return formikBag.setFieldError("email", "Invalid email address");
        }

        if (error?.status === 400) {
          return formikBag.setFieldError("loginPassword", "Invalid password");
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
              id="emailInput"
              name="email"
              placeholder="Email"
              hasErrors={!!(errors.email && touched.email)}
              isFocused
            />
            <FormPasswordField
              id="loginPasswordInput"
              name="loginPassword"
              placeholder="Password"
              hasErrors={!!(errors.loginPassword && touched.loginPassword)}
              values={values.loginPassword}
            />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Log In"}
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.email && touched.email) ||
                  (errors.loginPassword && touched.loginPassword)
                )
              }
              variant="greenBtn"
            />
            <button
              type="button"
              className="forgotBtn"
              onClick={() => openModal("forgotPasswordModal")}
            >
              Forgot password ?
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
