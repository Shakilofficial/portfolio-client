"use client";

import { motion } from "framer-motion";
import { Briefcase, Home, Mail, PenTool, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blogs", label: "Blogs", icon: PenTool },
  { href: "/contact", label: "Contact", icon: Mail },
];

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="mx-3 mb-3">
        <div className="bg-white/70 dark:bg-purple-950/50 backdrop-blur-xl border border-stone-700/60 rounded-2xl shadow-xl shadow-black/50 dark:shadow-black/20">
          <div className="flex items-center justify-around p-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 uppercase"
                >
                  <motion.div
                    className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  <span
                    className={`text-sm md:text-base font-medium mt-0.5 transition-colors duration-200 ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
