import { useModal } from "../../hooks";
import { Icon } from "../common";

type Props = {
  className?: string;
};

const SupportCard = ({ className }: Props) => {
  const { openModal } = useModal();

  return (
    <div className={className}>
      <p>
        If you need help with <b>TaskPro</b>, reach out to our customer support
        team.
      </p>
      <div>
        <span aria-hidden="true">╰┈➤</span>
        <button type="button" onClick={() => openModal("needHelpModal")}>
          <span>Need help</span>
          <Icon name="icon-helpCircle" />
        </button>
      </div>
    </div>
  );
};

export default SupportCard;
