import { useBoards, useAppDispatch } from "../../hooks/hooks";
import { setColumns } from "../../redux/boards/slice";
import { updateBoardColumns } from "../../redux/boards/operations";
import { notify } from "../../utils/utils";
import { DropResult } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";
import BoardColumn from "../../components/BoardColumn/BoardColumn.styled";
import AddColumnBtn from "../AddColumnBtn/AddColumnBtn.styled";

type Props = {
  className?: string;
};

const BoardColumns = ({ className: styles }: Props) => {
  const { board, columns } = useBoards();
  const dispatch = useAppDispatch();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles}>
        {columns!.map((column) => (
          <BoardColumn key={column["_id"]} column={column} />
        ))}

        <AddColumnBtn />
      </div>
    </DragDropContext>
  );

  function handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const movedCard = columns!
      .flatMap((column) => column.cards)
      .find((card) => card["_id"] === draggableId);

    const destinationColumn = columns!.find(
      (column) => column["_id"] === destination.droppableId
    );

    const alreadyExistingCard = destinationColumn!.cards.find((card) => {
      return (
        card.title === movedCard!.title && card["_id"] !== movedCard!["_id"]
      );
    });

    if (alreadyExistingCard) {
      const msg = "A card with the same title already exists in the column.";
      notify.warning(msg);
      return;
    }

    const updatedColumns = columns!.map((column) => {
      if (
        column["_id"] === source.droppableId &&
        column["_id"] === destination.droppableId
      ) {
        const updatedCards = [...column.cards];
        updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard!);

        return {
          ...column,
          cards: updatedCards,
        };
      }

      if (column["_id"] === source.droppableId) {
        return {
          ...column,
          cards: column.cards.filter((card) => card["_id"] !== draggableId),
        };
      }

      if (column["_id"] === destination.droppableId) {
        const updatedCards = [...column.cards];
        updatedCards.splice(destination.index, 0, movedCard!);

        return {
          ...column,
          cards: updatedCards,
        };
      }

      return column;
    });

    dispatch(setColumns(updatedColumns));
    dispatch(updateBoardColumns({ boardId: board!["_id"], updatedColumns }));
  }
};

export default BoardColumns;
