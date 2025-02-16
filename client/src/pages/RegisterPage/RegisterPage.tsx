import Container from "../../components/common/Container/Container.styled";
import RegisterForm from "../../components/RegisterForm/RegisterForm.styled";

type Props = {
  className?: string;
};

const RegisterPage = ({ className: styles }: Props) => {
  return (
    <section className={styles}>
      <Container>
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;
