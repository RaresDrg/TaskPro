import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import AppThemeProvider from "./components/AppThemeProvider/AppThemeProvider";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </PersistGate>
  </Provider>
);
