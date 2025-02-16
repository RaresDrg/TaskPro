import { useModals } from "../../hooks/hooks";
import {
  BurgerMenu,
  NeedHelpModal,
  LogoutModal,
  EditUserModal,
  FiltersModal,
  AddBoardModal,
  DeleteBoardModal,
  EditBoardModal,
  AddColumnModal,
  DeleteColumnModal,
  EditColumnModal,
  AddCardModal,
  DeleteCardModal,
  EditCardModal,
} from "../../utils/handleLazyImports";

const Modals = () => {
  const { modals } = useModals();

  return (
    <>
      {modals.burgerMenu && <BurgerMenu />}
      {modals.editUserModal && <EditUserModal />}
      {modals.needHelpModal && <NeedHelpModal />}
      {modals.logoutModal && <LogoutModal />}
      {modals.filtersModal && <FiltersModal />}
      {modals.addBoardModal && <AddBoardModal />}
      {modals.editBoardModal && <EditBoardModal />}
      {modals.deleteBoardModal && <DeleteBoardModal />}
      {modals.addColumnModal && <AddColumnModal />}
      {modals.editColumnModal && <EditColumnModal />}
      {modals.deleteColumnModal && <DeleteColumnModal />}
      {modals.addCardModal && <AddCardModal />}
      {modals.editCardModal && <EditCardModal />}
      {modals.deleteCardModal && <DeleteCardModal />}
    </>
  );
};

export default Modals;
