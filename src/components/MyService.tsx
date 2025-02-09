"use client";
import { motion } from "framer-motion";
import { Code, Palette, Server } from "lucide-react";
import { AuroraText } from "./magicui/aurora-text";
import { NeonGradientCard } from "./magicui/neon-gradient-card";

const services = [
  {
    title: "Full-Stack Development",
    description: "Custom web applications tailored to your business needs.",
    icon: Code,
  },
  {
    title: "Frontend Development",
    description:
      "Beautiful and responsive user interfaces for your applications.",
    icon: Palette,
  },
  {
    title: "Backend Development",
    description:
      "Robust and scalable server-side solutions for your applications.",
    icon: Server,
  },
];

const MyService = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <AuroraText>Services I Offer</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Providing professional services tailored to meet diverse project
            needs.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <NeonGradientCard
              key={index}
              className="max-w-sm items-center justify-center text-center"
            >
              <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#ae00ffbd] bg-clip-text text-center leading-none tracking-tighter dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                <service.icon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </span>
            </NeonGradientCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyService;
