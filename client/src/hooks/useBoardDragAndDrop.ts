import { useRef } from "react";
import type { DragDropEventHandlers } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useAppDispatch } from ".";
import { setColumns } from "../redux/boards/actions";
import { boardService } from "../services";
import { notify, handleRequestFlow } from "../utils";
import type { Board } from "../types";

const useBoardDragAndDrop = (board: Board) => {
  const dispatch = useAppDispatch();

  const originalColumns = useRef(board.columns);
  const currentColumns = useRef(board.columns);

  const onDragStart: DragDropEventHandlers["onDragStart"] = () => {
    originalColumns.current = board.columns;
    currentColumns.current = board.columns;
  };

  const onDragOver: DragDropEventHandlers["onDragOver"] = (event) => {
    const items = Object.fromEntries(
      currentColumns.current.map((column) => [
        column.id,
        column.cards.map((card) => card.id),
      ]),
    );
    const newItems = move(items, event);

    const cardsById = Object.fromEntries(
      currentColumns.current
        .flatMap((column) => column.cards)
        .map((card) => [card.id, card]),
    );

    currentColumns.current = currentColumns.current.map((column) => {
      return {
        ...column,
        cards: newItems[column.id].map((cardId) => cardsById[cardId]),
      };
    });

    dispatch(setColumns(currentColumns.current));
  };

  const onDragEnd: DragDropEventHandlers["onDragEnd"] = (event) => {
    const cardId = event.operation.source?.id;

    if (event.canceled || !event.operation.target || !cardId) {
      dispatch(setColumns(originalColumns.current));
      return;
    }

    const fromColumn = originalColumns.current.find((item) =>
      item.cards.some((card) => card.id === cardId),
    );
    const toColumn = currentColumns.current.find((item) =>
      item.cards.some((card) => card.id === cardId),
    );
    if (!fromColumn || !toColumn) {
      dispatch(setColumns(originalColumns.current));
      return;
    }

    const fromIndex = fromColumn.cards.findIndex((card) => card.id === cardId);
    const toIndex = toColumn.cards.findIndex((card) => card.id === cardId);
    if (fromColumn.id === toColumn.id && fromIndex === toIndex) return;

    if (
      fromColumn.id !== toColumn.id &&
      toColumn.cards.some(
        (card) =>
          card.id !== cardId &&
          card.title === fromColumn.cards[fromIndex].title,
      )
    ) {
      dispatch(setColumns(originalColumns.current));
      notify.error(
        "A card with the same title already exists in the target column",
      );
      return;
    }

    handleRequestFlow({
      request: () =>
        boardService.moveCard(board.id, String(cardId), {
          fromColumnId: fromColumn.id,
          toColumnId: toColumn.id,
          toIndex,
        }),
      onError: (error) => {
        dispatch(setColumns(originalColumns.current));
        notify.errorResponse(error);
      },
    });
  };

  return { onDragStart, onDragOver, onDragEnd };
};

export default useBoardDragAndDrop;
