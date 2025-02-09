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
      
      <main className="min-h-[calc(70vh-64px)] flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
