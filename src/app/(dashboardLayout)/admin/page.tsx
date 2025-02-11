"use client";

import { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome to Dashboard</h1>
    </div>
  );
};

export default AdminDashboardPage;
