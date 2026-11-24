import { useModal, useReduxState } from "../../hooks";
import { Icon } from "../common";

type Props = {
  className?: string;
};

const FilterBtn = ({ className }: Props) => {
  const { openModal } = useModal();
  const filter = useReduxState("selectFilter");

  return (
    <button
      type="button"
      className={className}
      onClick={() => openModal("filtersModal")}
      aria-label={filter ? `Filters: ${filter}` : "Filters"}
    >
      <Icon name="icon-filter" />
      <span>{filter ?? "filters"}</span>
    </button>
  );
};

export default FilterBtn;
