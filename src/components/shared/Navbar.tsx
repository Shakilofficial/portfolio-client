/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShinyButton } from "../magicui/shiny-button";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();

  const driveLink =
    "https://drive.google.com/file/d/1HYhZ7ApwPkrFpDJM1TvigWJarxeqsRdn/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const active =
      navItems.find((item) => item.href === pathname)?.href || null;
    setActiveItem(active);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="hidden md:flex items-center space-x-3">
              <ul className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = activeItem === item.href;

                  return (
                    <motion.li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center ${
                          isActive
                            ? "text-white"
                            : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
                        }`}
                        onMouseEnter={() =>
                          !isActive && setActiveItem(item.href)
                        }
                        onMouseLeave={() =>
                          !isActive && setActiveItem(pathname)
                        }
                      >
                        {isActive && (
                          <motion.span
                            layoutId="navBackground"
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl -z-10"
                            initial={false}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <ModeToggle />

              <ShinyButton
                onClick={() => window.open(driveLink, "_blank")}
             className="flex items-center gap-2 border border-transparent bg-gradient-to-r from-purple-500 to-indigo-500 text-white transition-all duration-300 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <span>Resume</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </ShinyButton>
            </div>

            <div className="flex items-center md:hidden gap-2">
            <ShinyButton
                onClick={() => window.open(driveLink, "_blank")}
             className="flex items-center gap-2 border border-transparent bg-gradient-to-r from-purple-500 to-indigo-500 text-white transition-all duration-300 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <span>Resume</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </ShinyButton>
              <ModeToggle />
              <motion.button
                className="ml-2 p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative h-full flex flex-col p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="space-y-6"
                >
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                      <motion.li
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        className="overflow-hidden"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center text-4xl font-bold transition-colors ${
                            isActive
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <span className="inline-block relative">
                            {item.label}
                          </span>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2 text-purple-500"
                          >
                            <ArrowUpRight className="w-6 h-6" />
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
