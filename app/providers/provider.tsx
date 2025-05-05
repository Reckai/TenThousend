import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "../api/client/client";
import Loader from "../components/Loader";
import { persistor, store } from "../redux/store";
import i18n from "../translations/i18n";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </PersistGate>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Provider;
