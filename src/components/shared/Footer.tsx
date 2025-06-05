/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Code,
  Mail,
  MapPin,
  PenTool,
  Phone,
  Server,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Socials from "./Socials";

const services = [
  { name: "Web Development", icon: Code },
  { name: "Frontend Development", icon: PenTool },
  { name: "Backend Development", icon: Server },
  { name: "Full Stack Development", icon: Briefcase },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "https://shakil-portfolio-dashboard.vercel.app" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-3 lg:bottom-6 lg:right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600/70 via-pink-500/70 to-indigo-600/70 z-[100]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <footer className="w-full relative overflow-hidden backdrop-blur-3xl bg-white/30 dark:bg-slate-950/10 border-t border-white/10 dark:border-slate-900 shadow-inner shadow-white/10 dark:shadow-black/10">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl"></div>

          {/* Dotted background pattern */}
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(currentColor 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-20 pb-8 relative z-10">
          {/* Top section with logo and social links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 border-b border-slate-200 dark:border-slate-800 pb-16">
            {/* About section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                    Md Shakil Hossain
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400">
                I am a passionate developer creating innovative web solutions
                with modern technologies. Let&apos;s build something amazing
                together!
              </p>

              <div className="flex space-x-3">
                <Socials />
              </div>
            </motion.div>

            {/* Services section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100 relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center group"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20 transition-colors">
                      <service.icon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {service.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100 relative inline-block">
                Contact
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400 group transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    mrshakilhossain@outlook.com
                  </span>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex flex-col items-start text-sm text-slate-600 dark:text-slate-400 group transition-all"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                      <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        +880 1620-521215
                      </span>
                      <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        +880 1521-765486
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400 group transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Tangail, Dhaka, Bangladesh
                  </span>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pr-12 py-3 rounded-xl border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 placeholder:text-slate-400"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg border-0"
                    >
                      {isSubmitted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {isSubmitted && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-600 dark:text-green-400 flex items-center"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Thank you for
                      subscribing!
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-0 uppercase">
              &copy; {new Date().getFullYear()} Md Shakil Hossain. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
