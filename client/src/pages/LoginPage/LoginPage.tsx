import Container from "../../components/common/Container/Container.styled";
import LoginForm from "../../components/LoginForm/LoginForm.styled";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal/ForgotPasswordModal.styled";
import { useModals } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const LoginPage = ({ className: styles }: Props) => {
  const { modals } = useModals();
  const isModalOpen = modals.forgotPasswordModal;

  return (
    <section className={styles}>
      <Container>
        {!isModalOpen ? <LoginForm /> : <ForgotPasswordModal />}
      </Container>
    </section>
  );
};

export default LoginPage;
