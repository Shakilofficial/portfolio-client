"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  {
    href: "https://www.linkedin.com/in/md-shakilhossain/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "bg-gradient-to-br from-[#0077B5] via-[#0A66C2] to-[#004182]",
  },
  {
    href: "https://github.com/Shakilofficial",
    icon: FaGithub,
    label: "GitHub",
    color: "bg-gradient-to-br from-[#333] via-[#555] to-[#999]",
  },
  {
    href: "https://www.facebook.com/iamshakilhossain",
    icon: FaFacebook,
    label: "Facebook",
    color: "bg-gradient-to-br from-[#1877F2] via-[#3B5998] to-[#0A4BC1]",
  },
  {
    href: "https://www.instagram.com/shakilhossain75",
    icon: FaInstagram,
    label: "Instagram",
    color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
  },
  {
    href: "https://x.com/creative_shakil",
    icon: FaXTwitter,
    label: "X",
    color: "bg-gradient-to-br from-[#0F1419] via-[#4D4D4D] to-[#D9D9D9]",
  },
];

const Socials = () => {
  return (
    <>
      {socials.map((social, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link
            href={social.href}
            target="_blank"
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
    </>
  );
};

export default Socials;
