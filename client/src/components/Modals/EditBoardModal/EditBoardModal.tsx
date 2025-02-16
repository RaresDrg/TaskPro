import { useAppDispatch, useModals } from "../../../hooks/hooks";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { updateBoard } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { BoardValues } from "../../../App.types";
import { Form, Formik, FormikHelpers } from "formik";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormIconsField from "../../common/FormIconsField/FormIconsField.styled";
import FormBackgroundField from "../../common/FormBackgroundField/FormBackgroundField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const EditBoardModal = () => {
  const { theme } = useAuth();
  const { board, boardsList } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  const initialValues = {
    title: board!.title,
    icon: board!.icon,
    background: board!.background.value,
  };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (
    values: BoardValues,
    formikBag: FormikHelpers<BoardValues>
  ) => {
    const { title, icon, background } = values;
    const updates = { title: utils.capitalize(title), icon, background };

    const hasUpdates = utils.checkUpdates(initialValues, updates);
    if (!hasUpdates) {
      closeModal();
      return;
    }

    const alreadyExist = utils.checkExistenceForUpdate(boardsList!, {
      title: updates.title,
      _id: board!["_id"],
    });
    if (alreadyExist) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another board"
      );
      return;
    }

    dispatch(updateBoard({ boardId: board!["_id"], updates }))
      .unwrap()
      .then((value) => {
        utils.notify.success(value.message);
        closeModal();
      })
      .catch((error) => utils.notify.error(error))
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormTitle text="Edit board" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              hasErrors={!!(errors.title && touched.title)}
              isFocused
            />
            <FormIconsField />
            <FormBackgroundField />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Edit"}
              isDisabled={!!(isSubmitting || (errors.title && touched.title))}
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditBoardModal;
