import { useAuth } from "../../../hooks/hooks";
import { renderIcon } from "../../../utils/renderIcon";

type Props = {
  className?: string;
};

const Logo = ({ className: styles }: Props) => {
  const { theme } = useAuth();

  return (
    <a href="/" className={styles}>
      {renderIcon(theme === "violet" ? "icon-whiteLogo" : "icon-blackLogo")}
      <span>Task Pro</span>
    </a>
  );
};

export default Logo;
