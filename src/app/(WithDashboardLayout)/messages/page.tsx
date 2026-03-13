import ManageMasseges from "@/components/module/dashboard/masseges/ManageMasseges";
import { getAllMessages } from "@/services/messageService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Shakils Portfolio",
  description: "Manage your messages",
};

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; searchTerm: string }>;
}) => {
  const { page, searchTerm } = await searchParams;
  const { data, meta } = await getAllMessages(page, "10", searchTerm);
  return (
    <div>
      <ManageMasseges messages={data} meta={meta} />
    </div>
  );
};

export default MessagesPage;
