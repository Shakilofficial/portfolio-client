import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg">{children}</div>
    </div>
  );
};

export default AuthLayout;
