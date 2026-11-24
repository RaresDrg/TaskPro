import icons from "../../../assets/icons/sprite.svg";
import type { IconName } from "../../../types";

type Props = {
  className?: string;
  label?: string;
  name: IconName;
};

const Icon = ({ className, label, name }: Props) => {
  return (
    <svg
      className={className}
      focusable={false}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
    >
      <use href={`${icons}#${name}`} />
    </svg>
  );
};

export default Icon;
