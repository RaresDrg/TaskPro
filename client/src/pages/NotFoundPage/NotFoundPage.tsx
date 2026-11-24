import { Section, Container, VideoBackground } from "../../components/common";

type Props = {
  className?: string;
};

const NotFoundPage = ({ className }: Props) => {
  return (
    <Section className={className}>
      <VideoBackground name="taskpro_notfound" />
      <Container>
        <h1 className="title">Oops! — Page not found</h1>
        <span className="status">404</span>
        <p className="description">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </Container>
    </Section>
  );
};

export default NotFoundPage;
