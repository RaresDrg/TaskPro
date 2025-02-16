import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { authReducer } from "./auth/slice";
import { modalsReducer } from "./modals/slice";
import { boardsReducer } from "./boards/slice";

const authPersistedReducer = persistReducer(
  { key: "auth", storage: storageSession, whitelist: ["isLoggedIn", "user"] },
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    modals: modalsReducer,
    boards: boardsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
