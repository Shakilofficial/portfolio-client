/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DetailsSkeleton from "@/components/feedback/DetailsSkeleton";
import Error from "@/components/feedback/Error";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleProjectQuery } from "@/redux/features/project/projectApi";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ExternalLink, Globe, Server } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa6";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: project,
  } = useGetSingleProjectQuery(id as string);

  if (isFetching || isLoading) {
    return <DetailsSkeleton />;
  }

  if (isError || error) {
    return <Error message="Error loading project details" />;
  }

  if (!project) {
    return <Error message="Project not found" />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
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

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[100px]"
          style={{
            animation: "float 15s ease-in-out infinite alternate",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-[100px]"
          style={{
            animation: "float 20s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* Back button */}
      <div className="fixed top-24 left-4 z-10 md:left-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black/90"
          >
            <Link href="/projects" className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto py-28 px-4 md:px-6 lg:px-8 flex flex-col gap-12">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-8 sticky top-0 z-10 pt-8 pb-4 bg-gradient-to-b from-background via-background to-transparent"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              <AuroraText>{project?.title}</AuroraText>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
              {project?.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <div className="flex items-center text-sm sm:text-base bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Calendar className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              <span>
                {new Date(project?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm sm:text-base bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Server className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              <span className="capitalize">{project?.category}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border border-white/10 backdrop-blur-sm shadow-xl rounded-xl group">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src={
                  project?.coverImage ||
                  "/placeholder.svg?height=500&width=1000"
                }
                alt={project?.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Card>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
            </span>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project?.technologies?.map((tech: any, index: number) => (
              <motion.div
                key={tech._id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-gray-900 transition-colors duration-300"
                >
                  {tech.icon && (
                    <div className="h-5 w-5 relative flex-shrink-0">
                      <Image
                        src={tech.icon || "/placeholder.svg?height=20&width=20"}
                        alt={tech.name}
                        fill
                        className="object-contain"
                        sizes="20px"
                      />
                    </div>
                  )}
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
            <CardContent className="p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-purple-800 dark:text-purple-300 flex items-center">
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </span>
                Project Overview
              </h2>
              <div
                className="prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-img:rounded-xl prose-headings:text-purple-800 dark:prose-headings:text-purple-300 prose-a:text-purple-600 dark:prose-a:text-purple-400"
                dangerouslySetInnerHTML={{ __html: project?.description }}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          {project?.liveUrl && (
            <Button
              asChild
              size="lg"
              className="flex-1 mb-4 sm:mb-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link
                href={project?.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-6"
              >
                <Globe className="mr-2 h-5 w-5" />
                View Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          {project?.githubUrl && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link
                href={project?.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-6"
              >
                <FaGithub className="mr-2 h-5 w-5" />
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
