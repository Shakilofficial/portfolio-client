/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllExperiencesQuery } from "@/redux/features/experience/experienceApi";
import type { TQueryParam } from "@/types/global";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AuroraText } from "./magicui/aurora-text";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  const queryParams: TQueryParam[] = [
    { name: "sortBy", value: "startDate" },
    { name: "sortOrder", value: "desc" },
  ];

  const {
    data: experienceData,
    isLoading,
    isError,
  } = useGetAllExperiencesQuery(queryParams);

  const [activeExperience, setActiveExperience] = useState<number>(0);

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  if (isError || !experienceData) {
    return (
      <div className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load experience data
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const experiences = experienceData.data || [];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950/30 dark:to-slate-900/30"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Dotted pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              My Journey
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Professional Experience</AuroraText>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            My journey through various roles and organizations that have shaped
            my professional career
          </p>
        </motion.div>

        {experiences.length > 0 ? (
          <motion.div
            style={{ opacity, y }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12"
          >
            {/* Timeline navigation */}
            <div className="w-full lg:w-1/3">
              <div className="space-y-4 sticky top-24">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setActiveExperience(index)}
                    className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                      activeExperience === index
                        ? "bg-white dark:bg-slate-900/90 shadow-lg border border-purple-200/50 dark:border-purple-800/30 backdrop-blur-sm"
                        : "bg-slate-50/80 dark:bg-slate-900/50 hover:bg-white/90 dark:hover:bg-slate-900/70 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/30 hover:shadow-md backdrop-blur-sm"
                    }`}
                  >
                    {/* Vertical timeline connector */}
                    {index !== experiences.length - 1 && (
                      <div
                        className={`absolute left-[25px] top-[52px] bottom-[-20px] w-0.5 ${
                          activeExperience === index ||
                          activeExperience === index + 1
                            ? "bg-gradient-to-b from-purple-500 to-indigo-500"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <div
                        className={`relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                          activeExperience === index
                            ? "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-900 shadow-md shadow-purple-500/20"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-purple-200 dark:group-hover:border-purple-800/30"
                        }`}
                      >
                        {exp.companyLogo ? (
                          <Image
                            src={exp.companyLogo || "/placeholder.svg"}
                            alt={exp.company}
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <Briefcase
                            className={`w-5 h-5 ${
                              activeExperience === index
                                ? "text-purple-500 dark:text-purple-400"
                                : "text-slate-500 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400"
                            } transition-colors duration-300`}
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3
                          className={`font-medium text-sm sm:text-base line-clamp-1 transition-colors duration-300 ${
                            activeExperience === index
                              ? "text-slate-900 dark:text-slate-100"
                              : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <p
                          className={`text-xs line-clamp-1 transition-colors duration-300 ${
                            activeExperience === index
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                          }`}
                        >
                          {exp.position}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          activeExperience === index
                            ? "text-purple-500 dark:text-purple-400 opacity-100"
                            : "text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience details */}
            <div className="w-full lg:w-2/3">
              {experiences.length > 0 && (
                <motion.div
                  key={experiences[activeExperience]._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />

                  {/* Top colored bar */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-blue-500" />

                  <div className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {experiences[activeExperience].position}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                            {experiences[activeExperience].companyLogo ? (
                              <Image
                                src={
                                  experiences[activeExperience].companyLogo ||
                                  "/placeholder.svg"
                                }
                                alt={experiences[activeExperience].company}
                                fill
                                sizes="28px"
                                className="object-contain p-0.5"
                              />
                            ) : (
                              <Building2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            )}
                          </div>
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            {experiences[activeExperience].company}
                          </p>
                          {experiences[activeExperience].companyUrl && (
                            <Link
                              href={experiences[activeExperience].companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                      <div>
                        {experiences[activeExperience].isCurrent && (
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:from-green-200 hover:to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 border-0 px-3 py-1">
                            <span className="relative flex h-2 w-2 mr-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Current Position
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8 p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-100/80 dark:border-slate-800/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100/80 dark:bg-purple-900/20">
                          <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>
                          {new Date(
                            experiences[activeExperience].startDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {experiences[activeExperience].endDate
                            ? new Date(
                                experiences[activeExperience].endDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })
                            : "Present"}
                        </span>
                      </div>
                      {experiences[activeExperience].location && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100/80 dark:bg-blue-900/20">
                            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span>{experiences[activeExperience].location}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      {experiences[activeExperience].description && (
                        <div className="rounded-xl p-6 bg-gradient-to-br from-purple-50/50 to-slate-50/50 dark:from-purple-900/10 dark:to-slate-900/10 border border-purple-100/50 dark:border-purple-800/20">
                          <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center shadow-sm">
                              <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            Overview
                          </h4>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
                            {experiences[activeExperience].description}
                          </p>
                        </div>
                      )}

                      {experiences[activeExperience].responsibilities &&
                        experiences[activeExperience].responsibilities.length >
                          0 && (
                          <div className="rounded-xl p-6 bg-gradient-to-br from-blue-50/50 to-slate-50/50 dark:from-blue-900/10 dark:to-slate-900/10 border border-blue-100/50 dark:border-blue-800/20">
                            <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-3 pl-11">
                              {experiences[
                                activeExperience
                              ].responsibilities.map(
                                (responsibility: any, idx: number) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: idx * 0.05,
                                    }}
                                    className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                                  >
                                    <Star
                                      className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0"
                                      fill="currentColor"
                                      strokeWidth={0}
                                    />
                                    <span>{responsibility}</span>
                                  </motion.li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      {experiences[activeExperience].technologies &&
                        experiences[activeExperience].technologies.length >
                          0 && (
                          <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-50/50 to-slate-50/50 dark:from-emerald-900/10 dark:to-slate-900/10 border border-emerald-100/50 dark:border-emerald-800/20">
                            <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center shadow-sm">
                                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2 pl-11">
                              {experiences[activeExperience].technologies.map(
                                (tech: any, idx: number) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: idx * 0.03,
                                    }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/70 px-3 py-1 shadow-sm"
                                    >
                                      {tech}
                                    </Badge>
                                  </motion.div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Call to action */}
                    {experiences[activeExperience].companyUrl && (
                      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800/50 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-sm"
                          asChild
                        >
                          <Link
                            href={experiences[activeExperience].companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Visit Company</span>
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/50 dark:border-slate-800/50">
            <Briefcase className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              No experience data available
            </p>
            <Button variant="outline" className="mt-4">
              Add Experience
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceSkeleton = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
