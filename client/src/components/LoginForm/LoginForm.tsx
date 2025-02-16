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

  const initialValues = { email: "", password: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["email", "loginPassword"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    const { email, password } = values;

    dispatch(login({ email, password }))
      .unwrap()
      .then((value) => notify.success(`Welcome, ${value.data.user.name} !`))
      .catch((error) => {
        notify.error(error);

        if (
          error?.response?.data?.message ===
          "There is no account associated with this email address"
        ) {
          formikBag.setFieldError("email", "Invalid email address");
        }

        if (error?.response?.data?.message === "Password is wrong") {
          formikBag.setFieldError("password", "Invalid password");
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
              id="passwordInput"
              name="password"
              placeholder="Password"
              hasErrors={!!(errors.password && touched.password)}
              values={values.password}
            />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Log In"}
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.email && touched.email) ||
                  (errors.password && touched.password)
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
