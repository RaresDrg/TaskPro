import Container from "../../components/common/Container/Container.styled";
import { useBoards, useModals } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const DashboardPage = ({ className: styles }: Props) => {
  const { boardsList } = useBoards();
  const { openModal } = useModals();

  return (
    <section className={`${styles} animate__animated animate__fadeIn`}>
      <Container>
        {boardsList ? (
          <p>
            You can select a board from the list by clicking on it and relevant
            project information will be displayed here.
          </p>
        ) : (
          <p>
            Before starting your project, it is essential{" "}
            <b onClick={() => openModal("addBoardModal")}>to create a board</b>{" "}
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
        )}
      </Container>
    </section>
  );
};

export default DashboardPage;
