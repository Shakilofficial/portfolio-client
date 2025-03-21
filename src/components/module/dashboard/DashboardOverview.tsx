/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatedCounter } from "@/components/core/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Code,
  FileText,
  Folder,
  Layers,
  MessageSquare,
  PieChart,
  Plus,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";

const DashboardOverview = ({ data }: { data: any }) => {
  const stats = [
    {
      title: "Total Skills",
      value: data.counts.skills,
      icon: Code,
      description: `${data.distributions.skills
        .map((s: any) => `${s.count} ${s.category}`)
        .join(", ")}`,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/skills",
    },
    {
      title: "Total Projects",
      value: data.counts.projects,
      icon: Folder,
      description: `${data.statusMetrics.featuredProjects} featured`,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      link: "/projects",
    },
    {
      title: "Total Blogs",
      value: data.counts.blogs,
      icon: FileText,
      description: `${data.statusMetrics.publishedBlogs} published, ${data.statusMetrics.featuredBlogs} featured`,
      color: "from-green-500 to-green-600",
      textColor: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/blogs",
    },
    {
      title: "Messages",
      value: data.counts.messages,
      icon: MessageSquare,
      description: "Unread messages",
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
      link: "/messages",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      frontend:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      backend:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      fullstack:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      Language:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "Tech Tutorials":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    };
    return (
      categories[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    );
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.div className="flex items-center justify-between" variants={item}>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
          Overview Dashboard
        </h1>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link href={stat.link}>
              <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full cursor-pointer hover:border-primary/40 transition-colors duration-300">
                <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <h3 className={`text-2xl font-bold ${stat.textColor}`}>
                        <AnimatedCounter value={stat.value} />
                      </h3>
                    </div>
                    <div className={`rounded-full p-2 ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Portfolio Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Skills by Category
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {data.distributions.skills.map(
                      (category: any, index: number) => (
                        <motion.div
                          key={index}
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex items-center justify-between text-sm">
                            <span>{category.category}</span>
                            <span className="font-medium">
                              {category.count}
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                              <motion.div
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-primary/70"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${
                                    (category.count / data.counts.skills) * 100
                                  }%`,
                                }}
                                transition={{
                                  duration: 1,
                                  ease: "easeOut",
                                  delay: 0.3 + index * 0.1,
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Projects by Category
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {data.distributions.projects.map(
                      (category: any, index: number) => (
                        <motion.div
                          key={index}
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex items-center justify-between text-sm">
                            <span className="capitalize">
                              {category.category}
                            </span>
                            <span className="font-medium">
                              {category.count}
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                              <motion.div
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  index % 2 === 0
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                    : "bg-gradient-to-r from-green-500 to-green-600"
                                }`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${
                                    (category.count / data.counts.projects) *
                                    100
                                  }%`,
                                }}
                                transition={{
                                  duration: 1,
                                  ease: "easeOut",
                                  delay: 0.5 + index * 0.1,
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Featured Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Featured Projects
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {data.statusMetrics.featuredProjects} of{" "}
                      {data.counts.projects}
                    </Badge>
                  </div>
                  <div className="space-y-2 mt-2">
                    {data.recentActivities.projects
                      .filter((project: any) => project.isFeatured)
                      .map((project: any, index: number) => (
                        <motion.div
                          key={project._id}
                          className="p-3 rounded-lg border bg-accent/30 hover:bg-accent/50 transition-colors duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-sm">
                                {project.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  className={getCategoryColor(project.category)}
                                >
                                  {project.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(project.createdAt)}
                                </span>
                              </div>
                            </div>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Published Blogs
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {data.statusMetrics.publishedBlogs} of {data.counts.blogs}
                    </Badge>
                  </div>
                  <div className="space-y-2 mt-2">
                    {data.recentActivities.blogs
                      .filter((blog: any) => blog.isPublished)
                      .map((blog: any, index: number) => (
                        <motion.div
                          key={blog._id}
                          className="p-3 rounded-lg border bg-accent/30 hover:bg-accent/50 transition-colors duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-sm">
                                {blog.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  className={getCategoryColor(blog.category)}
                                >
                                  {blog.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(blog.createdAt)}
                                </span>
                              </div>
                            </div>
                            {blog.isFeatured && (
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivities.messages
                .slice(0, 3)
                .map((message: any, index: number) => (
                  <motion.div
                    key={message._id}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-accent/30 hover:bg-accent/50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="relative h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium text-sm">
                        {message.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{message.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {message.message}
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {message.email}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              {data.counts.messages > 3 && (
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href="/messages">
                      <span>View All Messages</span>
                      <Plus className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/skills">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-purple-500/50 transition-all duration-300 relative z-10">
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <ShieldCheck className="h-8 w-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-medium">Manage Skills</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Add or update your skills
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/projects">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-blue-500/50 transition-all duration-300 relative z-10">
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <Briefcase className="h-8 w-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-medium">Manage Projects</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Add or update your projects
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/blogs">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-green-500/50 transition-all duration-300 relative z-10">
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <FileText className="h-8 w-8 text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-medium">Manage Blogs</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Create and publish blogs
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/experiences">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-orange-500/50 transition-all duration-300 relative z-10">
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <Briefcase className="h-8 w-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-medium">Manage Experiences</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Add your work experiences
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
