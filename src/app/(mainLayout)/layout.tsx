import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <p>Header</p>
      <main className="flex-grow">{children}</main>
      <p>Footer</p>
    </div>
  );
};

export default MainLayout;
