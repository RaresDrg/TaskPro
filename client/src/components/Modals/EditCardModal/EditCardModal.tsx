import { useAuth, useBoards } from "../../../hooks/hooks";
import { useAppDispatch, useModals } from "../../../hooks/hooks";
import { updateCard } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
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

const EditCardModal = ({ className: styles }: Props) => {
  const { theme } = useAuth();
  const { board, card } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  const initialValues = {
    title: card!.title,
    description: card!.description,
    priority: card!.priority,
    deadline: new Date(card!.deadline).toDateString(),
  };
  const validationSchema = utils.getValidationSchema(["title", "description"]);

  const handleSubmit = (
    values: CardValues,
    formikBag: FormikHelpers<CardValues>
  ) => {
    const updates = {
      title: utils.capitalize(values.title),
      description: values.description.trim().toLowerCase(),
      priority: values.priority,
      deadline: values.deadline,
    };

    const hasUpdates = utils.checkUpdates(initialValues, updates);
    if (!hasUpdates) {
      closeModal();
      return;
    }

    const targetedColumn = board!.columns.find((column) =>
      column.cards.find((item) => item["_id"] === card!["_id"])
    );

    const alreadyExist = utils.checkExistenceForUpdate(targetedColumn!.cards, {
      title: updates.title,
      _id: card!["_id"],
    });
    if (alreadyExist) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another card"
      );
      return;
    }

    const boardId = board!["_id"];
    const columnId = targetedColumn!["_id"];
    const cardId = card!["_id"];

    dispatch(updateCard({ boardId, columnId, cardId, updates }))
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
            <FormTitle text="Edit card" />
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
            <FormDeadlineField
              setFieldValue={setFieldValue}
              deadline={new Date(initialValues.deadline)}
            />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Edit"}
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

export default EditCardModal;
