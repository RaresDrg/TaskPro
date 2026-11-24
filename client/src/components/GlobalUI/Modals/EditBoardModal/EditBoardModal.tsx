import { Formik, Form, type FormikHelpers } from "formik";
import { useAppDispatch, useModal, useReduxState } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoard, setBoardsList } from "../../../../redux/boards/actions";
import * as utils from "../../../../utils";
import { TextField, IconsField, BgsField } from "../../../common/FormFields";
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

const EditBoardModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const boardsList = useReduxState("selectBoardsList")!;
  const board = useReduxState("selectBoard")!;

  const initialValues = {
    title: board.title,
    icon: board.icon,
    background: board.background,
  };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["title"]);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = {
      title: utils.capitalize(values.title),
      icon: values.icon,
      background: values.background,
    };

    const hasChanges = utils.areShallowObjectsDifferent(initialValues, data);
    if (!hasChanges) {
      utils.notify.warning("No changes detected");
      formikBag.resetForm();
      return;
    }

    const isDuplicate = boardsList.some(
      (item) => item.id !== board.id && item.title === data.title,
    );
    if (isDuplicate) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.error("Title is already used by another board");
      return;
    }

    utils.handleRequestFlow({
      request: () => boardService.updateBoard(board.id, data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const updatedBoard = res.data;
        dispatch(setBoard(updatedBoard));
        const updatedBoardsList = boardsList.map((item) => {
          if (item.id !== updatedBoard.id) return item;
          return {
            ...item,
            title: updatedBoard.title,
            icon: updatedBoard.icon,
          };
        });
        dispatch(setBoardsList(updatedBoardsList));
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
        <FormTitle id="modal-title">Edit board</FormTitle>
        <CloseBtn onClick={closeModal} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <TextField name="title" placeholder="Title" maxLength={51} />
              <IconsField />
              <BgsField />
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

export default EditBoardModal;
