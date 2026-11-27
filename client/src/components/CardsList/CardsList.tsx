import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { CardItem } from "..";
import type { Card, Column } from "../../types";

type Props = {
  className?: string;
  cards: Card[];
  columnId: Column["id"];
};

const CardsList = ({ className, cards, columnId }: Props) => {
  const { ref } = useDroppable({
    id: columnId,
    type: "column",
    accept: "card",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <ul className={className} ref={ref}>
      {cards.map((card, index) => (
        <CardItem key={card.id} card={card} index={index} columnId={columnId} />
      ))}
    </ul>
  );
};

export default CardsList;
