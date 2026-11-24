import Icon from "../Icon/Icon";

type Props = {
  className?: string;
  onClick: () => void;
};

const CloseBtn = ({ className, onClick }: Props) => {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label="Close"
      title="Close"
    >
      <Icon name="icon-close" />
    </button>
  );
};

export default CloseBtn;
