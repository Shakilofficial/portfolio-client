import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
