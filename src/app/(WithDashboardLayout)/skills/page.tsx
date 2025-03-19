import ManageSkills from "@/components/module/dashboard/skills/ManageSkills";
import { getAllSKills } from "@/services/skillService";

const SkillsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllSKills(page);

  return (
    <div>
      <ManageSkills skills={data} meta={meta} />
    </div>
  );
};

export default SkillsPage;
