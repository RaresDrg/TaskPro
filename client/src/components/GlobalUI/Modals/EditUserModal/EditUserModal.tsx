import { Formik, Form, type FormikHelpers } from "formik";
import { useReduxState, useModal, useAppDispatch } from "../../../../hooks";
import { userService } from "../../../../services";
import { setUserProfile } from "../../../../redux/auth/actions";
import * as utils from "../../../../utils";
import { TextField, ProfilePhotoField } from "../../../common/FormFields";
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

const EditUserModal = ({ className }: Props) => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const userName = useReduxState("selectUserName");
  const userEmail = useReduxState("selectUserEmail");
  const userAuthMethod = useReduxState("selectUserAuthMethod");

  const isGoogleUser = userAuthMethod === "google";

  const initialValues = {
    name: userName,
    email: userEmail,
    profilePhoto: null as null | File,
  };
  type Values = typeof initialValues;

  const validationSchema = utils.getValidationSchema(
    isGoogleUser ? ["name"] : ["name", "email"],
  );

  function onSubmit(values: Values, formikBag: FormikHelpers<Values>) {
    const data = {
      name: utils.capitalize(values.name),
      ...(!isGoogleUser ? { email: values.email.trim() } : {}),
      ...(values.profilePhoto ? { profilePhoto: values.profilePhoto } : {}),
    };

    const hasChanges = utils.areShallowObjectsDifferent(
      { name: userName, ...(!isGoogleUser ? { email: userEmail } : {}) },
      data,
    );
    if (!hasChanges) {
      utils.notify.warning("No changes detected");
      formikBag.resetForm();
      return;
    }

    utils.handleRequestFlow({
      request: () => userService.updateUserProfile(data),
      delay: 1500,
      loadingType: "spinner",
      onSuccess: (res) => {
        const { name, email, profilePhotoID } = res.data;
        dispatch(setUserProfile({ name, email, profilePhotoID }));
        utils.notify.success(res.message);
        closeModal();
      },
      onError: (error) => {
        if (error.status === 409) {
          formikBag.setFieldError("email", "Invalid email address");
        }
        utils.notify.errorResponse(error);
        formikBag.setSubmitting(false);
      },
    });
  }

  return (
    <ModalContainer className={className}>
      <FormContainer>
        <FormTitle id="modal-title">Edit profile</FormTitle>
        <CloseBtn onClick={closeModal} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <ProfilePhotoField />
              <TextField name="name" placeholder="Name" maxLength={51} />
              {!isGoogleUser && <TextField name="email" placeholder="Email" />}
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

export default EditUserModal;
