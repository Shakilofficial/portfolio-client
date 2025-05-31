"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

type NavItemsProps = {
  items: NavItem[];
  mobile?: boolean;
  setIsOpen?: (value: boolean) => void;
};

const NavItems = ({ items, mobile = false, setIsOpen }: NavItemsProps) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLinkClick = () => {
    if (mobile && setIsOpen) {
      setIsOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (mobile) {
    return (
      <motion.ul
        className="py-6 space-y-4 px-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <motion.li
              key={item.href}
              variants={itemVariants}
              className="relative"
            >
              <Link
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 text-purple-600 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mr-4 shadow-sm">
                  <span className="text-xl">{item.icon}</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">{item.label}</span>
                  {isActive && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Active
                    </span>
                  )}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicatorMobile"
                    className="absolute right-4 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }

  return (
    <motion.ul className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredItem === item.href;

        return (
          <motion.li
            key={item.href}
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={item.href}
              className={`relative px-2.5 py-2 text-sm font-semibold uppercase transition-colors rounded-lg ${
                isActive
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-300"
              }`}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.label}
              {isHovered && !isActive && (
                <motion.span
                  layoutId="hoverIndicator"
                  className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800/50 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default NavItems;
