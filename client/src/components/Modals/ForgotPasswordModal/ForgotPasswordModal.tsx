import { useState } from "react";
import { handleForgotPassword } from "../../../redux/auth/operations";
import { getValidationSchema, notify } from "../../../utils/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { useModals } from "../../../hooks/hooks";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

type Props = {
  className?: string;
};

const ForgotPasswordModal = ({ className: styles }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useModals();

  const initialValues = { email: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["email"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    setIsLoading(true);

    handleForgotPassword(values.email)
      .then((value) => {
        notify.success(value.message);
        closeModal();
      })
      .catch((error) => {
        notify.error(error);

        if (error?.response?.status === 404) {
          formikBag.setFieldError("email", "Invalid email address");
        }
      })
      .finally(() => {
        setIsLoading(false);
        formikBag.setSubmitting(false);
      });
  };

  return (
    <>
      <Modal className={styles}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <FormTitle text="Forgot password" />
              <FormTextField
                id="emailInput"
                name="email"
                placeholder="Email of your account"
                hasErrors={!!(errors.email && touched.email)}
                isFocused
              />
              <FormButton
                type="submit"
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={!!(isSubmitting || (errors.email && touched.email))}
                variant="greenBtn"
              />
            </Form>
          )}
        </Formik>
      </Modal>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ForgotPasswordModal;
