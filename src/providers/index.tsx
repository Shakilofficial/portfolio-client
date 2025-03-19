import UserProvider from "@/context/UserContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        <Toaster richColors position="top-center" duration={3000} />
        {children}
      </UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
