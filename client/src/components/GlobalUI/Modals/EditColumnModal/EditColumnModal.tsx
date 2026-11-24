import { Formik, Form, type FormikHelpers } from "formik";
import { useAppDispatch, useModal, useReduxState } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoard } from "../../../../redux/boards/actions";
import * as utils from "../../../../utils";
import { TextField } from "../../../common/FormFields";
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

const EditColumnModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const board = useReduxState("selectBoard")!;
  const column = useReduxState("selectColumn")!;

  const initialValues = { title: column.title };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["title"]);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = { title: utils.capitalize(values.title) };

    const hasChanges = utils.areShallowObjectsDifferent(initialValues, data);
    if (!hasChanges) {
      utils.notify.warning("No changes detected");
      formikBag.resetForm();
      return;
    }

    const isDuplicate = board.columns.some(
      (item) => item.id !== column.id && item.title === data.title,
    );
    if (isDuplicate) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.error("Title is already used by another column");
      return;
    }

    utils.handleRequestFlow({
      request: () => boardService.updateColumn(board.id, column.id, data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const updatedColumn = res.data;
        const updatedColumns = board.columns.map((item) => {
          if (item.id !== updatedColumn.id) return item;
          return updatedColumn;
        });
        const updatedBoard = { ...board, columns: updatedColumns };
        dispatch(setBoard(updatedBoard));
        utils.notify.success(res.message);
        closeModal();
      },
      onError: (error) => {
        if (error.status === 409) {
          formikBag.setFieldError("title", "Invalid title");
        }
        utils.notify.errorResponse(error);
        formikBag.setSubmitting(false);
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <FormTitle id="modal-title">Edit column</FormTitle>
        <CloseBtn onClick={closeModal} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <TextField name="title" placeholder="Title" maxLength={51} />
              <FormButton
                type="submit"
                text={isSubmitting ? "Loading..." : "Edit"}
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

export default EditColumnModal;
