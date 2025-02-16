import { renderIcon } from "../../utils/utils";
import { useModals } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const BurgerMenuBtn = ({ className: styles }: Props) => {
  const { openModal } = useModals();

  function handleClick() {
    openModal("burgerMenu");
  }

  return (
    <button type="button" className={styles} onClick={handleClick}>
      {renderIcon("icon-burger-menu")}
    </button>
  );
};

export default BurgerMenuBtn;
