import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link to="/" className={className}>
      <div>
        <Icon name="icon-logo" />
      </div>
      <span>Task Pro</span>
    </Link>
  );
};

export default Logo;
