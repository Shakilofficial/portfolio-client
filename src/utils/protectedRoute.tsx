"use client";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let user;

    if (token) {
      user = verifyToken(token);
    }

    if (!token) {
      router.push("/login");
    }

    if (role && user?.role !== role) {
      dispatch(logout());
      router.push("/login");
    }
  }, [token, dispatch, router, role]);

  return token && role ? children : null;
};

export default ProtectedRoute;
