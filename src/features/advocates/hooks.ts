import { useQuery } from "@tanstack/react-query";

export function useAdvocates(q: string, page = 1, size = 20) {
  return useQuery({
    queryKey: ["advocates", q, page, size],
    queryFn: async () => {
      const res = await fetch(
        `/api/advocates?q=${encodeURIComponent(
          q
        )}&page=${page}&pageSize=${size}`
      );
      if (!res.ok) throw new Error("Failed to fetch advocates");
      return res.json() as Promise<{
        data: any[];
        total: number;
        page: number;
        pageSize: number;
        isLoading: boolean;
      }>;
    },
  });
}
