import { Formik, Form, type FormikHelpers } from "formik";
import { useModal } from "../../../../hooks";
import { supportService } from "../../../../services";
import * as utils from "../../../../utils";
import { TextareaField } from "../../../common/FormFields";
import {
  ModalContainer,
  FormContainer,
  FormButton,
  FormTitle,
  CloseBtn,
} from "../../../common";

type Props = {
  className?: string;
};

const NeedHelpModal = ({ className }: Props) => {
  const { closeModal } = useModal();

  const initialValues = { comment: "" };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["comment"]);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = { comment: values.comment.trim() };
    utils.handleRequestFlow({
      request: () => supportService.needHelp(data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        utils.notify.success(res.message);
        closeModal();
      },
      onError: (error) => {
        utils.notify.errorResponse(error);
        formikBag.setSubmitting(false);
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <FormTitle id="modal-title">Need help</FormTitle>
        <CloseBtn onClick={closeModal} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <TextareaField
                name="comment"
                placeholder="Comment"
                rows={5}
                maxLength={401}
              />
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
    </ModalContainer>
  );
};

export default NeedHelpModal;
