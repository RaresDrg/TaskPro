import { Route, Navigate, Outlet } from "react-router-dom";
import { useReduxState } from "../hooks";
import { SharedLayout } from "../components";
import { DashboardPage, BoardPage } from "../pages";

const ProtectedRoutesGuard = () => {
  const isLoggedIn = useReduxState("selectIsLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const ProtectedRoutes = (
  <Route element={<ProtectedRoutesGuard />}>
    <Route path="/dashboard" element={<SharedLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="boards/:boardId" element={<BoardPage />} />
    </Route>
  </Route>
);

export default ProtectedRoutes;
