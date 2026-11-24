type Props = {
  className?: string;
  type: "button" | "submit";
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

const FormButton = (props: Props) => {
  const { className, type, text, isDisabled, onClick } = props;

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default FormButton;
