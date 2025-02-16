import { useState } from "react";
import { reachCustomerSupport } from "../../../redux/auth/operations";
import { getValidationSchema, notify } from "../../../utils/utils";
import { useAuth, useModals } from "../../../hooks/hooks";
import { Form, Formik, FormikHelpers } from "formik";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormTextareaField from "../../common/FormTextareaField/FormTextareaField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner.styled";

type Props = {
  className?: string;
};

const NeedHelpModal = ({ className: styles }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, user } = useAuth();
  const { closeModal } = useModals();

  const initialValues = { email: user?.email, comment: "" };
  type Values = typeof initialValues;

  const validationSchema = getValidationSchema(["email", "comment"]);

  const handleSubmit = (values: Values, formikBag: FormikHelpers<Values>) => {
    setIsLoading(true);

    reachCustomerSupport(values.comment.trim())
      .then((value) => {
        notify.success(value.message);
        closeModal();
      })
      .catch((error) => notify.error(error))
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
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormTitle text="Need help" />
              <FormTextField
                id="emailInput"
                name="email"
                placeholder="Email address"
                isDisabled
              />
              <FormTextareaField
                id="commentInput"
                name="comment"
                placeholder="Comment"
                hasErrors={!!(errors.comment && touched.comment)}
                rows={5}
                isFocused
              />
              <FormButton
                type="submit"
                text={isSubmitting ? "Loading..." : "Send"}
                isDisabled={
                  !!(isSubmitting || (errors.comment && touched.comment))
                }
                variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
              />
            </Form>
          )}
        </Formik>
      </Modal>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default NeedHelpModal;
