/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DetailsSkeleton from "@/components/feedback/DetailsSkeleton";
import Error from "@/components/feedback/Error";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleProjectQuery } from "@/redux/features/project/projectApi";
import { motion } from "framer-motion";
import { Calendar, Globe, Server } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaGithub } from "react-icons/fa6";

const ProjectDetailsPage = () => {
  const { id } = useParams();
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
  console.log(project);
  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] w-full mx-auto px-4 py-12 lg:py-20 mt-12 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            <AuroraText>{project?.title}</AuroraText>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {project?.subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-6 mb-8"
        >
          <div className="flex items-center text-sm sm:text-base bg-white/60 dark:bg-gray-900/60 px-4 py-2 rounded-full shadow-sm">
            <Calendar className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            <span>
              {new Date(project?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm sm:text-base bg-white/60 dark:bg-gray-900/60 px-4 py-2 rounded-full shadow-sm">
            <Server className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="capitalize">{project?.category}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-0 shadow-xl rounded-xl">
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={project?.coverImage || "/placeholder.svg"}
                alt={project?.title}
                fill
                className="object-cover"
                priority
              />
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
          <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project?.technologies?.map((tech: any) => (
              <Badge
                key={tech._id}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-900 shadow-sm"
              >
                {tech.icon && (
                  <div className="h-5 w-5 relative flex-shrink-0">
                    <Image
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                {tech.name}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-0 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-purple-800 dark:text-purple-300">
                Project Overview
              </h2>
              <div
                className="prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: project?.description }}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {project?.liveUrl && (
            <Button
              asChild
              size="lg"
              className="flex-1 mb-4 sm:mb-0 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link
                href={project?.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-2 h-5 w-5" />
                View Live Demo
              </Link>
            </Button>
          )}

          {project?.githubUrl && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30"
            >
              <Link
                href={project?.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
