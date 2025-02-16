import { useNavigate } from "react-router-dom";
import { useAuth, useBoards } from "../../../hooks/hooks";
import { useAppDispatch, useModals } from "../../../hooks/hooks";
import { addBoard } from "../../../redux/boards/operations";
import * as utils from "../../../utils/utils";
import { BOARD_ICONS, BOARD_BACKGROUNDS } from "../../../constants/constants";
import { BoardValues } from "../../../App.types";
import { Form, Formik, FormikHelpers } from "formik";
import Modal from "../../common/Modal/Modal.styled";
import FormTitle from "../../common/FormTitle/FormTitle.styled";
import FormTextField from "../../common/FormTextField/FormTextField.styled";
import FormIconsField from "../../common/FormIconsField/FormIconsField.styled";
import FormBackgroundField from "../../common/FormBackgroundField/FormBackgroundField.styled";
import FormButton from "../../common/FormButton/FormButton.styled";

const AddBoardModal = () => {
  const { theme } = useAuth();
  const { boardsList } = useBoards();
  const { closeModal } = useModals();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    icon: BOARD_ICONS[0],
    background: BOARD_BACKGROUNDS[0],
  };
  const validationSchema = utils.getValidationSchema(["title"]);

  const handleSubmit = (
    values: BoardValues,
    formikBag: FormikHelpers<BoardValues>
  ) => {
    const { title, icon, background } = values;
    const newBoard = { title: utils.capitalize(title), icon, background };

    const alreadyExist = utils.checkExistenceForAdd(boardsList, newBoard);
    if (alreadyExist) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.warning(
        "The title you want to assign is already in use by another board"
      );
      return;
    }

    dispatch(addBoard(newBoard))
      .unwrap()
      .then((value) => {
        navigate(`${value.data.board["_id"]}`);
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
            <FormTitle text="New board" />
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

export default AddBoardModal;
