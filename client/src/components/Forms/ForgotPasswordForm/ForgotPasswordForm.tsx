import { Formik, Form, type FormikHelpers } from "formik";
import { FormContainer, FormButton, FormTitle } from "../../common";
import { TextField } from "../../common/FormFields";
import { authService } from "../../../services";
import * as utils from "../../../utils";

type Props = {
  className?: string;
};

const ForgotPasswordForm = ({ className }: Props) => {
  const initialValues = { email: "" };
  type Values = typeof initialValues;

  const fields = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = utils.getValidationSchema(fields);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = { email: values.email.trim() };
    utils.handleRequestFlow({
      request: () => authService.forgotPassword(data),
      delay: 1000,
      loadingType: "spinner",
      onSuccess: (res) => utils.notify.success(res.message),
      onError: (error) => {
        if (error.status === 404 || error.status === 403) {
          formikBag.setFieldError("email", "Invalid email address");
        }
        utils.notify.errorResponse(error);
      },
      onFinally: () => formikBag.setSubmitting(false),
    });
  }

  return (
    <FormContainer className={className}>
      <FormTitle>Forgot password</FormTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <TextField name="email" placeholder="Email" />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Send"}
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

export default ForgotPasswordForm;
