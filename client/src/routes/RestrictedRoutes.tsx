import { Route, Navigate, Outlet } from "react-router-dom";
import { useReduxState } from "../hooks";
import { HomePage, RegisterPage, LoginPage, ResetPasswordPage } from "../pages";

const RestrictedRoutesGuard = () => {
  const isLoggedIn = useReduxState("selectIsLoggedIn");
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const RestrictedRoutes = (
  <Route element={<RestrictedRoutesGuard />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
  </Route>
);

export default RestrictedRoutes;
