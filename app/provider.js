"use client";
import Header from "@/components/Header/Header";
import { FooterWrapper } from "@/components/footer/FooterWrapper";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { persistStore } from "redux-persist";
import store from "@/store";

let persistor = persistStore(store);
export function Providers({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <Header />
      {children}
      <FooterWrapper />
    </Provider>
  );
}
