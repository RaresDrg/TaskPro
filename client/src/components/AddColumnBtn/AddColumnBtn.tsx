import { useModal } from "../../hooks";

type Props = {
  className?: string;
};

const AddColumnBtn = ({ className }: Props) => {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openModal("addColumnModal")}
    >
      Add a column
    </button>
  );
};

export default AddColumnBtn;
