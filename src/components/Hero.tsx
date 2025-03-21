"use client";
import { Download, Mail } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { AuroraText } from "./magicui/aurora-text";
import { Ripple } from "./magicui/ripple";
import { ShinyButton } from "./magicui/shiny-button";
import { TypingAnimation } from "./magicui/typing-animation";

const Hero = () => {
  const cvPath =
    "https://drive.google.com/file/d/1fmc5elUzSAikh6psxyPc2VDd57k-1eoI/view?usp=sharing";

  const handleEmailClick = () => {
    window.location.href = "mailto:MrShakilHossain@outlook.com";
  };

  const handleDownloadCV = () => {
    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = cvPath;
    link.download =
      "https://drive.google.com/file/d/1fmc5elUzSAikh6psxyPc2VDd57k-1eoI/view?usp=sharing";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dcyupktj6/image/upload/v1739116773/lx1aeznvlqo7htectued.png"
        />
      </Head>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 space-y-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-8 sm:mb-6">
            <AuroraText>MERN Stack Developer</AuroraText>
          </h1>
          <p className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
            Building Digital Experiences
          </p>
          <TypingAnimation className="text-gray-500">
            I&apos;m a passionate full-stack developer dedicated to crafting
            modern, high-performance web applications with a seamless user
            experience. With a strong foundation in computer science and
            hands-on expertise in modern technologies, I thrive on transforming
            ideas into impactful digital solutions. Let&apos;s turn ideas into
            reality and create something extraordinary together!
          </TypingAnimation>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <ShinyButton onClick={handleEmailClick}>
              <Mail className="mr-2 h-5 w-5" />
            </ShinyButton>
            <ShinyButton
              onClick={handleDownloadCV}
              className="flex items-center gap-2 bg-slate-400/50 hover:text-rose-600 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 transition-all duration-300 px-4 py-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span>Download CV</span>
                <Download className="h-5 w-5" />
              </div>
            </ShinyButton>
          </div>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="relative aspect-square">
            <Ripple className="absolute inset-0 rounded-full opacity-70 scale-110" />
            <Image
              src="https://res.cloudinary.com/dcyupktj6/image/upload/v1739116773/lx1aeznvlqo7htectued.png"
              alt="Profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="relative z-10 rounded-full object-cover border-4 border-purple-500 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
