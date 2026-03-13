import ManageBlogs from "@/components/module/dashboard/blog/ManageBlogs";
import { getAllBlogs } from "@/services/blogService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Shakils Portfolio",
  description: "Manage your blogs",
};

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; searchTerm: string; category: string }>;
}) => {
  const { page, searchTerm, category } = await searchParams;
  const { data, meta } = await getAllBlogs(page, "10", searchTerm, category);

  return (
    <div>
      <ManageBlogs blogs={data} meta={meta} />
    </div>
  );
};

export default BlogsPage;
