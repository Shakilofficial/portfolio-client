"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { TProject } from "@/types/project.type";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface ProjectCardProps {
  project: TProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="h-full group"
    >
      <Card className="h-full flex flex-col overflow-hidden border border-purple-100/50 dark:border-purple-800/20 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:border-purple-500/30 transition-all duration-500 rounded-3xl">
        {/* Clickable Area (Link to Details) */}
        <Link href={`/projects/${project?._id}`} className="block flex-grow relative cursor-pointer">
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={project?.coverImage || "/placeholder.svg"}
              alt={project?.title || "Project Image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

            {/* View Details Indicator (Visible on Hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <span>Project Specs</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
              {project?.isFeatured && (
                <Badge className="bg-amber-500 text-white text-[10px] font-black px-3 py-1 flex items-center gap-1.5 shadow-lg border-0 uppercase tracking-widest rounded-full">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </Badge>
              )}
            </div>
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-purple-600 dark:text-purple-400 text-[10px] font-black px-3 py-1 border-0 uppercase tracking-widest rounded-full shadow-lg">
                {project?.category}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6 md:p-8 flex flex-col h-full bg-transparent">
            <h3 className="mb-3 text-2xl font-black text-slate-900 dark:text-white leading-tight font-serif group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              {project?.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
              {project?.subtitle}
            </p>

            {/* Tech Stack Bubbles */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project?.technologies?.slice(0, 3).map((tech) => (
                <div
                  key={tech._id}
                  className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700/50 transition-all group-hover:border-purple-500/20"
                >
                  {tech.icon && (
                    <div className="h-3.5 w-3.5 relative flex-shrink-0">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                    {tech.name}
                  </span>
                </div>
              ))}
              {project?.technologies?.length > 3 && (
                <div className="bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700/50 text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase">
                  +{project?.technologies?.length - 3}
                </div>
              )}
            </div>
          </CardContent>
        </Link>

        {/* Footer Area with External Links */}
        <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between gap-3 relative z-30">
          <div className="flex items-center gap-2 flex-grow">
            {project?.githubUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="flex-1 bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all h-9"
              >
                <Link
                  href={project?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  Code
                </Link>
              </Button>
            )}

            {project?.liveUrl && (
              <Button
                asChild
                variant="default"
                size="sm"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl shadow-lg shadow-purple-500/10 h-9"
              >
                <Link
                  href={project?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Live
                </Link>
              </Button>
            )}
          </div>

          <Link href={`/projects/${project?._id}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:text-purple-500 transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
