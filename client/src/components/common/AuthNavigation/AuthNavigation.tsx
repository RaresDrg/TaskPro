import { NavLink } from "react-router-dom";
import { GOOGLE_AUTH_URL } from "../../../constants/constants";
import { renderIcon } from "../../../utils/utils";

type Props = {
  className?: string;
};

const AuthNavigation = ({ className: styles }: Props) => {
  return (
    <nav className={styles}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log in</NavLink>

      <NavLink to={GOOGLE_AUTH_URL} className="google-btn">
        {renderIcon("icon-google")}
      </NavLink>
    </nav>
  );
};

export default AuthNavigation;
