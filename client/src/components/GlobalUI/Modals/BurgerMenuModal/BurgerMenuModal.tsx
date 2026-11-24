import { ModalContainer, LeftSidebar } from "../../../common";

type Props = {
  className?: string;
};

const BurgerMenuModal = ({ className }: Props) => {
  return (
    <ModalContainer className={className}>
      <h2 id="modal-title" className="visually-hidden">
        Sidebar Menu
      </h2>
      <LeftSidebar />
    </ModalContainer>
  );
};

export default BurgerMenuModal;
