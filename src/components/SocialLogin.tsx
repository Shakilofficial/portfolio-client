"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const SocialLogin = () => {
  return (
    <div className="flex items-center gap-4">
      {/* GitHub Login Button */}
      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-colors duration-300"
        onClick={() =>
          signIn("github", { callbackUrl: "http://localhost:3000/dashboard" })
        }
      >
        <FaGithub className="h-5 w-5" />
        <span>GitHub</span>
      </Button>

      {/* Google Login Button */}
      <Button
        variant="outline"
        className="flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-colors duration-300"
      >
        <FaGoogle className="h-5 w-5" />
        <span>Google</span>
      </Button>
    </div>
  );
};

export default SocialLogin;
