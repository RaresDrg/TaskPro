import { lazy, Suspense, ComponentType } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner.styled";

export function wrap<T extends object>(LazyComponent: ComponentType<T>) {
  const WrappedComponent = (props: T) => (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  WrappedComponent.displayName =
    LazyComponent.displayName || LazyComponent.name || "Component";

  return WrappedComponent;
}

// Pages
export const HomePage = wrap(
  lazy(() => import("../pages/HomePage/HomePage.styled"))
);
export const LoginPage = wrap(
  lazy(() => import("../pages/LoginPage/LoginPage.styled"))
);
export const RegisterPage = wrap(
  lazy(() => import("../pages/RegisterPage/RegisterPage.styled"))
);
export const ResetPasswordPage = wrap(
  lazy(() => import("../pages/ResetPasswordPage/ResetPasswordPage.styled"))
);
export const DashboardPage = wrap(
  lazy(() => import("../pages/DashboardPage/DashboardPage.styled"))
);
export const BoardPage = wrap(
  lazy(() => import("../pages/BoardPage/BoardPage"))
);
export const NotFoundPage = wrap(
  lazy(() => import("../pages/NotFoundPage/NotFoundPage.styled"))
);

// Modals
export const BurgerMenu = wrap(
  lazy(() => import("../components/BurgerMenu/BurgerMenu.styled"))
);
export const NeedHelpModal = wrap(
  lazy(() => import("../components/Modals/NeedHelpModal/NeedHelpModal.styled"))
);
export const LogoutModal = wrap(
  lazy(() => import("../components/Modals/LogoutModal/LogoutModal.styled"))
);
export const EditUserModal = wrap(
  lazy(() => import("../components/Modals/EditUserModal/EditUserModal.styled"))
);
export const FiltersModal = wrap(
  lazy(() => import("../components/Modals/FiltersModal/FiltersModal.styled"))
);
export const AddBoardModal = wrap(
  lazy(() => import("../components/Modals/AddBoardModal/AddBoardModal"))
);
export const DeleteBoardModal = wrap(
  lazy(
    () =>
      import("../components/Modals/DeleteBoardModal/DeleteBoardModal.styled")
  )
);
export const EditBoardModal = wrap(
  lazy(() => import("../components/Modals/EditBoardModal/EditBoardModal"))
);
export const AddColumnModal = wrap(
  lazy(() => import("../components/Modals/AddColumnModal/AddColumnModal"))
);
export const DeleteColumnModal = wrap(
  lazy(
    () =>
      import("../components/Modals/DeleteColumnModal/DeleteColumnModal.styled")
  )
);
export const EditColumnModal = wrap(
  lazy(() => import("../components/Modals/EditColumnModal/EditColumnModal"))
);
export const AddCardModal = wrap(
  lazy(() => import("../components/Modals/AddCardModal/AddCardModal.styled"))
);
export const DeleteCardModal = wrap(
  lazy(
    () => import("../components/Modals/DeleteCardModal/DeleteCardModal.styled")
  )
);
export const EditCardModal = wrap(
  lazy(() => import("../components/Modals/EditCardModal/EditCardModal.styled"))
);
