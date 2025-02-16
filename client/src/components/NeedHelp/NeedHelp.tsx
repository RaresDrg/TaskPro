import cactusPot from "../../assets/images/needHelpImg.png";
import cactusPot_2x from "../../assets/images/needHelpImg_2x.png";
import { renderIcon } from "../../utils/utils";
import { useModals } from "../../hooks/hooks";

type Props = {
  className?: string;
};

const NeedHelp = ({ className: styles }: Props) => {
  const { openModal } = useModals();

  return (
    <div className={styles}>
      <img
        srcSet={`${cactusPot} 1x, ${cactusPot_2x} 2x`}
        src={cactusPot}
        alt="computer"
      />
      <p>
        If you need help with <b>TaskPro</b>, check out our support resources or
        reach out to our customer support team.
      </p>
      <button
        type="button"
        onClick={() => openModal("needHelpModal")}
        data-secondary-action="close burger menu"
      >
        {renderIcon("icon-help")}
        <span>Need help?</span>
      </button>
    </div>
  );
};

export default NeedHelp;
