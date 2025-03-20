import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary opacity-75 blur-lg animate-pulse" />
        <div className="relative bg-background rounded-full p-8 border shadow-xl">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
      </div>
      <div className="mt-8 space-y-2 text-center">
        <h3 className="text-2xl font-bold tracking-tight animate-pulse">
          Loading
        </h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Please wait while we prepare your content...
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progress-linear" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
