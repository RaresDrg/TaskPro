import { Formik, Form, type FormikHelpers } from "formik";
import { useModal, useReduxState, useAppDispatch } from "../../../../hooks";
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

const AddColumnModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const board = useReduxState("selectBoard")!;

  const initialValues = { title: "" };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["title"]);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = { title: utils.capitalize(values.title) };

    const isDuplicate = board.columns.some((item) => item.title === data.title);
    if (isDuplicate) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.error("Title is already used by another column");
      return;
    }

    utils.handleRequestFlow({
      request: () => boardService.addColumn(board.id, data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const addedColumn = res.data;
        const updatedColumns = [...board.columns, addedColumn];
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
        <FormTitle id="modal-title">Add column</FormTitle>
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
                text={isSubmitting ? "Loading..." : "Add"}
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

export default AddColumnModal;
