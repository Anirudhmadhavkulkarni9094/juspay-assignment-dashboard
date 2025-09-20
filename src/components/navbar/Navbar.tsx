// components/Header.tsx
"use client";
import React from "react";
import { Search, Sun, Moon, RefreshCw, Bell, Layout } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({
  toggleSidebar,
  toggleRightSidebar,
}: {
  toggleSidebar: () => void;
  toggleRightSidebar: () => void;
}) {
  const { theme, resolvedTheme, toggleTheme, themeStyles } = useTheme();

  return (
    <header className={`w-full ${themeStyles.background} ${themeStyles.text} theme-transition`} aria-hidden={false}>
      <div className="mx-auto max-w-[1200px] px-6 py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle sidebar"
            className={`p-2 rounded-md hover:${themeStyles.muted} theme-transition`}
            onClick={toggleSidebar}
          >
            <Layout className={`w-4 h-4`} />
          </button>

          <span className="inline-flex items-center justify-center w-6 h-6 ">
            {/* favorite icon (kept neutral) */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.3l-5.2 3 1.4-6.1L3 9.8l6.4-.6L12 3l2.6 6.2 6.4.6-5.2 4.4 1.4 6.1z" stroke="currentColor" strokeWidth="0.6" />
            </svg>
          </span>

          <nav aria-label="Breadcrumb" className="flex items-center">
            <ol className="flex items-center gap-3 text-sm">
              <li>
                <Link href="#" className={ `${themeStyles.muted} over:underline`}>Dashboards</Link>
              </li>
              <li><span className=" ">/</span></li>
              <li>
                <span aria-current="page" className="inline-flex items-center rounded px-3 py-1 text-sm font-medium border border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
                  Default
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-2 shadow-sm w-64 theme-transition">
              <Search className="w-4 h-4 " />
              <input
                type="search"
                aria-label="Search"
                placeholder="Search"
                className="flex-1 text-sm placeholder-gray-300 outline-none bg-transparent text-current"
              />
              <span className={`text-xs text-black select-none`}>⌘/</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 theme-transition"
              onClick={toggleTheme}
              title={`Theme: ${theme} (resolved ${resolvedTheme})`}
            >
              {/* show sun for dark (meaning click to light), moon for light */}
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </button>

            <button type="button" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 theme-transition">
              <RefreshCw className="w-4 h-4 " />
            </button>

            <button type="button" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 theme-transition">
              <Bell className="w-4 h-4 " />
            </button>

            <button type="button" aria-label="Toggle right sidebar" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 theme-transition" onClick={toggleRightSidebar}>
              <Layout className="w-4 h-4 " />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
