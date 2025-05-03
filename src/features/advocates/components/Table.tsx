"use client";

import { Fragment } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Advocate = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export default function Table({
  advocates,
  loading,
  error,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: {
  advocates: Advocate[];
  loading: boolean;
  error: unknown;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (n: number) => void;
  onPageSizeChange: (n: number) => void;
}) {
  if (loading) {
    return <p className="mt-6 text-text/70">Loading…</p>;
  }
  if (error) {
    return (
      <p className="mt-6 text-red-600 dark:text-red-400">
        {(error as Error).message ?? "Something went wrong"}
      </p>
    );
  }

  if (advocates.length === 0) {
    return <p className="mt-6 text-text/70">No results found.</p>;
  }

  return (
    <Fragment>
      <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="sticky top-0 bg-surface text-left text-xs font-semibold uppercase tracking-wider text-text/80">
            <tr>
              {[
                "First",
                "Last",
                "City",
                "Degree",
                "Specialties",
                "Yrs Exp",
                "Phone",
              ].map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {advocates.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-primary/5 dark:hover:bg-primary/10 even:bg-gray-50 dark:even:bg-gray-900/30"
              >
                <td className="px-4 py-2">{a.firstName}</td>
                <td className="px-4 py-2">{a.lastName}</td>
                <td className="px-4 py-2">{a.city}</td>
                <td className="px-4 py-2">{a.degree}</td>
                <td className="px-4 py-2 space-x-1">
                  {a.specialties?.map((s) => (
                    <span
                      key={s}
                      className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">{a.yearsOfExperience}</td>
                <td className="px-4 py-2">{a.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <label className="text-sm">
          Rows&nbsp;per&nbsp;page:&nbsp;
          <select
            className="rounded border border-gray-300 bg-surface px-1 py-0.5 dark:border-gray-600 dark:bg-surface"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[5, 10, 20, 25, 50, 100].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <nav className="flex items-center gap-2 text-text">
          <button
            className="btn flex items-center gap-1 disabled:opacity-40"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Prev
          </button>

          <span className="text-sm">
            Page <strong>{page}</strong> of {Math.ceil(total / pageSize) || 1}
          </span>

          <button
            className="btn flex items-center gap-1 disabled:opacity-40"
            disabled={page * pageSize >= total}
            onClick={() => onPageChange(page + 1)}
          >
            Next
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </Fragment>
  );
}
