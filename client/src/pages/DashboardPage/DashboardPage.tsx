import { Section, Container } from "../../components/common";
import { useModal, useReduxState } from "../../hooks";

type Props = {
  className?: string;
};

const DashboardPage = ({ className }: Props) => {
  const boardsList = useReduxState("selectBoardsList");
  const { openModal } = useModal();

  return (
    <Section className={className}>
      <Container>
        <h1 className="visually-hidden">Dashboard</h1>
        {!boardsList ? null : boardsList.length > 0 ? (
          <p>
            You can select a board from the list and relevant project
            information will be displayed here.
          </p>
        ) : (
          <p>
            Before starting your project, it is essential{" "}
            <button type="button" onClick={() => openModal("addBoardModal")}>
              to create a board
            </button>{" "}
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow.
          </p>
        )}
      </Container>
    </Section>
  );
};

export default DashboardPage;
