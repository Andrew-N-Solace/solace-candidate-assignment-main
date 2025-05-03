"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const enabled = theme === "dark";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Switch
      checked={enabled}
      onChange={toggle}
      className={clsx(
        "relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
        enabled ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
      )}
    >
      {/* Knob */}
      <span
        className={clsx(
          "pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow transition duration-200",
          enabled ? "translate-x-6" : "translate-x-0.5"
        )}
      >
        {enabled ? (
          <MoonIcon className="h-5 w-5 translate-x-[3px] translate-y-[3px] text-indigo-600" />
        ) : (
          <SunIcon className="h-5 w-5 translate-x-[3px] translate-y-[3px] text-yellow-400" />
        )}
      </span>
      <span className="sr-only">Toggle theme</span>
    </Switch>
  );
}
