"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type NavItemsProps = {
  items: NavItem[];
};

const NavItems = ({ items }: NavItemsProps) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="flex items-center space-x-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredItem === item.href;

        return (
          <motion.div
            key={item.href}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.href)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={item.href}
              className={cn(
                "relative px-3 py-1.5 font-medium transition-all duration-300 rounded-xl text-sm uppercase tracking-wide",
                "flex items-center gap-2",
                isActive
                  ? "text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>

              {/* Active state background */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600  via-violet-600 rounded-xl -z-10 shadow-lg shadow-purple-500/25"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover state background */}
              {isHovered && !isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl -z-10 border border-purple-200/30 dark:border-purple-700/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Subtle glow effect for active item */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-xl -z-20 blur-lg opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NavItems;
