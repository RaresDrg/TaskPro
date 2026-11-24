import { Formik, Form, type FormikHelpers } from "formik";
import { useAppDispatch, useModal, useReduxState } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoard } from "../../../../redux/boards/actions";
import * as utils from "../../../../utils";
import {
  TextField,
  TextareaField,
  PriorityField,
  DeadlineField,
} from "../../../common/FormFields";
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

const EditCardModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const board = useReduxState("selectBoard")!;
  const card = useReduxState("selectCard")!;

  const initialValues = {
    title: card.title,
    description: card.description,
    priority: card.priority,
    deadline: new Date(card.deadline),
  };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["title", "description"]);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = {
      title: utils.capitalize(values.title),
      description: values.description.trim(),
      priority: values.priority,
      deadline: utils.formatDateForApi(values.deadline),
    };

    const hasChanges = utils.areShallowObjectsDifferent(
      { ...initialValues, deadline: card.deadline },
      data,
    );
    if (!hasChanges) {
      utils.notify.warning("No changes detected");
      formikBag.resetForm();
      return;
    }

    const column = board.columns.find((item) =>
      item.cards.find((cardItem) => cardItem.id === card.id),
    )!;

    const isDuplicate = column.cards.some(
      (item) => item.id !== card.id && item.title === data.title,
    );
    if (isDuplicate) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.error(
        "Title is already in use by another card in this column",
      );
      return;
    }

    utils.handleRequestFlow({
      request: () =>
        boardService.updateCard(board.id, column.id, card.id, data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const updatedCard = res.data;
        const updatedCards = column.cards.map((item) => {
          if (item.id !== card.id) return item;
          return updatedCard;
        });
        const updatedColumn = { ...column, cards: updatedCards };
        const updatedColumns = board.columns.map((item) => {
          if (item.id !== column.id) return item;
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
        <FormTitle id="modal-title">Edit card</FormTitle>
        <CloseBtn onClick={closeModal} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <TextField name="title" placeholder="Title" maxLength={51} />
              <TextareaField
                name="description"
                placeholder="Description"
                maxLength={401}
                rows={5}
              />
              <PriorityField />
              <DeadlineField />
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

export default EditCardModal;
