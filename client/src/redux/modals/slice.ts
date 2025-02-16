import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  forgotPasswordModal: false,
  editUserModal: false,
  burgerMenu: false,
  needHelpModal: false,
  logoutModal: false,
  filtersModal: false,
  addBoardModal: false,
  editBoardModal: false,
  deleteBoardModal: false,
  addColumnModal: false,
  editColumnModal: false,
  deleteColumnModal: false,
  addCardModal: false,
  editCardModal: false,
  deleteCardModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<keyof typeof initialState>) => {
      state[action.payload] = true;
    },
    setModalsClose: () => initialState,
    setBurgerMenuClose: (state) => {
      state.burgerMenu = false;
    },
  },
});

export const { setModalOpen, setModalsClose, setBurgerMenuClose } =
  modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
