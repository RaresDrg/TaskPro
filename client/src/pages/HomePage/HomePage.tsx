import { Section, Container, Image, Logo } from "../../components/common";
import { AuthGroup } from "../../components";
import { useGoogleAuth } from "../../hooks";

type Props = {
  className?: string;
};

const HomePage = ({ className }: Props) => {
  useGoogleAuth();

  return (
    <Section className={className}>
      <Container>
        <Image className="hero-img" name="heroAvatar" alt="" />
        <Logo />
        <h1 className="hero-title">
          Supercharge your productivity and take control of your tasks with{" "}
          <b>TaskPro</b> — Don't wait, start achieving your goals now!
        </h1>
        <AuthGroup />
      </Container>
    </Section>
  );
};

export default HomePage;
