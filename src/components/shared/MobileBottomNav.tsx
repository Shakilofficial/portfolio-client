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
      <div className="mx-4 mb-4">
        <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-2 py-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center py-2 px-1 flex-1 transition-all duration-300"
                >
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                        : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                    
                    {isActive && (
                      <motion.div
                        layoutId="navTab"
                        className="absolute inset-x-2 -bottom-1 h-1 bg-purple-500 rounded-full blur-[2px]"
                      />
                    )}
                  </motion.div>
                  <span
                    className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1.5 transition-colors duration-300 ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-slate-500"
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
