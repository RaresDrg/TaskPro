import { Link } from "react-router-dom";
import { Icon } from "../common";
import { GOOGLE_AUTH_URL } from "../../constants";

type Props = {
  className?: string;
};

const AuthGroup = ({ className }: Props) => {
  return (
    <div className={className}>
      <Link to="/register" className="cta-btn">
        Register
      </Link>
      <div className="login-prompt">
        <span className="text">Already have an account ?</span>
        <Link to="/login" className="login-btn">
          Log in
        </Link>
        <span className="separator">or</span>
      </div>
      <a href={GOOGLE_AUTH_URL} className="google-btn">
        <Icon name="icon-google" />
        <span>Continue with Google</span>
      </a>
    </div>
  );
};

export default AuthGroup;
