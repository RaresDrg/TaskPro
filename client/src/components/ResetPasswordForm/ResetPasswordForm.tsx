import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useModals } from "../../hooks/hooks";
import { changePassword } from "../../redux/auth/operations";
import { getValidationSchema, notify } from "../../utils/utils";
import { Form, Formik, FormikHelpers } from "formik";
import FormTitle from "../common/FormTitle/FormTitle.styled";
import FormPasswordField from "../common/FormPasswordField/FormPasswordField.styled";
import FormButton from "../common/FormButton/FormButton.styled";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.styled";

type Props = {
  className?: string;
  validationToken: string;
};

const ResetPasswordForm = ({ className: styles, validationToken }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModals();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = { password: "", confirmPassword: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["password", "confirmPassword"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    setIsLoading(true);

    dispatch(changePassword({ validationToken, newPassword: values.password }))
      .unwrap()
      .then((value) => notify.success(value.message))
      .catch((error) => {
        if (error?.status === 403 || error?.status === 404) {
          notify.warning(
            "The link to reset your password has expired. Please initiate a new password reset request."
          );
          navigate("/login", { replace: true });
          openModal("forgotPasswordModal");
          return;
        }

        notify.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        formikBag.setSubmitting(false);
      });
  };

  return (
    <>
      <div className={`${styles} animate__animated animate__zoomIn`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, values, touched }) => (
            <Form>
              <FormTitle text="Change password" />
              <FormPasswordField
                id="passwordInput"
                name="password"
                placeholder="New Password"
                hasErrors={!!(errors.password && touched.password)}
                values={values.password}
                isFocused
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
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={
                  !!(
                    isSubmitting ||
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

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ResetPasswordForm;
