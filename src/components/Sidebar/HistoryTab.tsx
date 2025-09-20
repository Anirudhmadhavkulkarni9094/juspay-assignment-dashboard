"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

type HistoryItem = {
  id: string | number;
  label: string;
  subtitle?: string;
  avatarSrc?: string; // optional avatar image
};

interface HistoryTabProps {
  favorites?: HistoryItem[];
  recent?: HistoryItem[];
  className?: string;
}

export default function HistoryTab({
  favorites = [],
  recent = [],
  className = "",
}: HistoryTabProps) {
  const [active, setActive] = React.useState<"favorites" | "recent">(
    favorites.length ? "favorites" : "recent"
  );
  const [hoveredId, setHoveredId] = React.useState<string | number | null>(
    null
  );

  const items = active === "favorites" ? favorites : recent;
    const { themeStyles } = useTheme();

  return (
    <div className={`w-full max-w-sm ${className} ${themeStyles.background} ${themeStyles.text}`} >
      {/* Tabs */}
      <div className="flex gap-6 items-center px-4 py-3">
        <button
          onClick={() => setActive("favorites")}
          className={`text-md font-medium ${
            active === "favorites"
              ?  "text-gray-200"
              : "text-gray-400"
          } focus:outline-none`}
          aria-pressed={active === "favorites"}
        >
          Favorites
        </button>

        <button
          onClick={() => setActive("recent")}
          className={`text-md font-medium ${
            active === "recent" ? "text-gray-200" : "text-gray-400"
          } focus:outline-none`}
          aria-pressed={active === "recent"}
        >
          Recently
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {items.length === 0 ? (
          <div className="text-sm ">No items</div>
        ) : (
          <ul className="space-y-5">
            {items.map((it) => (
              <li
                key={it.id}
                onMouseEnter={() => setHoveredId(it.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative"
              >
                <Link
                  href={it.label.toLowerCase()}
                  className="flex items-center gap-4 group"
                >
                  {/* small left marker: avatar or dot */}
                  <span className="w-3 h-3 flex-shrink-0 rounded-full  transition-colors" />

                  {/* label large like screenshot */}
                  <span className="text-sm font-normal ">
                    {it.label}
                  </span>
                </Link>

                {/* Tooltip on hover (positioned to left above the item like screenshot) */}
                {hoveredId === it.id && (
                  <div
                    className="absolute -left-28 -top-1 z-20 pointer-events-none"
                    style={{ transform: "translateX(-8px)" }}
                  >
                    <div className="px-2 py-1 rounded bg-gray-700 text-sm whitespace-nowrap shadow-lg">
                      {it.subtitle ?? it.label}
                    </div>
                    {/* little arrow triangle */}
                    <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-700 -ml-1" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
