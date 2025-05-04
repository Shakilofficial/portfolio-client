import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-[100px]"
          style={{
            animation: "float 15s ease-in-out infinite alternate",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 blur-[100px]"
          style={{
            animation: "float 20s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-muted-foreground mb-8">{message}</p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default Error;
