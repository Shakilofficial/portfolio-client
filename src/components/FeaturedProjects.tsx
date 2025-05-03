"use client";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";
import type { TQueryParam } from "@/types/global";
import { TProject } from "@/types/project.type";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Circle,
  Hexagon,
  Layers,
  Square,
  Triangle,
} from "lucide-react";
import Link from "next/link";
import Error from "./feedback/Error";
import GridSkeleton from "./feedback/GridSkeleton";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";
import FeaturedProjectCard from "./project/FeaturedProjectCard";

const FeaturedProjects = () => {
  const queryParams: TQueryParam[] = [
    { name: "isFeatured", value: true },
    { name: "sortBy", value: "createdAt" },
    { name: "sortOrder", value: "desc" },
    { name: "limit", value: 3 },
  ];

  const { isFetching, isLoading, isError, error, data } =
    useGetAllProjectsQuery(queryParams);

  if (isFetching || isLoading) {
    return <GridSkeleton />;
  }

  if (isError || error || !data?.data) {
    return <Error message="Featured Projects Not Found" />;
  }

  // Generate random positions for geometric shapes
  const generateRandomShapes = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      rotation: Math.random() * 360,
      shape: index % 5, // 0: hexagon, 1: triangle, 2: circle, 3: square, 4: layers
      opacity: Math.random() * 0.15 + 0.05,
    }));
  };

  const shapes = generateRandomShapes(15);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Blueprint grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4f46e5 1px, transparent 1px),
              linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="absolute transform transition-transform duration-[20000ms] ease-linear"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotation}deg)`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              animation: `float-${shape.id % 3} ${
                20 + (shape.id % 10)
              }s infinite ease-in-out`,
            }}
          >
            {shape.shape === 0 && (
              <Hexagon className="w-full h-full text-indigo-500" />
            )}
            {shape.shape === 1 && (
              <Triangle className="w-full h-full text-purple-500" />
            )}
            {shape.shape === 2 && (
              <Circle className="w-full h-full text-blue-500" />
            )}
            {shape.shape === 3 && (
              <Square className="w-full h-full text-violet-500" />
            )}
            {shape.shape === 4 && (
              <Layers className="w-full h-full text-fuchsia-500" />
            )}
          </div>
        ))}
      </div>

      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-[0.07] blur-3xl bg-gradient-to-br from-indigo-500 to-purple-500" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-[0.07] blur-3xl bg-gradient-to-br from-purple-500 to-fuchsia-500" />

      {/* Code pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.02]">
        <div className="absolute top-10 left-10 text-xs font-mono text-indigo-800 dark:text-indigo-200 whitespace-pre">
          {`function createProject() {
  const project = {
    title: "Amazing Project",
    technologies: ["React", "Next.js", "TypeScript"],
    features: ["Responsive", "Accessible", "Fast"],
    deploy: () => console.log("Deployed!")
  };
  return project;
}`}
        </div>
        <div className="absolute bottom-10 right-10 text-xs font-mono text-purple-800 dark:text-purple-200 whitespace-pre">
          {`const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
    });
  }, []);

  return (
    <div className="grid">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};`}
        </div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              My Projects
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <AuroraText>Featured Projects</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore my highlighted projects showcasing my latest work.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:md-0">
          {data?.data?.length > 0 ? (
            data?.data?.map((project: TProject) => (
              <FeaturedProjectCard key={project?._id} project={project} />
            ))
          ) : (
            <Error message="No featured projects found" />
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={"/projects"}>
            <ShinyButton className="flex items-center gap-2 text-purple-600 hover:text-rose-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 transition-all duration-300 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span>Explore All Projects</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </ShinyButton>
          </Link>
        </div>
      </div>

      {/* CSS for floating animations */}
      <style jsx global>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-5deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(20px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
