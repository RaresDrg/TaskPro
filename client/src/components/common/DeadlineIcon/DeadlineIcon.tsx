import Tippy from "@tippyjs/react";
import { renderIcon } from "../../../utils/renderIcon";

type Props = {
  className?: string;
};

const DeadlineIcon = ({ className: styles }: Props) => {
  return (
    <Tippy content={"Deadline is today. Hurry up!"} theme="material">
      {renderIcon("icon-notificationBell", styles)}
    </Tippy>
  );
};

export default DeadlineIcon;
