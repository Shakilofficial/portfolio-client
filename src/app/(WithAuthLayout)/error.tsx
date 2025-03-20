"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-destructive via-destructive/50 to-destructive/30 opacity-75 blur-lg animate-pulse" />
        <div className="relative bg-background rounded-full p-8 border shadow-xl">
          <AlertTriangle className="h-12 w-12 text-destructive animate-bounce" />
        </div>
      </div>
      <div className="mt-8 space-y-2 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Something went wrong!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {error.message ||
            "An unexpected error occurred. Please try again later."}
        </p>
        <div className="pt-4">
          <Button
            onClick={reset}
            className="relative group overflow-hidden rounded-full px-6 py-2 animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e293b,55%,#000103)] bg-[length:200%_100%]"
          >
            <span className="relative z-10">Try Again</span>
            <span className="absolute inset-0 flex justify-center items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Retry
            </span>
          </Button>
        </div>
      </div>
      <div className="mt-6 text-xs text-muted-foreground">
        Error ID: {error.digest}
      </div>
    </div>
  );
};

export default Error;
