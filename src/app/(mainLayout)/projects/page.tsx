"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import Pagination from "@/components/project/Pagination";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectFilter from "@/components/project/ProjectFilter";
import useProjectFilters from "@/components/project/useProjectFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";

const ProjectsPage = () => {
  const {
    category,
    setCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    limit,
    getQueryParams,
  } = useProjectFilters();

  const { data, error, isLoading } = useGetAllProjectsQuery(getQueryParams());

  const ProjectsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(limit)].map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full" />
      ))}
    </div>
  );

  return (
    <div className="w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12 my-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          <AuroraText>All Projects</AuroraText>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Check out my latest projects and showcases.
        </p>
      </div>
      <ProjectFilter
        category={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {isLoading ? (
        <ProjectsSkeleton />
      ) : error ? (
        <div>Error loading projects.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          {data?.data?.length === 0 && <div>No projects found.</div>}
          <Pagination
            currentPage={currentPage}
            totalPages={data?.meta?.totalPage || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
