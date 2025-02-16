import { useAuth, useBoards } from "../../../hooks/hooks";
import { useAppDispatch, useModals } from "../../../hooks/hooks";
import { addColumn } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { ColumnValues } from "../../../App.types";
import { Form, Formik, FormikHelpers } from "formik";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const AddColumnModal = () => {
  const { theme } = useAuth();
  const { board } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();

  const initialValues = { title: "" };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (
    values: ColumnValues,
    formikBag: FormikHelpers<ColumnValues>
  ) => {
    const column = { title: utils.capitalize(values.title) };

    const alreadyExist = utils.checkExistenceForAdd(board!.columns, column);
    if (alreadyExist) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another column"
      );
      return;
    }

    dispatch(addColumn({ boardId: board!["_id"], column }))
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
            <FormTitle text="Add column" />
            <FormTextField
              id="titleInput"
              name="title"
              placeholder="Title"
              hasErrors={!!(errors.title && touched.title)}
              isFocused
            />
            <FormButton
              type="submit"
              text={isSubmitting ? "Loading..." : "Add"}
              isDisabled={!!(isSubmitting || (errors.title && touched.title))}
              variant={`${theme === "violet" ? "violetBtn" : "greenBtn"}`}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddColumnModal;
