"use client";

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
    <div className="flex items-center space-x-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredItem === item.href;

        return (
          <motion.div
            key={item.href}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.href)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={`relative px-4 py-2.5 font-medium transition-all duration-200 rounded-lg ${
                isActive
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.label}

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 border border-purple-200/50 dark:border-purple-800/50 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {isHovered && !isActive && (
                <motion.div
                  className="absolute inset-0 bg-gray-100/80 dark:bg-purple-950/10 rounded-lg -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
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
