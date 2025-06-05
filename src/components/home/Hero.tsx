/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Floating background elements
const FloatingElement = ({ delay = 0, duration = 20, className = "" }) => (
  <motion.div
    className={cn("absolute rounded-full opacity-10", className)}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const contentY = useTransform(smoothProgress, [0.1, 0.4], [100, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);

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
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center"
    >
      {/* Unified Background System */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-950/30 dark:to-purple-950/10" />

        {/* Consistent grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating elements */}
        <FloatingElement
          delay={0}
          duration={25}
          className="top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 blur-3xl"
        />
        <FloatingElement
          delay={8}
          duration={30}
          className="bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl"
        />
        <FloatingElement
          delay={15}
          duration={35}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/5 to-teal-500/5 blur-3xl"
        />

        {/* Subtle tech pattern */}
        <div
          className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H40 V40 H70 V70 H90' stroke='%23a855f7' strokeOpacity='0.3' fill='none' strokeWidth='1'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%23a855f7' fillOpacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
        >
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/30 shadow-lg">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Welcome to my portfolio
                </span>
              </div>
            </motion.div>

            {/* Rotating roles */}
            <motion.div
              variants={itemVariants}
              className="relative h-12 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-start"
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                      {roles[currentRole]}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Main title */}
            <motion.div variants={itemVariants} className="relative">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-100 dark:to-white bg-clip-text text-transparent">
                  Building Digital
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
                I&apos;m a passionate full-stack developer dedicated to crafting
                modern, high-performance web applications with seamless user
                experiences. Let&apos;s turn ideas into reality and create something
                extraordinary together!
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-purple-200/50 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Me</span>
              </Button>

              <Button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl"
              >
                <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
                <Download
                  className={cn("h-5 w-5", isDownloading && "animate-bounce")}
                />
              </Button>

              <Button
                onClick={() => window.open(driveLink, "_blank")}
                variant="outline"
                className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-purple-200/50 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl"
              >
                <span>View CV</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Status and navigation */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-4 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Available for projects
                </span>
              </div>

              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

              <motion.a
                href="#projects"
                className="group flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                View my work
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          {/* Profile Image Section */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative aspect-square">
              {/* Decorative rings */}
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

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -right-4 top-1/4 z-20"
              >
                <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/30 shadow-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white">
                      <span className="text-xs font-bold">1+</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        Years of
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Experience
                      </p>
                    </div>
                  </div>
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -left-4 bottom-1/4 z-20"
              >
                <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/30 shadow-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                      <span className="text-xs font-bold">10+</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        Projects
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Completed
                      </p>
                    </div>
                  </div>
                </Badge>
              </motion.div>

              {/* Profile image */}
              <motion.div
                className="relative z-10 h-full w-full rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl"
                animate={{
                  boxShadow: isHovered
                    ? "0 25px 50px -12px rgba(147, 51, 234, 0.4), 0 0 0 1px rgba(147, 51, 234, 0.1)"
                    : "0 20px 25px -5px rgba(147, 51, 234, 0.2), 0 0 0 1px rgba(147, 51, 234, 0.05)",
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

                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.2 : 0.1,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2"
          >
            Scroll to explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="h-6 w-4 rounded-full border border-slate-300 dark:border-slate-700 p-1"
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
