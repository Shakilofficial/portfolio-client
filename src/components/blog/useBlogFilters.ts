"use client";

import type { TQueryParam } from "@/types/global";
import { useCallback, useState } from "react";

export const useBlogFilters = (initialLimit = 9) => {
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(initialLimit);

  const getQueryParams = useCallback((): TQueryParam[] => {
    const params: TQueryParam[] = [
      { name: "page", value: currentPage },
      { name: "limit", value: limit },
    ];

    if (sortBy) {
      const [field, order] = sortBy.split("-");
      params.push({ name: "sortBy", value: field });
      params.push({ name: "sortOrder", value: order });
    }

    return params;
  }, [currentPage, limit, sortBy]);

  return {
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    limit,
    getQueryParams,
  };
};
