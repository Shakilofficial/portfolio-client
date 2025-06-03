
"use client";

import type { TQueryParam } from "@/types/global";
import { useCallback, useState } from "react";

export const useBlogFilters = (initialLimit = 12) => {
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(initialLimit);

  const getQueryParams = useCallback((): TQueryParam[] => {
    const params: TQueryParam[] = [
      { name: "isPublished", value: true },
      { name: "page", value: currentPage },
      { name: "limit", value: limit },
    ];

    if (sortBy) {
      const [field, order] = sortBy.split("-");
      params.push({ name: "sortBy", value: field });
      params.push({ name: "sortOrder", value: order });
    }

    if (search.trim()) {
      params.push({ name: "search", value: search.trim() });
    }

    return params;
  }, [currentPage, limit, sortBy, search]);

  return {
    sortBy,
    setSortBy,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    limit,
    getQueryParams,
  };
};
