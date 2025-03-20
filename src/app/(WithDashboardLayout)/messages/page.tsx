import ManageMasseges from "@/components/module/dashboard/masseges/ManageMasseges";
import { getAllMessages } from "@/services/messageService";

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllMessages(page);
  return (
    <div>
      <ManageMasseges messages={data} meta={meta} />
    </div>
  );
};

export default MessagesPage;
