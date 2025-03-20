import ManageProjects from "@/components/module/dashboard/projects/ManageProjects";
import { getAllProjects } from "@/services/projectService";

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllProjects(page);

  return (
    <div>
      <ManageProjects projects={data} meta={meta} />
    </div>
  );
};

export default ProjectsPage;
