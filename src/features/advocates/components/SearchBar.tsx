"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export function SearchBar({
  value,
  onChange,
  debounced,
}: {
  value: string;
  onChange: (s: string) => void;
  debounced: string;
}) {
  return (
    <section className="mt-8 space-y-2">
      <div className="relative w-full sm:max-w-md">
        <input
          placeholder="Search advocates by name, city, degree..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-gray-300 bg-surface
                     px-3 py-2 pr-10 shadow-sm focus:border-primary
                     dark:border-gray-600 dark:text-text dark:placeholder-gray-500"
        />
        <MagnifyingGlassIcon
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/70"
          aria-hidden="true"
        />
      </div>

      {debounced && (
        <p className="text-xs text-text/70">
          Searching for: <span className="font-semibold">{debounced}</span>
        </p>
      )}
    </section>
  );
}
