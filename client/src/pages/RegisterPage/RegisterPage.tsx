import { Section, Container } from "../../components/common";
import { RegisterForm } from "../../components/Forms";

type Props = {
  className?: string;
};

const RegisterPage = ({ className }: Props) => {
  return (
    <Section className={className}>
      <Container>
        <h1 className="visually-hidden">Register</h1>
        <RegisterForm />
      </Container>
    </Section>
  );
};

export default RegisterPage;
