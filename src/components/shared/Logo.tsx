"use client";

import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className={cn("flex items-center space-x-2 relative")}>
      <motion.div
        className="relative w-[110px] h-[40px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))",
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Image
          src={logo || "/placeholder.svg"}
          alt="Logo"
          sizes="110px"
          fill
          className="object-contain"
          priority
          loading="eager"
        />

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-md bg-purple-500/0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            filter: "blur(15px)",
            zIndex: -1,
          }}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
