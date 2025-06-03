"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  Home,
  Mail,
  PenTool,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import MobileBottomNav from "./MobileBottomNav";
import ModeToggle from "./ModeToggle";
import NavItems from "./NavItems";

// Define nav items with Lucide icons
const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/blogs", label: "Blogs", icon: PenTool },
  { href: "/contact", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
      {/* Desktop/Tablet Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-purple-200/30 dark:border-purple-800/30 shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Center Navigation - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full px-3 py-1.5 border border-purple-200/40 dark:border-purple-700/40 shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20 uppercase">
                <NavItems items={NAV_ITEMS} />
              </div>
            </div>

            {/* Right Side - Mode Toggle and CTA */}
            <div className="flex items-center space-x-3">
              <ModeToggle />

              {/* CTA Button */}
              <div>
                <motion.a
                  href={driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center relative overflow-hidden px-4 py-2 text-sm font-semibold uppercase text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl shadow-purple-500/25 hover:shadow-purple-500/35"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Hire Me</span>
                  <ExternalLink className="inline-block ml-2 h-4 w-4" />

                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileBottomNav />

      <div className="lg:hidden h-16" />
    </>
  );
};

export default Navbar;
