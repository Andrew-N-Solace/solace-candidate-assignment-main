"use client";

export default function AdvocatesLoading() {
  return (
    <div className="flex h-[60vh] items-center justify-center bg-surface text-text">
      <svg
        className="h-6 w-6 animate-spin text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" />
      </svg>
      <span className="ml-3 text-sm">Loading advocates…</span>
    </div>
  );
}
