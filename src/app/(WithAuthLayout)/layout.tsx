import bgImage from "@/assets/parabolic-ellipse.svg";
import Logo from "@/components/shared/Logo";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-primary/10 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/4" />
      </div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat z-0"
        style={{
          backgroundImage: `url(${bgImage?.src})`,
          backgroundSize: "50%",
        }}
      />

      <div className="relative flex w-full flex-col md:flex-row z-10">
        {/* Left Section - Branding */}
        <div className="hidden md:flex md:w-1/2 lg:w-2/5 flex-col justify-between p-8 lg:p-12">
          <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 rounded-2xl p-8 shadow-xl border border-white/20 dark:border-white/5 h-full flex flex-col">
            <div className="flex items-center">
              <Logo />
            </div>

            <div className="mt-auto space-y-6">
              <h1 className="text-3xl font-bold text-primary">
                Showcase my talent with style
              </h1>
              <p className="text-muted-foreground text-lg">
                A professional portfolio that highlights my skills and
                accomplishments.
              </p>

              <div className="border-l-4 border-primary pl-4 py-2 mt-8">
                <p className="italic text-foreground/80">
                  This portfolio has everything I need to showcase my skills and
                  projects.
                </p>
                <p className="text-sm font-medium text-foreground/60 mt-2">
                  — Shakil Hossain
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-md backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-2xl p-8 shadow-xl border border-white/20 dark:border-white/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
