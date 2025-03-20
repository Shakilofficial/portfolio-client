import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/95 dark:from-background dark:to-background/95">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
