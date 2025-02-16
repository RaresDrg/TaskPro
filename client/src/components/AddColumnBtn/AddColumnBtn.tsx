import { useModals } from "../../hooks/hooks";
import { renderIcon } from "../../utils/utils";

type Props = {
  className?: string;
};

const AddColumnBtn = ({ className: styles }: Props) => {
  const { openModal } = useModals();

  function handleClick() {
    openModal("addColumnModal");
  }

  return (
    <button type="button" className={styles} onClick={handleClick}>
      {renderIcon("icon-plus")}
      Add a column
    </button>
  );
};

export default AddColumnBtn;
