"use client";
import React from "react";
import map from "../../assets/Map.png";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

type Location = {
  id: string;
  name: string;
  coords: [number, number];
  value: number;
};

const locations: Location[] = [
  { id: "ny", name: "New York", coords: [-74.006, 40.7128], value: 72 },
  { id: "sf", name: "San Francisco", coords: [-122.4194, 37.7749], value: 39 },
  { id: "syd", name: "Sydney", coords: [151.2093, -33.8688], value: 25 },
  { id: "sg", name: "Singapore", coords: [103.8198, 1.3521], value: 61 },
];

export default function RevenueByLocation() {
  const max = Math.max(...locations.map((l) => l.value));
  const { themeStyles } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg ${themeStyles.card} ${themeStyles.text} ${themeStyles.border} theme-transition`}
    >
      <div className="text-lg font-medium mb-4">Revenue by Location</div>

      {/* Map */}
      <div className="h-36 w-full overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
        <Image
          src={map}
          alt="World map"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Location progress bars */}
      <div className="mt-3 space-y-3">
        {locations.map((loc) => (
          <div key={loc.id}>
            <div className="flex justify-between text-sm">
              <div className={themeStyles.muted}>{loc.name}</div>
              <div className="font-medium">{loc.value}K</div>
            </div>
            <div className="mt-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full">
              <div
                className="h-2 rounded-full bg-sky-400 dark:bg-sky-500 transition-all"
                style={{ width: `${(loc.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
