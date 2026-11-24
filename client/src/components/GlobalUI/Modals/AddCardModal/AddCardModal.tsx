import { Formik, Form, type FormikHelpers } from "formik";
import { useModal, useReduxState, useAppDispatch } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoard } from "../../../../redux/boards/actions";
import * as utils from "../../../../utils";
import { CARD_PRIORITIES } from "../../../../constants/";
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

const AddCardModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const board = useReduxState("selectBoard")!;
  const column = useReduxState("selectColumn")!;

  const initialValues = {
    title: "",
    description: "",
    priority: CARD_PRIORITIES[0],
    deadline: new Date(),
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

    const isDuplicate = column.cards.some((item) => item.title === data.title);
    if (isDuplicate) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.error(
        "Title is already in use by another card in this column",
      );
      return;
    }

    utils.handleRequestFlow({
      request: () => boardService.addCard(board.id, column.id, data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const addedCard = res.data;
        const updatedCards = [...column.cards, addedCard];
        const updatedColumns = board.columns.map((item) => {
          if (item.id !== column.id) return item;
          return { ...item, cards: updatedCards };
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
        <FormTitle id="modal-title">Add card</FormTitle>
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

export default AddCardModal;
