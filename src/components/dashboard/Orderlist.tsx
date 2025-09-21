// components/OrderList.tsx
"use client";

import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

type Order = {
  id: string;
  user: { name: string; avatar?: string | null };
  project: string;
  address: string;
  date: string; // friendly text
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
};

const SAMPLE_BASE: Omit<Order, "user">[] = [
  { id: "#CM9801", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9802", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9803", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9804", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9805", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
  { id: "#CM9806", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9807", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9808", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9809", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9810", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
  { id: "#CM9801", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9802", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9803", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9804", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9805", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
  { id: "#CM9806", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9807", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9808", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9809", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9810", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
  { id: "#CM9801", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9802", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9803", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9804", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9805", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
  { id: "#CM9806", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
  { id: "#CM9807", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
  { id: "#CM9808", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
  { id: "#CM9809", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved" },
  { id: "#CM9810", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
];

const SAMPLE_NAMES = [
  "Natali Craig",
  "Kate Morrison",
  "Drew Cano",
  "Orlondo Diggs",
  "Andi Lane",
  "Natalie Craig",
  "Kate Morrison",
  "Drew Cano",
  "Orlondo Diggs",
  "Andi Lane",
];

function getRandomAvatarUrl(seed?: number) {
  const id = seed ? ((seed % 70) + 1) : Math.floor(Math.random() * 70) + 1;
  return `https://i.pravatar.cc/150?img=${id}`;
}

function StatusPill({ status }: { status: Order["status"] }) {
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

export function Avatar({ name, src }: { name: string; src?: string | null }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <Image src={src} alt={name} width={32} height={32} className="object-cover w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 select-none font-medium bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-100">
      {initials}
    </div>
  );
}

export default function OrderList() {
  const { themeStyles } = useTheme();
  const [rows, setRows] = React.useState<Order[] | null>(null);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  React.useEffect(() => {
    const r: Order[] = SAMPLE_BASE.map((base, idx) => {
      const name = SAMPLE_NAMES[idx] ?? `User ${idx + 1}`;
      const avatar = getRandomAvatarUrl();
      return {
        id: base.id,
        user: { name, avatar },
        project: base.project,
        address: base.address,
        date: base.date,
        status: base.status,
      };
    });
    setRows(r);
  }, []);

  if (!rows) return null;

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

  const border = themeStyles.border;
  const card = themeStyles.card;
  const text = themeStyles.text;
  const muted = themeStyles.muted;

  return (
    <div className={` w-full p-4 border ${border} ${card} ${text} theme-transition`}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-lg">Order List</div>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search orders"
            className={`pl-8 pr-3 py-2 rounded-full text-sm w-56 focus:outline-none focus:ring-1 focus:ring-sky-300 bg-transparent border ${border} ${text}`}
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* table header */}
      <div className={`border-t ${border} border-b ${border}`}>
        <div className={`grid grid-cols-[48px_120px_200px_1fr_2fr_160px_140px] gap-4 items-center text-xs ${muted} py-3 px-2`}>
          <div className="pl-2">
            <input type="checkbox" onChange={toggleAll} checked={paged.length > 0 && paged.every((r) => selected[r.id])} />
          </div>
          <div>Order ID</div>
          <div>User</div>
          <div>Project</div>
          <div>Address</div>
          <div>Date</div>
          <div>Status</div>
        </div>
      </div>

      {/* rows */}
      <div>
        {paged.map((row) => (
          <div
            key={row.id}
            className={`grid grid-cols-[48px_120px_200px_1fr_2fr_160px_140px] gap-4 items-center py-3 px-2 transition-colors rounded ${card} hover:${muted} group`}
          >
            <div className="pl-2">
              <input type="checkbox" checked={!!selected[row.id]} onChange={() => toggleRow(row.id)} />
            </div>
            <div className="text-sm font-medium">{row.id}</div>
            <div className="flex items-center gap-3">
              <Avatar name={row.user.name} src={row.user.avatar} />
              <div className="text-sm font-medium">{row.user.name}</div>
            </div>
            <div className="text-sm">{row.project}</div>
            <div className={`text-sm ${muted}`}>{row.address}</div>
            <div className={`text-sm ${muted} flex items-center gap-2`}>
              <Calendar className="w-4 h-4" />
              <span>{row.date}</span>
            </div>
            <div>
              <StatusPill status={row.status} />
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className={`flex items-center justify-between mt-4 pt-3 border-t ${border}`}>
        <div className={`text-sm ${muted}`}>{filtered.length} results</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className={`px-3 py-1 rounded ${muted}`} disabled={page === 1}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const idx = i + 1;
            const active = idx === page;
            return (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`px-3 py-1 rounded ${active ? "bg-gray-200 dark:bg-slate-700 text-black dark:text-white" : muted}`}
              >
                {idx}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-3 py-1 rounded ${muted}`}
            disabled={page === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
