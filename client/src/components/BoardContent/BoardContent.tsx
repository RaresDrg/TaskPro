import { FilterBtn, AddColumnBtn, ColumnsList } from "..";
import { EllipsisTooltip } from "../common";
import type { Board } from "../../types";

type Props = {
  className?: string;
  board: Board;
};

const BoardContent = ({ className, board }: Props) => {
  const showFilterBtn = board.columns.some((column) => column.cards.length > 0);

  return (
    <div className={className}>
      <EllipsisTooltip tag="h1" text={board.title} className="board-title" />
      {showFilterBtn && <FilterBtn />}
      <div>
        {board.columns.length > 0 && <ColumnsList columns={board.columns} />}
        <AddColumnBtn />
      </div>
    </div>
  );
};

export default BoardContent;
