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
          <Toaster
            position="top-center"
            duration={3000}
            toastOptions={{
              className:
                "backdrop-blur-md bg-white/30 dark:bg-slate-800/30 text-gray-900 dark:text-white px-5 py-4 rounded-2xl shadow-2xl border border-purple-700/40 dark:border-slate-700/40 font-medium transition-all duration-300",
              style: {
                fontSize: "0.95rem",
                fontFamily: "var(--font-sans)",
                WebkitBackdropFilter: "blur(10px)",
              },
            }}
          />
          {children}
        </ScrollAnimationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
