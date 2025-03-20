import LoginForm from "@/components/module/auth/LoginForm";
import Logo from "@/components/shared/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Shakils Portfolio",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center space-y-5">
      <Logo />
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your credentials to access the dashboard.
        </p>
        <div className="bg-transparent">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
