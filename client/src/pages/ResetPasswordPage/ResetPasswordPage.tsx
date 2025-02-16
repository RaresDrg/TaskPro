import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../../components/common/Container/Container.styled";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm.styled";

type Props = {
  className?: string;
};

const ResetPasswordPage = ({ className: styles }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const validationToken = searchParams.get("validationToken");

  useEffect(() => {
    if (!validationToken) {
      navigate("/*", { replace: true });
    }
  }, []);

  return (
    <section className={styles}>
      <Container>
        {validationToken && (
          <ResetPasswordForm validationToken={validationToken} />
        )}
      </Container>
    </section>
  );
};

export default ResetPasswordPage;
