import icons from "../../../assets/icons/icons.svg";
import { ActionIcon } from "../../../App.types";

const PencilIcon = (props: ActionIcon) => {
  return (
    <svg
      className={props.className}
      onClick={props.handlerFunction}
      data-secondary-action={`${props.secondAction ?? "none"}`}
    >
      <use href={`${icons}#icon-pencil`}></use>
    </svg>
  );
};

export default PencilIcon;
