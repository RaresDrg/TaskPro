import { Section, Container } from "../../components/common";
import { LoginForm } from "../../components/Forms";

type Props = {
  className?: string;
};

const LoginPage = ({ className }: Props) => {
  return (
    <Section className={className}>
      <Container>
        <h1 className="visually-hidden">Log in</h1>
        <LoginForm />
      </Container>
    </Section>
  );
};

export default LoginPage;
