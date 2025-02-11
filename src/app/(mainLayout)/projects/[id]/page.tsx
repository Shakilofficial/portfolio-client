"use client";
import DetailsSkeleton from "@/components/feedback/DetailsSkeleton";
import Error from "@/components/feedback/Error";

import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleProjectQuery } from "@/redux/features/project/projectApi";
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

  return (
    <div className="max-w-4xl mx-auto px-4 my-16 sm:my-24 py-8">
      {/* Project Title and Subtitle for larger screens */}
      <div className=" mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          <AuroraText>{project?.title}</AuroraText>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
          {project?.subtitle}
        </p>
      </div>

      {/* Project Info */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-sm sm:text-base">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{new Date(project?.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm sm:text-base">
          <Server className="w-5 h-5 mr-2" />
          <span>{project?.category}</span>
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project?.technologies?.map((tech, index) => (
          <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Project Image */}
      <Card className="mb-12 overflow-hidden">
        <Image
          src={project?.coverImage}
          alt={project?.title}
          width={1200}
          height={675}
          className="w-full object-cover rounded-md"
        />
      </Card>

      {/* Project Overview */}
      <CardContent className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Project Overview
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {project?.description}
        </p>
      </CardContent>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="flex-1 mb-4 sm:mb-0">
          <Link href={project?.liveUrl}>
            <Globe className="mr-2 h-5 w-5" />
            View Live Demo
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="flex-1">
          <Link href={project?.githubUrl}>
            <FaGithub className="mr-2 h-5 w-5" />
            View on GitHub
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
