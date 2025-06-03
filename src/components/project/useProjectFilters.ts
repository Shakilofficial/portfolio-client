"use client";

import type { TQueryParam } from "@/types/global";
import { useCallback, useState } from "react";

const useProjectFilters = (initialLimit = 8) => {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(initialLimit);

  const getQueryParams = useCallback((): TQueryParam[] => {
    const params: TQueryParam[] = [
      { name: "page", value: currentPage },
      { name: "limit", value: limit },
    ];

    if (category !== "all") params.push({ name: "category", value: category });
    if (sortBy) {
      const [field, order] = sortBy.split("-");
      params.push({ name: "sortBy", value: field });
      params.push({ name: "sortOrder", value: order });
    }

    return params;
  }, [currentPage, limit, category, sortBy]);

  return {
    category,
    setCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    limit,
    getQueryParams,
  };
};

export default useProjectFilters;
