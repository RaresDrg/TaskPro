import { useSearchParams } from "react-router-dom";
import { Section, Container } from "../../components/common";
import { ForgotPasswordForm, ChangePasswordForm } from "../../components/Forms";

type Props = {
  className?: string;
};

const ResetPasswordPage = ({ className }: Props) => {
  const [searchParams] = useSearchParams();
  const validationToken = searchParams.get("validationToken");

  return (
    <Section className={className}>
      <Container>
        <h1 className="visually-hidden">
          {!validationToken ? "Forgot password" : "Change password"}
        </h1>
        {!validationToken ? (
          <ForgotPasswordForm />
        ) : (
          <ChangePasswordForm validationToken={validationToken} />
        )}
      </Container>
    </Section>
  );
};

export default ResetPasswordPage;
