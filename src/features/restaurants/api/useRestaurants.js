import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../../shared/api/client";

export function useRestaurants(searchText) {
  return useInfiniteQuery({
    queryKey: ["restaurants", { q: searchText }],
    queryFn: ({ pageParam = 1 }) =>
      get("/restaurants", {
        params: { name: searchText || "", page: pageParam },
      }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage || {};
      if (!pagination) return false;
      const { current_page, last_page } = pagination;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((p) => ({
          ...p,
          items: p.data,
          pagination: p.pagination,
        })),
      };
    },
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    keepPreviousData: true,
    retry: 2,
  });
}
