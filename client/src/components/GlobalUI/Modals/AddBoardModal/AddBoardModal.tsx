import { useNavigate } from "react-router-dom";
import { Formik, Form, type FormikHelpers } from "formik";
import { useModal, useReduxState, useAppDispatch } from "../../../../hooks";
import { boardService } from "../../../../services";
import { setBoard, setBoardsList } from "../../../../redux/boards/actions";
import * as utils from "../../../../utils";
import { BOARD_ICONS, BOARD_BACKGROUNDS } from "../../../../constants/";
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

const AddBoardModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardsList = useReduxState("selectBoardsList");

  const initialValues = {
    title: "",
    icon: BOARD_ICONS[0],
    background: BOARD_BACKGROUNDS[0],
  };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(["title"]);

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = {
      title: utils.capitalize(values.title),
      icon: values.icon,
      background: values.background,
    };

    const isDuplicate = boardsList?.some((item) => item.title === data.title);
    if (isDuplicate) {
      formikBag.setSubmitting(false);
      formikBag.setFieldError("title", "Invalid title");
      utils.notify.error("Title is already used by another board");
      return;
    }

    utils.handleRequestFlow({
      request: () => boardService.addBoard(data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const addedBoard = res.data;
        dispatch(setBoard(addedBoard));
        const updatedBoardsList = [
          { id: addedBoard.id, title: addedBoard.title, icon: addedBoard.icon },
          ...(boardsList ?? []),
        ];
        dispatch(setBoardsList(updatedBoardsList));
        utils.notify.success(res.message);
        navigate(`/dashboard/boards/${addedBoard.id}`);
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
        <FormTitle id="modal-title">New board</FormTitle>
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
                text={isSubmitting ? "Loading..." : "Create"}
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

export default AddBoardModal;
