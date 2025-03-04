import { useAuth, useBoards } from "../../../hooks/hooks";
import { useAppDispatch, useModals } from "../../../hooks/hooks";
import { addCard } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { CARD_PRIORITIES } from "../../../constants/constants";
import { CardValues } from "../../../App.types";
import { Form, Formik, FormikHelpers } from "formik";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormTextareaField from "../../common/FormTextareaField/FormTextareaField.styled";
import FormPriorityField from "../../common/FormPriorityField/FormPriorityField.styled";
import FormDeadlineField from "../../common/FormDeadlineField/FormDeadlineField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

type Props = {
  className?: string;
};

const AddCardModal = ({ className: styles }: Props) => {
  const { theme } = useAuth();
  const { board, column } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  const initialValues = {
    title: "",
    description: "",
    priority: CARD_PRIORITIES[0],
    deadline: new Date().toDateString(),
  };
  const validationSchema = utils.getValidationSchema(["title", "description"]);

  const handleSubmit = (
    values: CardValues,
    formikBag: FormikHelpers<CardValues>
  ) => {
    const newCard = {
      title: utils.capitalize(values.title),
      description: values.description.trim().toLowerCase(),
      priority: values.priority,
      deadline: values.deadline,
    };

    const alreadyExist = utils.checkExistenceForAdd(column!.cards, newCard);
    if (alreadyExist) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another card"
      );
      return;
    }

    const boardId = board!["_id"];
    const columnId = column!["_id"];

    dispatch(addCard({ boardId, columnId, newCard }))
      .unwrap()
      .then((value) => {
        utils.notify.success(value.message);
        closeModal();
      })
      .catch((error) => utils.notify.error(error))
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <Modal className={styles}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form>
            <FormTitle text="Add card" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              hasErrors={!!(errors.title && touched.title)}
              isFocused
            />
            <FormTextareaField
              id="descriptionInput"
              name="description"
              placeholder="Description"
              hasErrors={!!(errors.description && touched.description)}
              rows={6}
            />
            <FormPriorityField />
            <FormDeadlineField setFieldValue={setFieldValue} />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Add"}
              isDisabled={
                !!(
                  isSubmitting ||
                  (errors.title && touched.title) ||
                  (errors.description && touched.description)
                )
              }
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCardModal;
