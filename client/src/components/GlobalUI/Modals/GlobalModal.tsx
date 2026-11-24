import { createElement, type ComponentType } from "react";
import type { ModalType } from "../../../types";
import { useReduxState } from "../../../hooks";
import {
  BurgerMenuModal,
  NeedHelpModal,
  LogoutModal,
  EditUserModal,
  AddBoardModal,
  EditBoardModal,
  DeleteBoardModal,
  AddColumnModal,
  EditColumnModal,
  DeleteColumnModal,
  AddCardModal,
  EditCardModal,
  DeleteCardModal,
  FiltersModal,
} from ".";

// todo: lazy

const modalMap: Record<ModalType, ComponentType> = {
  logoutModal: LogoutModal,
  needHelpModal: NeedHelpModal,
  editUserModal: EditUserModal,
  burgerMenuModal: BurgerMenuModal,
  filtersModal: FiltersModal,

  // Board
  addBoardModal: AddBoardModal,
  editBoardModal: EditBoardModal,
  deleteBoardModal: DeleteBoardModal,

  // Column
  addColumnModal: AddColumnModal,
  editColumnModal: EditColumnModal,
  deleteColumnModal: DeleteColumnModal,

  // Card
  addCardModal: AddCardModal,
  editCardModal: EditCardModal,
  deleteCardModal: DeleteCardModal,
};

const GlobalModal = () => {
  const activeModal = useReduxState("selectActiveModal");
  return activeModal ? createElement(modalMap[activeModal]) : null;
};

export default GlobalModal;
