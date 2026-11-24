import { useLoadBoard } from "../../hooks";
import { Section, Container, ImageBackground } from "../../components/common";
import { BoardContent } from "../../components";

type Props = {
  className?: string;
};

const BoardPage = ({ className }: Props) => {
  const { error, board } = useLoadBoard();

  return (
    <Section className={className}>
      {board && board.background !== "bgdefault" && (
        <ImageBackground key={board.background} name={board.background} />
      )}
      <Container className="container">
        {error && <p className="fallback">{error}</p>}
        {!error && board && <BoardContent board={board} />}
      </Container>
    </Section>
  );
};

export default BoardPage;
