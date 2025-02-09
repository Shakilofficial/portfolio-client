"use client";
import express from "@/assets/icon/express.png";
import figma from "@/assets/icon/figma.svg";
import git from "@/assets/icon/git-icon.svg";
import github from "@/assets/icon/github-icon.svg";
import javaScript from "@/assets/icon/javascript.svg";
import jwt from "@/assets/icon/jwt-icon.svg";
import mongoose from "@/assets/icon/mogoose-icon.png";
import mongodb from "@/assets/icon/mongodb-icon.svg";
import nextjs from "@/assets/icon/nextjs-icon.svg";
import nodejs from "@/assets/icon/nodejs-icon-alt.svg";
import postman from "@/assets/icon/postman-icon.svg";
import react from "@/assets/icon/react.svg";
import redux from "@/assets/icon/redux.svg";
import tailwindcss from "@/assets/icon/tailwindcss-icon.svg";
import typescript from "@/assets/icon/typescript-icon.svg";
import zod from "@/assets/icon/zod.webp";
import { motion } from "framer-motion";
import Image from "next/image";
import { AuroraText } from "./magicui/aurora-text";

const skillsData = {
  Frontend: {
    skills: [
      { name: "React", icon: react },
      { name: "Next.js", icon: nextjs },
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javaScript },
      { name: "Tailwind CSS", icon: tailwindcss },
      { name: "Redux", icon: redux },
    ],
    description:
      "Building modern, responsive user interfaces with cutting-edge technologies",
    gradient:
      "from-[#242424] to-[#020202] hover:from-[#182135] hover:to-[#080808]",
    tagColor: "bg-blue-500 group-hover:bg-blue-400",
  },
  Backend: {
    skills: [
      { name: "Node.js", icon: nodejs },
      { name: "Express.js", icon: express },
      { name: "Mongoose", icon: mongoose },
      { name: "MongoDB", icon: mongodb },
      { name: "JWT", icon: jwt },
      { name: "Zod", icon: zod },
    ],
    description:
      "Creating robust server-side applications and APIs with scalable architecture",
    gradient:
      "from-[#050a0a] to-[#051818] hover:from-[#05070a] hover:to-[#0b1a3b]",
    tagColor: "bg-green-500 group-hover:bg-blue-600",
  },
  Tools: {
    skills: [
      { name: "Git", icon: git },
      { name: "Postman", icon: postman },
      { name: "Github", icon: github },
      { name: "Figma", icon: figma },
    ],
    description:
      "Utilizing industry-standard tools for efficient development workflow",
    gradient:
      "from-[#171c35] to-[#000000] hover:from-[#2b131e] hover:to-[#141414]",
    tagColor: "bg-purple-500 group-hover:bg-red-500",
  },
};

const Skills = () => {
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
            <AuroraText>Skills & Technologies</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-md:max-w-xs mx-auto">
          {Object.entries(skillsData).map(([category, data]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`group bg-gradient-to-t ${data.gradient} relative before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5 rounded-2xl border border-white/10`}
            >
              <div className="relative">
                <div className="px-6 py-5">
                  <div
                    className={`${data.tagColor} transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-white mb-1`}
                  >
                    {category}
                  </div>
                  <h3 className="text-lg font-semibold pt-2 text-slate-200 mb-3">
                    {category}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {data.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center bg-white/5 rounded-full px-3 py-1 transition-all duration-300 hover:bg-white/10"
                      >
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={16}
                          height={16}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-300">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
