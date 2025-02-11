import bgImage from "@/assets/parabolic-ellipse.svg"; // Ensure this is the correct relative path
import Logo from "@/components/shared/Logo";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Set background image here with opacity and blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage?.src})`,
          opacity: 0.3,
          filter: "blur(8px)",
        }}
      ></div>

      <div className="relative flex items-center justify-center w-full h-full md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-foreground dark:border-r lg:flex shadow-lg rounded-lg">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex items-center text-2xl font-bold">
            <Logo />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This portfolio has everything mine need to showcase my
                skills and projects.&rdquo;
              </p>
              <footer className="text-sm">Shakil Hossain</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] rounded-lg shadow-xl border border-purple-950/20 bg-purple-950/10 dark:border-purple-800/20 p-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter credentials to access the dashboard
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
