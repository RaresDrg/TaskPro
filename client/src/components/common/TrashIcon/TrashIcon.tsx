import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { ActionIcon } from "../../../App.types";

const TrashIcon = (props: ActionIcon) => {
  return (
    <UseAnimations
      animation={trash2}
      size={21}
      strokeColor="currentColor"
      onClick={props.handlerFunction}
      className={props.className}
      data-secondary-action={`${props.secondAction ?? "none"}`}
    />
  );
};

export default TrashIcon;
