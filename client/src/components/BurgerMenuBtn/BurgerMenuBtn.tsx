import { Icon } from "../common";
import { useModal } from "../../hooks";

type Props = {
  className?: string;
};

const BurgerMenuBtn = ({ className }: Props) => {
  const { openModal } = useModal();

  return (
    <button
      className={className}
      type="button"
      onClick={() => openModal("burgerMenuModal")}
      title="Open sidebar menu"
      aria-label="Open sidebar menu"
    >
      <Icon name="icon-burgerMenu" />
    </button>
  );
};

export default BurgerMenuBtn;
