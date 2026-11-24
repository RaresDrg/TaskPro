import { NavLink } from "react-router-dom";
import { GOOGLE_AUTH_URL } from "../../../constants";
import Icon from "../Icon/Icon";

type Props = {
  className?: string;
};

const Navigation = ({ className }: Props) => {
  return (
    <nav className={className}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log in</NavLink>
      <a
        href={GOOGLE_AUTH_URL}
        className="google-link"
        title="Continue with Google"
        aria-label="Continue with Google"
      >
        <Icon name="icon-google" />
      </a>
    </nav>
  );
};

export default Navigation;
