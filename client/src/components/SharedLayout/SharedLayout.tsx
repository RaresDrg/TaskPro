import { Outlet } from "react-router-dom";
import { Header } from "..";
import { LeftSidebar } from "../common";
import { useMediaQueries, useLoadBoards } from "../../hooks";

const SharedLayout = () => {
  const { isOnDesktop } = useMediaQueries();
  useLoadBoards();

  return (
    <>
      {isOnDesktop && <LeftSidebar />}
      <Header />
      <Outlet />
    </>
  );
};

export default SharedLayout;
