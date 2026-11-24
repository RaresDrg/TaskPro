import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { createWebStorage } from "../utils/createWebStorage";
import { reducer as generalReducer } from "./general/slice";
import { reducer as authReducer } from "./auth/slice";
import { reducer as boardsReducer } from "./boards/slice";

const persistedAuthReducer = persistReducer(
  {
    key: "auth",
    storage: createWebStorage("sessionStorage"),
    whitelist: ["isLoggedIn", "user"],
  },
  authReducer,
);

const store = configureStore({
  reducer: {
    general: generalReducer,
    auth: persistedAuthReducer,
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
