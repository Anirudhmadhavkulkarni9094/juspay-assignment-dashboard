// components/OrderList.tsx
"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

type Order = {
  id: string;
  user: { name: string; avatar?: string };
  project: string;
  address: string;
  date: string; // friendly text
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
};

const SAMPLE: Order[] = [
  { id: "#CM9801", user: { name: "Natali Craig" }, project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9802", user: { name: "Kate Morrison" }, project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9803", user: { name: "Drew Cano" }, project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9804", user: { name: "Orlondo Diggs" }, project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9805", user: { name: "Andi Lane" }, project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
  // (kept the rest of sample items)
  { id: "#CM9806", user: { name: "Natalie Craig" }, project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9807", user: { name: "Kate Morrison" }, project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9808", user: { name: "Drew Cano" }, project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9809", user: { name: "Orlondo Diggs" }, project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9810", user: { name: "Andi Lane" }, project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
];

function StatusPill({ status }: { status: Order["status"] }) {
  // full literal Tailwind classes so JIT picks them up
  const colorDot: Record<Order["status"], string> = {
    "In Progress": "bg-indigo-500",
    Complete: "bg-emerald-500",
    Pending: "bg-sky-500",
    Approved: "bg-amber-400",
    Rejected: "bg-rose-500",
  };

  const colorText: Record<Order["status"], string> = {
    "In Progress": "text-indigo-600",
    Complete: "text-emerald-600",
    Pending: "text-sky-600",
    Approved: "text-amber-600",
    Rejected: "text-rose-600",
  };

  return (
    <span className="inline-flex items-center text-sm font-medium select-none">
      <span className={`w-2.5 h-2.5 rounded-full mr-2 ${colorDot[status]}`} />
      <span className={`${colorText[status]}`}>{status}</span>
    </span>
  );
}

export default function OrderList() {
  const { themeStyles } = useTheme();
  const [rows] = React.useState<Order[]>(SAMPLE);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const filtered = rows.filter(
    (r) =>
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.user.name.toLowerCase().includes(query.toLowerCase()) ||
      r.project.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleRow(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }
  function toggleAll() {
    const allOn = paged.every((r) => selected[r.id]);
    const copy = { ...selected };
    paged.forEach((r) => {
      copy[r.id] = !allOn;
    });
    setSelected(copy);
  }

  return (
    <div className={`rounded-lg w-full p-4 border ${themeStyles.border} ${themeStyles.card} ${themeStyles.text} theme-transition`}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-lg">Order List</div>

        {/* toolbar: actions + search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded ${themeStyles.muted}`} title="Add" aria-label="Add">
              <svg className={`w-4 h-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <button className={`p-2 rounded ${themeStyles.muted}`} title="Filter" aria-label="Filter">
              <svg className={`w-4 h-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M7 11h10M10 17h4" />
              </svg>
            </button>

            <button className={`p-2 rounded ${themeStyles.muted}`} title="Sort" aria-label="Sort">
              <svg className={`w-4 h-4 `} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6h12M3 12h18M3 18h6" />
              </svg>
            </button>
          </div>

          <div className={`relative`}>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search orders"
              className={`pl-8 pr-3 py-2 rounded-full text-sm w-56 focus:outline-none focus:ring-1 focus:ring-sky-300 bg-transparent border ${themeStyles.border} ${themeStyles.text}`}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* table header */}
      <div className={`border-t ${themeStyles.border} border-b ${themeStyles.border}`}>
        <div className="grid grid-cols-[48px_200px_1fr_2fr_160px_140px_64px] gap-4 items-center text-xs text-gray-400 py-3 px-2">
          <div className="pl-2">
            <input
              type="checkbox"
              onChange={toggleAll}
              checked={paged.length > 0 && paged.every((r) => selected[r.id])}
            />
          </div>
          <div>User</div>
          <div>Project</div>
          <div>Address</div>
          <div>Date</div>
          <div>Status</div>
          <div className="text-right pr-2">Actions</div>
        </div>
      </div>

      {/* rows */}
      <div>
        {paged.map((row) => (
          <div
            key={row.id}
            className={`grid grid-cols-[48px_200px_1fr_2fr_160px_140px_64px] gap-4 items-center py-3 px-2 transition-colors rounded ${themeStyles.card} hover:${themeStyles.muted} group`}
          >
            <div className="pl-2">
              <input type="checkbox" checked={!!selected[row.id]} onChange={() => toggleRow(row.id)} />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-200">
                {row.user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="text-sm font-medium">{row.user.name}</div>
            </div>

            <div className="text-sm">{row.project}</div>
            <div className="text-sm text-gray-500">{row.address}</div>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{row.date}</span>
            </div>

            <div>
              <StatusPill status={row.status} />
            </div>

            <div className="text-right pr-2">
              <button className={`p-1 rounded ${themeStyles.muted}`} aria-label="Go">
                <svg className={`w-4 h-4 `} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* footer: pagination */}
      <div className={`flex items-center justify-between mt-4 pt-3 border-t ${themeStyles.border}`}>
        <div className="text-sm text-gray-500">{filtered.length} results</div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-3 py-1 rounded ${themeStyles.muted}`}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className={`w-4 h-4 `} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const idx = i + 1;
            const active = idx === page;
            return (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`px-3 py-1 rounded ${active ? "bg-gray-200 dark:bg-slate-700 text-black dark:text-white" : `${themeStyles.muted}`}`}
                aria-current={active ? "page" : undefined}
              >
                {idx}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-3 py-1 rounded ${themeStyles.muted}`}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className={`w-4 h-4 `} />
          </button>
        </div>
      </div>
    </div>
  );
}
