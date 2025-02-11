"use client";

import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const token = useAppSelector(selectCurrentToken);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!isClient) {
    return null;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">Sidebar</aside>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
