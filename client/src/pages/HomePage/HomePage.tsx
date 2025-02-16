import Container from "../../components/common/Container/Container.styled";
import homePageImg from "../../assets/images/homePageImg.png";
import homePageImg_2x from "../../assets/images/homePageImg_2x.png";
import { LogoOnHomePage as Logo } from "../../components/common/Logo/Logo.styled";
import FormButton from "../../components/common/FormButton/FormButton.styled";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../../hooks/hooks";
import { GOOGLE_AUTH_URL } from "../../constants/constants";

type Props = {
  className?: string;
};

const HomePage = ({ className: styles }: Props) => {
  useGoogleAuth();
  const navigate = useNavigate();

  return (
    <section className={styles}>
      <Container className={`animate__animated animate__fadeInDown`}>
        <img
          srcSet={`${homePageImg} 1x, ${homePageImg_2x} 2x`}
          src={homePageImg}
          alt="computer"
        />
        <Logo />
        <p>
          Supercharge your productivity and take control of your tasks with{" "}
          <b>TaskPro</b> - Don&apos;t wait, start achieving your goals now !
        </p>
        <nav>
          <FormButton
            text="Register"
            type="button"
            variant="blackBtn"
            handlerFunction={() => navigate("/register")}
          />
          <FormButton
            text="Log in"
            type="button"
            variant="blackBtn"
            handlerFunction={() => navigate("/login")}
          />
          <FormButton
            text="Auth with Google"
            type="button"
            variant="blackBtn"
            handlerFunction={() => (window.location.href = GOOGLE_AUTH_URL)}
          />
        </nav>
      </Container>
    </section>
  );
};

export default HomePage;
