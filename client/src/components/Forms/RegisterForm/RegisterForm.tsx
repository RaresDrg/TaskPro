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

const RegisterForm = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };
  type Values = typeof initialValues;

  const fields = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = utils.getValidationSchema(fields);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = {
      name: utils.capitalize(values.name),
      email: values.email.trim(),
      password: values.password,
    };
    utils.handleRequestFlow({
      request: () => authService.register(data),
      delay: 2500,
      loadingType: "screen",
      onSuccess: (res) => {
        dispatch(setAuthenticatedUser(res.data));
        utils.notify.success(`Welcome, ${res.data.name} !`);
      },
      onError: (error) => {
        if (error.status === 409) {
          formikBag.setFieldError("email", "Invalid email address");
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
            <TextField name="name" placeholder="Name" maxLength={51} />
            <TextField name="email" placeholder="Email" />
            <PasswordField name="password" placeholder="Password" />
            <PasswordField name="confirm" placeholder="Confirm password" />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Register"}
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

export default RegisterForm;
