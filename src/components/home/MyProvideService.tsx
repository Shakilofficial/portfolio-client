"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Database,
  ExternalLink,
  Layers,
  LayoutDashboard,
  Palette,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { FC, useRef, useState } from "react";

// Define interfaces for type safety
interface Service {
  title: string;
  description: string;
  icon: FC;
  skills: string[];
  color: string;
  darkColor: string;
  accentColor: string;
  accentHex: string;
  darkAccentHex: string;
}

interface FloatingParticleProps {
  delay?: number;
  size?: string;
  color?: string;
}

interface GradientBlobProps {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: string;
  colors: string;
  delay?: number;
}

interface SkillBadgeProps {
  skill: string;
  color: string;
  index: number;
  isHovered: boolean;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isInView: boolean;
}

// Service data
const services: Service[] = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web development using modern JavaScript/TypeScript, combining scalable backend with interactive frontend.",
    icon: Layers,
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JWT",
      "Zod",
      "Next Auth",
    ],
    color: "from-fuchsia-500 to-pink-600",
    darkColor: "from-fuchsia-600 to-pink-800",
    accentColor: "fuchsia",
    accentHex: "#d946ef",
    darkAccentHex: "#a21caf",
  },
  {
    title: "Frontend Development",
    description:
      "Responsive and interactive UI with reusable components, animation, and modern design systems.",
    icon: Palette,
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux Toolkit",
      "React Hook Form",
      "TypeScript",
      "Shadcn UI",
      "Material UI",
      "Ant Design",
    ],
    color: "from-sky-500 to-cyan-600",
    darkColor: "from-sky-600 to-cyan-800",
    accentColor: "sky",
    accentHex: "#0ea5e9",
    darkAccentHex: "#0369a1",
  },
  {
    title: "Backend Development",
    description:
      "Secure and efficient backend systems with RESTful APIs, authentication, and scalable MongoDB integration.",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Mongoose",
      "Prisma",
      "RESTful APIs",
      "GraphQL",
      "JWT",
      "Zod",
      "OAuth",
    ],
    color: "from-lime-500 to-green-600",
    darkColor: "from-lime-600 to-green-800",
    accentColor: "lime",
    accentHex: "#84cc16",
    darkAccentHex: "#4d7c0f",
  },
  {
    title: "System Architecture",
    description:
      "Designing maintainable architecture using Modular Monolith and MVC patterns with clean code principles.",
    icon: LayoutDashboard,
    skills: [
      "MVC",
      "Modular Monolith",
      "Clean Code",
      "Agile Development",
      "Project Structuring",
    ],
    color: "from-indigo-500 to-blue-600",
    darkColor: "from-indigo-600 to-blue-800",
    accentColor: "indigo",
    accentHex: "#6366f1",
    darkAccentHex: "#4338ca",
  },
  {
    title: "Database & Integrations",
    description:
      "Effective data modeling, storage solutions, and third-party integrations for modern applications.",
    icon: Database,
    skills: ["MongoDB", "Firebase", "PostgreSQL", "Cloudinary", "Nodemailer"],
    color: "from-orange-500 to-amber-600",
    darkColor: "from-orange-600 to-amber-800",
    accentColor: "orange",
    accentHex: "#f97316",
    darkAccentHex: "#c2410c",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving app speed, responsiveness, and SEO using smart optimization strategies and tools.",
    icon: Zap,
    skills: [
      "Lazy Loading",
      "Code Splitting",
      "Caching",
      "Compression",
      "Responsive Design",
    ],
    color: "from-rose-500 to-red-600",
    darkColor: "from-rose-600 to-red-800",
    accentColor: "rose",
    accentHex: "#f43f5e",
    darkAccentHex: "#be123c",
  },
];

