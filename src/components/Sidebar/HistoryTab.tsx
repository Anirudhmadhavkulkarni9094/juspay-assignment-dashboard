"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

type HistoryItem = {
  id: string | number;
  label: string;
  subtitle?: string;
  avatarSrc?: string;
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

  // themeStyles keys: background, card, text, muted, border
  const containerBg = themeStyles?.background || "";
  const containerText = themeStyles?.text || "";
  const cardBg = themeStyles?.card || "bg-white";
  const muted = themeStyles?.muted || "text-gray-500";
  const border = themeStyles?.border || "border-gray-200";

  // small helper classes derived from theme values
  const activeTabClass = `${containerText} font-medium`;
  const inactiveTabClass = `${muted} font-medium`;
  const markerClass = `${containerText} opacity-80`; // uses text color for accent (keeps consistent)

  return (
    <div className={`w-full max-w-sm ${className} ${containerBg} ${containerText}`}>
      {/* Tabs */}
      <div className={`flex gap-6 items-center px-4 py-3 ${border ? "border-b " + border : ""}`}>
        <button
          onClick={() => setActive("favorites")}
          className={`text-md focus:outline-none ${
            active === "favorites" ? activeTabClass : inactiveTabClass
          }`}
          aria-pressed={active === "favorites"}
        >
          Favorites
        </button>

        <button
          onClick={() => setActive("recent")}
          className={`text-md focus:outline-none ${
            active === "recent" ? activeTabClass : inactiveTabClass
          }`}
          aria-pressed={active === "recent"}
        >
          Recently
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {items.length === 0 ? (
          <div className={`${muted} text-sm`}>No items</div>
        ) : (
          <ul className="space-y-5">
            {items.map((it) => (
              <li
                key={it.id}
                onMouseEnter={() => setHoveredId(it.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative"
              >
                <Link href={String(it.label).toLowerCase()} className="flex items-center gap-4 group">
                  {/* small left marker: avatar or dot */}
                  <span
                    className={`w-3 h-3 flex-shrink-0 rounded-full transition-colors ${markerClass}`}
                    aria-hidden
                  />

                  {/* label */}
                  <span className="text-sm font-normal">{it.label}</span>
                </Link>

                {/* Tooltip on hover (positioned to left above the item) */}
                {hoveredId === it.id && (
                  <div
                    className="absolute -left-28 -top-1 z-20 pointer-events-none flex items-center"
                    style={{ transform: "translateX(-8px)" }}
                  >
                    <div className={`px-2 py-1 rounded ${cardBg} ${containerText} whitespace-nowrap shadow-lg`}>
                      {it.subtitle ?? it.label}
                    </div>

                    {/* rotated square used as arrow to match the same card background reliably */}
                    <div
                      className={`w-3 h-3 ${cardBg} transform rotate-45 -ml-1`}
                      aria-hidden
                      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.12)" }}
                    />
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
