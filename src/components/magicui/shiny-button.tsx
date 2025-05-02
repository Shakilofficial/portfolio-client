"use client";

import type React from "react";

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const ShinyButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: ShinyButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Shiny effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

      {/* Button content */}
      {children}
    </button>
  );
};
