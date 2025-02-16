import { renderIcon } from "../../utils/renderIcon";
import { useBoards, useModals } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const FilterBtn = ({ className: styles }: Props) => {
  const { filter } = useBoards();
  const { openModal } = useModals();

  return (
    <button
      type="button"
      className={`${styles} ${filter ? "active" : ""}`}
      onClick={() => openModal("filtersModal")}
    >
      {renderIcon("icon-filter")}
      <span>{filter ?? "Filters"}</span>
    </button>
  );
};

export default FilterBtn;