// Animated background elements
const FloatingParticle: FC<FloatingParticleProps> = ({
  delay = 0,
  size = "size-2",
  color = "bg-purple-500",
}) => (
  <motion.div
    className={`absolute ${size} rounded-full ${color} opacity-30 blur-sm`}
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -100],
      opacity: [0.3, 0],
    }}
    transition={{
      duration: Math.random() * 5 + 5,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Animated gradient blob
const GradientBlob: FC<GradientBlobProps> = ({
  position,
  size,
  colors,
  delay = 0,
}) => (
  <motion.div
    className={`absolute ${size} rounded-full blur-3xl opacity-20 bg-gradient-to-br ${colors}`}
    style={{ ...position }}
    animate={{
      scale: [1, 1.2, 1],
      x: [0, 30, 0],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Animated skill badge
const SkillBadge: FC<SkillBadgeProps> = ({
  skill,
  color,
  index,
  isHovered,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
        "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border",
        "shadow-sm hover:shadow-md",
        isHovered
          ? `border-${color}-300 dark:border-${color}-700 text-${color}-700 dark:text-${color}-300`
          : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
      )}
    >
      {skill}
    </motion.div>
  );
};

// Service card with 3D tilt effect
const ServiceCard: FC<ServiceCardProps> = ({ service, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate rotation based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className={cn(
          "h-full relative overflow-hidden group transition-all duration-500",
          "border-slate-200/50 dark:border-slate-800/50",
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md",
          "hover:shadow-2xl hover:shadow-purple-500/5 dark:hover:shadow-purple-800/5"
        )}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease",
        }}
      >
        {/* Animated gradient border */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "rounded-xl bg-gradient-to-r",
            service.color,
            "dark:" + service.darkColor
          )}
          style={{ padding: "1px" }}
        >
          <div className="w-full h-full rounded-xl bg-white/90 dark:bg-slate-900/90" />
        </div>

        {/* Service-specific pattern background */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H50 M10 30 H50 M10 50 H50 M30 10 V50' stroke='${encodeURIComponent(
              service.accentHex
            )}' strokeOpacity='0.3' fill='none' strokeWidth='1'/%3E%3Ccircle cx='10' cy='10' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='30' cy='10' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='50' cy='10' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='10' cy='30' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='30' cy='30' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='50' cy='30' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='10' cy='50' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='30' cy='50' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3Ccircle cx='50' cy='50' r='2' fill='${encodeURIComponent(
              service.accentHex
            )}' fillOpacity='0.3' /%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Colored gradient accent */}
        <div
          className={cn(
            "absolute top-0 left-0 h-1 w-full bg-gradient-to-r",
            service.color,
            "dark:" + service.darkColor
          )}
        />

        <div className="p-8 relative z-10 h-full flex flex-col">
          {/* Icon with 3D floating effect */}
          <div
            className="mb-6 relative"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.div
              animate={isHovered ? { y: [-5, 5, -5] } : { y: 0 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                  "bg-gradient-to-br",
                  service.color,
                  "dark:" + service.darkColor
                )}
              >
                <service.icon />
              </div>
              <div
                className={cn(
                  "absolute -inset-2 rounded-3xl opacity-30 blur-xl",
                  "bg-gradient-to-br",
                  service.color,
                  "dark:" + service.darkColor,
                  "transition-opacity duration-300",
                  isHovered ? "opacity-40" : "opacity-0"
                )}
              />
            </motion.div>
          </div>

          {/* Content with 3D effect */}
          <div style={{ transform: "translateZ(10px)" }}>
            <h3
              className={cn(
                "text-2xl font-bold mb-3 transition-colors duration-300",
                isHovered
                  ? `text-${service.accentColor}-600 dark:text-${service.accentColor}-400`
                  : "text-slate-900 dark:text-slate-100"
              )}
            >
              {service.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-auto" style={{ transform: "translateZ(15px)" }}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "w-1 h-5 rounded-full",
                    `bg-${service.accentColor}-500 dark:bg-${service.accentColor}-400`
                  )}
                />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Technologies
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.skills.slice(0, 6).map((skill, i) => (
                  <SkillBadge
                    key={i}
                    skill={skill}
                    color={service.accentColor}
                    index={i}
                    isHovered={isHovered}
                  />
                ))}
                {service.skills.length > 6 && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                      isHovered
                        ? `border-${service.accentColor}-300 dark:border-${service.accentColor}-700 text-${service.accentColor}-700 dark:text-${service.accentColor}-300`
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    +{service.skills.length - 6} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Learn more button */}
            <motion.div
              whileHover={{ x: 5 }}
              style={{ transform: "translateZ(20px)" }}
              className="flex items-center justify-between"
            >
              <Button
                variant="ghost"
                className={cn(
                  "group/btn p-0 h-auto hover:bg-transparent",
                  isHovered
                    ? `text-${service.accentColor}-600 dark:text-${service.accentColor}-400`
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                <span className="font-medium">Explore service</span>
                <ArrowRight
                  className={cn(
                    "ml-1.5 w-4 h-4 transition-transform duration-300",
                    isHovered ? "translate-x-1" : ""
                  )}
                />
              </Button>

              <motion.div
                whileHover={{ rotate: 45 }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "border transition-colors duration-300",
                  isHovered
                    ? `border-${service.accentColor}-300 dark:border-${service.accentColor}-700 text-${service.accentColor}-600 dark:text-${service.accentColor}-400`
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                )}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const MyProvideService: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Smooth scroll progress for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const cardsY = useTransform(smoothProgress, [0.1, 0.3], [100, 0]);
  const cardsOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-slate-950 dark:via-purple-950/10 dark:to-slate-950" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating gradient blobs */}
        <GradientBlob
          position={{ top: "10%", left: "5%" }}
          size="w-[500px] h-[500px]"
          colors="from-purple-500/10 to-fuchsia-500/10"
          delay={0}
        />
        <GradientBlob
          position={{ bottom: "10%", right: "5%" }}
          size="w-[600px] h-[600px]"
          colors="from-blue-500/10 to-cyan-500/10"
          delay={5}
        />
        <GradientBlob
          position={{ top: "40%", right: "20%" }}
          size="w-[400px] h-[400px]"
          colors="from-emerald-500/10 to-teal-500/10"
          delay={10}
        />

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={i % 3 === 0 ? "size-3" : i % 3 === 1 ? "size-2" : "size-1"}
            color={
              i % 5 === 0
                ? "bg-purple-500"
                : i % 5 === 1
                ? "bg-fuchsia-500"
                : i % 5 === 2
                ? "bg-blue-500"
                : i % 5 === 3
                ? "bg-cyan-500"
                : "bg-emerald-500"
            }
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with Parallax Effect */}
        <motion.div
          className="text-center mb-24"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/30 shadow-lg mb-8">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                What I Do
              </span>
            </div>
          </motion.div>

          {/* Title with gradient text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Services I Offer
            </span>
          </motion.h2>

          {/* Description with reveal animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed"
          >
            Comprehensive development solutions tailored to transform your ideas
            into exceptional digital experiences using modern technologies and
            best practices.
          </motion.p>
        </motion.div>

        {/* Services Grid with Staggered Animation */}
        <motion.div
          style={{ y: cardsY, opacity: cardsOpacity }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MyProvideService;
