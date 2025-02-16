import { ReactElement } from "react";
import Container from "../../components/common/Container/Container.styled";
import { BackgroundSources } from "../../App.types";

type Props = {
  className?: string;
  backgroundSources: BackgroundSources | null;
  children: ReactElement;
};

const BoardPageSection = ({ className: styles, children }: Props) => {
  return (
    <section className={`${styles} animate__animated animate__fadeIn`}>
      <Container>{children}</Container>
    </section>
  );
};

export default BoardPageSection;
