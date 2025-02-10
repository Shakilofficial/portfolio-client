import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogFilterProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const BlogFilter = ({ sortBy, onSortChange }: BlogFilterProps) => {
  return (
    <div className="flex flex-end">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] border-indigo-300 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-black border border-indigo-300 dark:border-indigo-700">
          <SelectItem
            value="default"
            className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
          >
            Default
          </SelectItem>
          <SelectItem
            value="title-asc"
            className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
          >
            Title (A-Z)
          </SelectItem>
          <SelectItem
            value="title-desc"
            className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
          >
            Title (Z-A)
          </SelectItem>
          <SelectItem
            value="createdAt-desc"
            className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
          >
            Newest First
          </SelectItem>
          <SelectItem
            value="createdAt-asc"
            className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
          >
            Oldest First
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlogFilter;
