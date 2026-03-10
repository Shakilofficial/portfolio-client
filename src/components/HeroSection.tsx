"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";
import { SparklesText } from "./magicui/sparkles-text";
import { TypingAnimation } from "./magicui/typing-animation";
import Socials from "./shared/Socials";

const roles = [
  "Full Stack Engineer",
  "Backend Engineer",
  "Node.js Engineer",
  "Cloud and DevOps Engineer",
  "MERN Stack Developer",
  "Frontend Developer",
  "Next.js Developer",
];

const CALENDLY_LINK =
  "https://calendly.com/creative-shakilofficial/30min";

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

const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const driveLink =
    "https://drive.google.com/file/d/1dbRyW0kIetu3cGq8j_TdTea5leywTKP6/view?usp=sharing";

  const handleEmailClick = () => {
    window.location.href = "mailto:MrShakilHossain@outlook.com";
  };

  const handleScheduleMeeting = () => {
    window.open(CALENDLY_LINK, "_blank");
  };

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const fileId = "1dbRyW0kIetu3cGq8j_TdTea5leywTKP6";
      const directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

      const link = document.createElement("a");
      link.href = directDownloadLink;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(driveLink, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <section className="relative overflow-hidden pb-28 lg:py-32">
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dcyupktj6/image/upload/v1746154677/my-avtar-profile_ezyfub.png"
        />
      </Head>

      {/* dotted bg */}
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

      {/* gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[100px]"
          style={{ animation: "float 15s ease-in-out infinite alternate" }}
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

            {/* rotating roles */}
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
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-start"
                >
                  <h1 className="text-lg md:text-xl font-bold uppercase tracking-[0.3em] font-heading text-purple-600 dark:text-purple-400">
                    <AuroraText>{roles[currentRole]}</AuroraText>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SparklesText className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight font-serif leading-[1.1]">
                Building Digital Experiences
              </SparklesText>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TypingAnimation className="text-muted-foreground text-sm sm:text-lg leading-relaxed max-w-xl">
                I&apos;m a passionate full-stack developer dedicated to crafting
                modern, high-performance web applications with seamless user
                experience.
              </TypingAnimation>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <ShinyButton
                onClick={handleScheduleMeeting}
                className="flex items-center gap-2 border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 px-6 py-2.5 rounded-lg hover:-translate-y-1 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span>Schedule a Meeting</span>
              </ShinyButton>

              <ShinyButton
                onClick={handleEmailClick}
                className="flex items-center gap-2 border border-purple-500/30 hover:border-purple-500/70 text-primary px-6 py-2.5 rounded-lg"
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </ShinyButton>

              <ShinyButton
                onClick={handleDownloadCV}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2.5 rounded-lg"
                disabled={isDownloading}
              >
                {isDownloading ? "Downloading..." : "Download Resume"}
                <Download
                  className={`h-5 w-5 ${isDownloading ? "animate-bounce" : ""
                    }`}
                />
              </ShinyButton>
            </motion.div>

            <div className="flex justify-center lg:justify-start">
              <Socials />
            </div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2 justify-center lg:justify-start"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Available for projects
              </span>

              <div className="h-4 w-px bg-gray-200" />

              <motion.a
                href="/projects"
                className="group flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-purple-500"
                whileHover={{ x: 5 }}
              >
                View my work
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
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
                    <span className="text-xs font-bold">2+</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Years of</p>
                    <p className="text-sm font-bold text-white dark:text-slate-400">
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
                    <span className="text-xs font-bold">25+</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Projects</p>
                    <p className="text-sm font-bold text-white dark:text-slate-400">Completed</p>
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