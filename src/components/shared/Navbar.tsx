/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import NavItems from "./NavItems";

const NAV_ITEMS = [
  { href: "/", label: "HOME", icon: "🏠" },
  { href: "/about", label: "About", icon: "👨‍💻" },
  { href: "/projects", label: "PROJECTS", icon: "💼" },
  { href: "/blogs", label: "BLOGS", icon: "✏️" },
  { href: "/contact", label: "CONTACT", icon: "📧" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const driveLink =
    "https://drive.google.com/file/d/1HYhZ7ApwPkrFpDJM1TvigWJarxeqsRdn/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .gradient-border {
          position: relative;
          border: 1px solid transparent;
          border-radius: 1rem; /* Reduced from 9999px */
          background: linear-gradient(45deg, #6b7280, #a5b4fc, #6b7280)
            border-box;
          background-size: 200% 200%;
          animation: gradientBorder 6s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        }

        .dark .gradient-border {
          background: linear-gradient(45deg, #4b5563, #818cf8, #4b5563)
            border-box;
        }

        .gradient-border::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 1rem; /* Match outer radius */
          background: white;
          z-index: -1;
        }

        .dark .gradient-border::before {
          background: #1f2937;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 backdrop-blur-lg bg-white/95 dark:bg-zinc-950/95 shadow-md"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Center: Nav Items with Animated Gradient Border */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="gradient-border px-3 py-1.5">
                <NavItems items={NAV_ITEMS} />
              </div>
            </div>

            {/* Right: CTA & Mode Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <ModeToggle />
              <motion.a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex justify-center overflow-hidden px-4 py-2 text-sm font-semibold uppercase text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Hire Me</span>
                <ExternalLink className="inline-block ml-2 h-4 w-4" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-3">
              <ModeToggle />
              <motion.a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex justify-center overflow-hidden px-4 py-2 text-sm font-semibold uppercase text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Resume</span>
                <ExternalLink className="inline-block ml-1 h-4 w-4" />
              </motion.a>
              <motion.button
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
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
              className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="relative h-full flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-10">
                <Logo />
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <NavItems items={NAV_ITEMS} mobile setIsOpen={setIsOpen} />
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 blur-3xl" />
              <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
