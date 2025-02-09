import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">Sidebar</aside>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
