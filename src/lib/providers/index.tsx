"use client";
import { ThemeProvider } from "@/lib/providers/Provider";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import ScrollAnimationProvider from "./ScrollAnimationProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ScrollAnimationProvider>
          <Toaster position="top-center" duration={3000} />
          {children}
        </ScrollAnimationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
