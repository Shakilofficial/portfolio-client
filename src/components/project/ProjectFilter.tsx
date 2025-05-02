import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectFilterProps {
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const ProjectFilter = ({
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProjectFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Tabs for Categories */}
      <Tabs
        value={category}
        onValueChange={onCategoryChange}
        className="w-full sm:w-auto text-sm md:text-base"
      >
        <TabsList className="bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-700">
          <TabsTrigger
            value="all"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="fullstack"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Full Stack
          </TabsTrigger>
          <TabsTrigger
            value="frontend"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Frontend
          </TabsTrigger>
          <TabsTrigger
            value="backend"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Backend
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Sorting Dropdown */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-black border border-purple-300 dark:border-purple-700">
          <SelectItem
            value="default"
            className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          >
            Default
          </SelectItem>
          <SelectItem
            value="title-asc"
            className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          >
            Title (A-Z)
          </SelectItem>
          <SelectItem
            value="title-desc"
            className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          >
            Title (Z-A)
          </SelectItem>
          <SelectItem
            value="createdAt-desc"
            className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          >
            Newest First
          </SelectItem>
          <SelectItem
            value="createdAt-asc"
            className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          >
            Oldest First
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectFilter;
