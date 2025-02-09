import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { AuroraText } from "./magicui/aurora-text";
import { Ripple } from "./magicui/ripple";
import { ShinyButton } from "./magicui/shiny-button";
import { TypingAnimation } from "./magicui/typing-animation";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 space-y-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight mb-8 sm:mb-6">
            <AuroraText>MERN Stack Developer</AuroraText>
          </h1>
          <p className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
            Building Digital Experiences
          </p>
          <TypingAnimation>
            I&apos;m a passionate full-stack developer dedicated to crafting
            modern, high-performance web applications with a seamless user
            experience.With a strong foundation in computer science and hands-on
            expertise in modern technologies, I thrive on transforming ideas
            into impactful digital solutions. Let&apos;s turn ideas into reality
            and create something extraordinary together!
          </TypingAnimation>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <ShinyButton>
              <Mail className="mr-2 h-5 w-5" />
            </ShinyButton>
            <Button
              size="lg"
              variant="outline"
              className="bg-purple-500 text-white"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
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
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
