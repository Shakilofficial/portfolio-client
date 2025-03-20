import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/80 via-primary/50 to-primary/30 opacity-75 blur-lg animate-pulse" />
        <div className="relative bg-background rounded-full p-8 border shadow-xl">
          <Search className="h-12 w-12 text-primary animate-bounce" />
        </div>
      </div>
      <div className="mt-8 space-y-2 text-center">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-gradient-x">
          404
        </h1>
        <h3 className="text-2xl font-bold tracking-tight">Page Not Found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="relative overflow-hidden group">
            <Link href="/">
              <span className="relative z-10">Go Home</span>
              <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="relative overflow-hidden group"
          >
            <Link href="/login">
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-1 opacity-50">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-1 w-16 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
