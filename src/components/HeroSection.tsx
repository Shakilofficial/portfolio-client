"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, ExternalLink, Mail } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";
import { SparklesText } from "./magicui/sparkles-text";
import { TypingAnimation } from "./magicui/typing-animation";

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

const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const roles = [
    "MERN Stack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "UI/UX Enthusiast",
    "Backend Developer",
    "Node.js Developer",
    "Web Architect",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [roles.length]);

  const cvFileName = "Md-Shakil-Hossain-Full-Stack-Developer-CV.pdf";
  const cvPath = `/cv/${cvFileName}`;

  const driveLink =
    "https://drive.google.com/file/d/1VGMuYOQF5bgM7xshoMJ5Qnp3QnvmnydK/view?usp=sharing";

  const handleEmailClick = () => {
    window.location.href = "mailto:MrShakilHossain@outlook.com";
  };

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(cvPath, { method: "HEAD" });
      if (response.ok) {
        const link = document.createElement("a");
        link.href = cvPath;
        link.setAttribute("download", cvFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(driveLink, "_blank");
      }
    } catch (error) {
      console.error("Download error:", error);
      window.open(driveLink, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 1500);
    }
  };

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden py-28 lg:py-32">
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dcyupktj6/image/upload/v1746154677/my-avtar-profile_ezyfub.png"
        />
      </Head>

      {/* Dotted background pattern */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[100px]"
          style={{
            animation: "float 15s ease-in-out infinite alternate",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -bottom-[30%] -left-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-[100px]"
          style={{
            animation: "float 20s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
        >
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 space-y-8">
            {/* Rotating roles with enhanced animation */}
            <motion.div
              variants={itemVariants}
              className="relative h-10 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-start"
                >
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                    <AuroraText>{roles[currentRole]}</AuroraText>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <SparklesText className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight">
                Building Digital Experiences
              </SparklesText>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TypingAnimation className="text-gray-500 text-base sm:text-lg">
                I&apos;m a passionate full-stack developer dedicated to crafting
                modern, high-performance web applications with a seamless user
                experience. With a strong foundation in computer science and
                hands-on expertise in modern technologies, I thrive on
                transforming ideas into impactful digital solutions. Let&apos;s
                turn ideas into reality and create something extraordinary
                together!
              </TypingAnimation>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <ShinyButton
                onClick={handleEmailClick}
                className="flex items-center gap-2 border border-purple-500/30 hover:border-purple-500/70 text-primary transition-all duration-300 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Me</span>
              </ShinyButton>

              <ShinyButton
                onClick={handleDownloadCV}
                className="flex items-center gap-2 border border-transparent bg-gradient-to-r from-purple-500 to-indigo-500 text-white transition-all duration-300 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
                disabled={isDownloading}
              >
                <div className="flex items-center gap-2">
                  <span>
                    {isDownloading ? "Downloading..." : "Download CV"}
                  </span>
                  <Download
                    className={`h-5 w-5 ${
                      isDownloading ? "animate-bounce" : ""
                    }`}
                  />
                </div>
              </ShinyButton>
              <ShinyButton
                onClick={() => window.open(driveLink, "_blank")}
                className="flex items-center gap-2 border border-purple-500/30 hover:border-purple-500/70 text-primary transition-all duration-300 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <span>View CV</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </ShinyButton>
            </motion.div>

            {/* Social Media Links */}
            <div>
              <div className="flex space-x-3 justify-center lg:justify-start">
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
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-500">
                  Available for projects
                </span>
              </div>

              <div className="h-4 w-px bg-gray-200"></div>

              <motion.a
                href="/projects"
                className="group flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-purple-500"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                View my work
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative aspect-square">
              {/* Decorative rings with enhanced animation */}
              <motion.div
                animate={{
                  scale: isHovered ? [1.15, 1.2, 1.15] : 1.15,
                  opacity: isHovered ? [0.2, 0.3, 0.2] : 0.2,
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-full border border-purple-500/20"
              />
              <motion.div
                animate={{
                  scale: isHovered ? [1.3, 1.35, 1.3] : 1.3,
                  opacity: isHovered ? [0.1, 0.2, 0.1] : 0.1,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
                className="absolute inset-0 rounded-full border border-purple-500/10"
              />

              {/* Floating tech badges with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -right-4 top-1/4 rounded-xl border border-purple-500/20 p-3 shadow-lg backdrop-blur-sm z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    <span className="text-xs font-bold">1+</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">Years of</p>
                    <p className="text-sm font-bold text-gray-500">
                      Experience
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -left-4 bottom-1/4 rounded-xl border border-purple-500/20 p-3 shadow-lg backdrop-blur-sm z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    <span className="text-xs font-bold">10+</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">Projects</p>
                    <p className="text-sm font-bold text-gray-500">Completed</p>
                  </div>
                </div>
              </motion.div>

              {/* Profile image with enhanced effects */}
              <motion.div
                className="relative z-10 h-full w-full rounded-full overflow-hidden border-4 border-purple-500 shadow-xl"
                animate={{
                  boxShadow: isHovered
                    ? "0 20px 25px -5px rgba(147, 51, 234, 0.3), 0 10px 10px -5px rgba(147, 51, 234, 0.2)"
                    : "0 10px 15px -3px rgba(147, 51, 234, 0.2), 0 4px 6px -2px rgba(147, 51, 234, 0.1)",
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://res.cloudinary.com/dcyupktj6/image/upload/v1746154677/my-avtar-profile_ezyfub.png"
                  alt="Profile"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />

                {/* Enhanced gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.2 : 0.1,
                    background: isHovered
                      ? "linear-gradient(to top right, rgba(147, 51, 234, 0.2), transparent, rgba(59, 130, 246, 0.1))"
                      : "linear-gradient(to top right, rgba(147, 51, 234, 0.1), transparent)",
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-xs font-medium text-gray-500 mb-2"
          >
            Scroll to explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="h-6 w-4 rounded-full border border-gray-300 p-1"
          >
            <motion.div
              animate={{
                y: [0, 2, 0],
                backgroundColor: [
                  "rgb(168, 85, 247)",
                  "rgb(99, 102, 241)",
                  "rgb(168, 85, 247)",
                ],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="h-1 w-1 rounded-full bg-purple-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
