"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import ScrollAnimationProvider from "./ScrollAnimationProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ScrollAnimationProvider>
        <Toaster position="top-center" duration={3000} />
        {children}
      </ScrollAnimationProvider>
    </Provider>
  );
};

export default Providers;
