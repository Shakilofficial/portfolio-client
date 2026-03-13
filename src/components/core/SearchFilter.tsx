"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  placeholder?: string;
  searchParam?: string;
  filterParam?: string;
  filterOptions?: { label: string; value: string }[];
  filterPlaceholder?: string;
}

export const SearchFilter = ({
  placeholder = "Search...",
  searchParam = "searchTerm",
  filterParam,
  filterOptions,
  filterPlaceholder = "Filter by",
}: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get(searchParam) || ""
  );
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchValue) {
      params.set(searchParam, debouncedSearchValue);
      params.set("page", "1"); // Reset to first page on search
    } else {
      params.delete(searchParam);
    }
    router.push(`?${params.toString()}`);
  }, [debouncedSearchValue, searchParam, router, searchParams]);

  const handleFilterChange = (value: string) => {
    if (!filterParam) return;
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(filterParam, value);
      params.set("page", "1");
    } else {
      params.delete(filterParam);
    }
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-9 pr-9 h-10 w-full bg-background border-primary/20 focus-visible:ring-primary/30"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {filterParam && filterOptions && (
        <Select
          defaultValue={searchParams.get(filterParam) || "all"}
          onValueChange={handleFilterChange}
        >
          <SelectTrigger className="w-full sm:w-[180px] h-10 border-primary/20">
            <SelectValue placeholder={filterPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
