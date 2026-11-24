import { useNavigate } from "react-router-dom";
import { Formik, Form, type FormikHelpers } from "formik";
import { FormContainer, FormButton, FormTitle } from "../../common";
import { PasswordField } from "../../common/FormFields";
import { useAppDispatch } from "../../../hooks";
import { setAuthenticatedUser } from "../../../redux/auth/actions";
import { authService } from "../../../services";
import * as utils from "../../../utils";

type Props = {
  className?: string;
  validationToken: string;
};

const ChangePasswordForm = ({ className, validationToken }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = { password: "", confirm: "" };
  type Values = typeof initialValues;

  const fields = Object.keys(initialValues) as Array<keyof Values>;
  const validationSchema = utils.getValidationSchema(fields);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = { password: values.password, validationToken };
    utils.handleRequestFlow({
      request: () => authService.changePassword(data),
      delay: 2500,
      loadingType: "screen",
      onSuccess: (res) => {
        dispatch(setAuthenticatedUser(res.data));
        utils.notify.success(res.message);
      },
      onError: (error) => {
        if (error.status === 404) {
          navigate("", { replace: true });
          utils.notify.warning("Reset link expired. Please request a new one.");
          return;
        }
        utils.notify.errorResponse(error);
      },
      onFinally: () => formikBag.setSubmitting(false),
    });
  }

  return (
    <FormContainer className={className}>
      <FormTitle>Change password</FormTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <PasswordField name="password" placeholder="New password" />
            <PasswordField name="confirm" placeholder="Confirm new password" />
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

export default ChangePasswordForm;
