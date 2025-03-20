import ManageBlogs from "@/components/module/dashboard/blog/ManageBlogs";
import { getAllBlogs } from "@/services/blogService";

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllBlogs(page);

  return (
    <div>
      <ManageBlogs blogs={data} meta={meta} />
    </div>
  );
};

export default BlogsPage;
