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
  ExternalLink,
  Mail,
  MapPin,
  PenTool,
  Phone,
  Server,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

const socials = [
  {
    href: "https://www.linkedin.com/in/md-shakilhossain/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "bg-[#0077B5]",
  },
  {
    href: "https://github.com/Shakilofficial",
    icon: FaGithub,
    label: "GitHub",
    color: "bg-[#333]",
  },
  {
    href: "https://www.facebook.com/iamshakilhossain",
    icon: FaFacebook,
    label: "Facebook",
    color: "bg-[#1877F2]",
  },
  {
    href: "https://www.instagram.com/shakilhossain75",
    icon: FaInstagram,
    label: "Instagram",
    color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
  },
  {
    href: "https://x.com/creative_shakil",
    icon: FaTwitter,
    label: "Twitter",
    color: "bg-[#1DA1F2]",
  },
];

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
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/70 via-pink-500/70 to-indigo-600/70 z-[100]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <footer className="w-full relative overflow-hidden backdrop-blur-3xl bg-white/30 dark:bg-slate-950/10 border-t border-white/10 dark:border-slate-900 shadow-inner shadow-white/10 dark:shadow-black/10">
        {/* Wave decoration */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
          <svg
            className="relative block w-full h-16 text-white dark:text-slate-950"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current"
            ></path>
          </svg>
        </div>

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
                {socials.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="relative group"
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${social.color} text-white shadow-lg`}
                      >
                        <social.icon size={18} />
                      </div>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
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

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Subscribe to newsletter"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pr-10 border-slate-300 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-500 bg-white dark:bg-slate-900"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Md Shakil Hossain. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="https://shakil-portfolio-dashboard.vercel.app"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center"
              >
                Dashboard <ExternalLink className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
