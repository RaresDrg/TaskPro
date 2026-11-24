import { Link } from "react-router-dom";
import { Formik, Form, type FormikHelpers } from "formik";
import { FormContainer, FormButton, Navigation } from "../../common";
import { TextField, PasswordField } from "../../common/FormFields";
import { useAppDispatch } from "../../../hooks";
import { setAuthenticatedUser } from "../../../redux/auth/actions";
import { authService } from "../../../services";
import * as utils from "../../../utils";

type Props = {
  className?: string;
};

const LoginForm = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const initialValues = { email: "", loginPassword: "" };
  type Values = typeof initialValues;

  const fields = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = utils.getValidationSchema(fields);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = {
      email: values.email.trim(),
      password: values.loginPassword,
    };
    utils.handleRequestFlow({
      request: () => authService.login(data),
      delay: 2500,
      loadingType: "screen",
      onSuccess: (res) => {
        dispatch(setAuthenticatedUser(res.data));
        utils.notify.success(`Welcome, ${res.data.name} !`);
      },
      onError: (error) => {
        if (error.status === 404 || error.status === 403) {
          formikBag.setFieldError("email", "Invalid email address");
        } else if (error.response?.data?.message === "Password is wrong") {
          formikBag.setFieldError("loginPassword", "Invalid password");
        }
        utils.notify.errorResponse(error);
      },
      onFinally: () => formikBag.setSubmitting(false),
    });
  }

  return (
    <FormContainer className={className}>
      <Navigation />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <TextField name="email" placeholder="Email" />
            <PasswordField name="loginPassword" placeholder="Password" />
            <Link to="/reset-password" className="forgot-btn">
              Forgot password ?
            </Link>
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Log in"}
              isDisabled={
                isSubmitting || utils.hasTouchedErrors(errors, touched)
              }
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default LoginForm;
