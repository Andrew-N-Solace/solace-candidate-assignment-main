"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/app/hooks";
import ThemeToggle from "@/components/ThemeToggle";
import { SearchBar } from "./components/SearchBar";
import Table from "./components/Table";
import { useAdvocates } from "./hooks";

const LS_SIZE_KEY = "advocates_pageSize";
const LS_SEARCH_KEY = "advocates_search";

export default function AdvocatesPage() {
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const savedSearch = localStorage.getItem(LS_SEARCH_KEY);
    if (savedSearch) setSearch(savedSearch);

    const savedSize = Number(localStorage.getItem(LS_SIZE_KEY));
    if (savedSize) setPageSize(savedSize);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_SEARCH_KEY, search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem(LS_SIZE_KEY, String(pageSize));
  }, [pageSize]);

  const debounced = useDebounce(search, 300);
  const { data, isLoading, error } = useAdvocates(debounced, page, pageSize);

  useEffect(() => setPage(1), [debounced]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Solace Advocates</h1>
        <ThemeToggle />
      </header>

      <SearchBar value={search} onChange={setSearch} debounced={debounced} />

      <Table
        advocates={data?.data ?? []}
        loading={isLoading}
        error={error}
        page={page}
        pageSize={pageSize}
        total={data?.total ?? 0}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
          qc.invalidateQueries({ queryKey: ["advocates"] });
        }}
      />
    </main>
  );
}
