import DashboardOverview from "@/components/module/dashboard/DashboardOverview";
import { getMetaData } from "@/services/metaService.ts";

const DashboardHomePage = async () => {
  const { data } = await getMetaData();
  console.log(data);

  return (
    <div>
      <DashboardOverview data={data} />
    </div>
  );
};

export default DashboardHomePage;
