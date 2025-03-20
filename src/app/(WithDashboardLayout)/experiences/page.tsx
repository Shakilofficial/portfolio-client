import ManageExperience from "@/components/module/dashboard/experiences/ManageExperience";
import { getAllExperiences } from "@/services/experienceService";

const ExperiencesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllExperiences(page);

  return (
    <div>
      <ManageExperience experiences={data} meta={meta} />
    </div>
  );
};

export default ExperiencesPage;
