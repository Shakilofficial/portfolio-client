"use client";

import Error from "@/components/feedback/Error";
import Loader from "@/components/feedback/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { useGetAllMessageQuery } from "@/redux/features/message/messageApi";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";
import type { TBlog } from "@/types/blog.type";
import type { TMessage } from "@/types/message.type";
import type { TProject } from "@/types/project.type";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";

const AdminDashboardPage = () => {
  const {
    isFetching: projectFetching,
    isLoading: projectsLoading,
    data: projectsData,
    error: projectsError,
  } = useGetAllProjectsQuery(undefined);

  const {
    isFetching: blogFetching,
    isLoading: blogsLoading,
    data: blogsData,
    error: blogsError,
  } = useGetAllBlogsQuery(undefined);

  const {
    isFetching: messageFetching,
    isLoading: messagesLoading,
    data: messagesData,
    error: messagesError,
  } = useGetAllMessageQuery(undefined);

  if (
    projectFetching ||
    blogFetching ||
    messageFetching ||
    projectsLoading ||
    blogsLoading ||
    messagesLoading
  ) {
    return <Loader />;
  }

  if (projectsError || blogsError || messagesError) {
    return <Error />;
  }

  const totalProjects = projectsData?.meta?.total || 0;
  const totalBlogs = blogsData?.meta?.total || 0;
  const totalMessages = messagesData?.meta?.total || 0;

  const featuredProjects =
    projectsData?.data?.filter((project: TProject) => project?.isFeatured)
      .length || 0;
  const publishedBlogs =
    blogsData?.data?.filter((blog: TBlog) => blog?.isPublished).length || 0;

  const projectCategories = projectsData?.data?.reduce(
    (acc: Record<string, number>, project: TProject) => {
      if (!project?.isDeleted) {
        acc[project?.category] = (acc[project?.category] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          icon={Briefcase}
          trend={8}
        />
        <StatsCard
          title="Total Blogs"
          value={totalBlogs}
          icon={FileText}
          trend={12}
        />
        <StatsCard
          title="Total Messages"
          value={totalMessages}
          icon={MessageSquare}
          trend={-3}
        />
        <StatsCard
          title="Featured Projects"
          value={featuredProjects}
          icon={Users}
          trend={5}
        />
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="text-xs md:text-lg max-w-[380px] md:max-w-screen-md bg-purple-950/20 text-gray-500">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(projectCategories || {}).map(
                  ([category, count]) => (
                    <li
                      key={category}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="font-medium">Published</span>
                <span className="text-muted-foreground">{publishedBlogs}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Drafts</span>
                <span className="text-muted-foreground">
                  {totalBlogs - publishedBlogs}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {messagesData?.data?.slice(0, 5).map((message: TMessage) => (
                  <li
                    key={message?._id}
                    className="text-sm px-2 py-1 rounded-md shadow-sm bg-purple-950/20"
                  >
                    <span className="font-medium">{message?.name}</span>:{" "}
                    {message?.message?.substring(0, 50)}...
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  trend: number;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {trend > 0 ? (
          <span className="text-green-600 flex items-center">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            {trend}% from last month
          </span>
        ) : (
          <span className="text-red-600 flex items-center">
            <ArrowDownRight className="h-4 w-4 mr-1" />
            {Math.abs(trend)}% from last month
          </span>
        )}
      </p>
    </CardContent>
  </Card>
);

export default AdminDashboardPage;
