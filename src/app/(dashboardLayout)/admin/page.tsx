"use client";

import { Button } from "@/components/ui/button";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome to Dashboard</h1>
      <div className="mb-4">
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default AdminDashboardPage;
