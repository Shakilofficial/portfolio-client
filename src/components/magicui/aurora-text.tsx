"use client";

import { motion } from "framer-motion";
import type React from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
}

export const AuroraText = ({ children, className = "" }: AuroraTextProps) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent animate-gradient ${className}`}
      style={
        {
          backgroundSize: "var(--bg-size, 400%)",
          "--bg-size": "400%",
        } as React.CSSProperties
      }
    >
      {children}
    </motion.span>
  );
};
