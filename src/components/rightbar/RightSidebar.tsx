"use client";

import React from "react";
import Image from "next/image";
import { Bell, Clock, UserCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type NotificationItem = {
  id: string | number;
  title: string;
  detail?: string;
  timeAgo?: string; // "Just now", "12 hours ago", etc
  icon?: React.ReactNode;
};

type ActivityItem = {
  id: string | number;
  avatarUrl?: string;
  title: string;
  timeAgo?: string;
};

type ContactItem = {
  id: string | number;
  name: string;
  avatarUrl?: string;
  role?: string;
};

interface RightSidebarProps {
  notifications?: NotificationItem[];
  activities?: ActivityItem[];
  contacts?: ContactItem[];
  className?: string;
}

function Avatar({
  src,
  alt,
  size = 36,
}: {
  src?: string;
  alt?: string;
  size?: number;
}) {
  const fallback = (
    <div
      className={`w-${size} h-${size} rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600`}
      style={{ width: size, height: size }}
    >
      <UserCircle className="w-5 h-5" />
    </div>
  );

  if (!src) return fallback;

  return (
    <div style={{ width: size, height: size }} className="rounded-full overflow-hidden">
      <Image src={src} alt={alt ?? "avatar"} width={size} height={size} className="object-cover" />
    </div>
  );
}

export default function RightSidebar({
  notifications,
  activities,
  contacts,
  className = "",
}: RightSidebarProps) {
  // fallback sample data
  const sampleNotifications: NotificationItem[] =
    notifications ??
    [
      {
        id: 1,
        title: "You have a bug that needs attention",
        detail: "Click to view details",
        timeAgo: "Just now",
        icon: <Bell className="w-4 h-4 text-gray-600" />,
      },
      {
        id: 2,
        title: "New user registered",
        detail: "59 minutes ago",
        timeAgo: "59 minutes ago",
        icon: <UserCircle className="w-4 h-4 text-gray-600" />,
      },
      {
        id: 3,
        title: "Andi Lane subscribed to you",
        detail: "Today, 11:59 AM",
        timeAgo: "Today, 11:59 AM",
        icon: <Bell className="w-4 h-4 text-gray-600" />,
      },
    ];

  const sampleActivities: ActivityItem[] =
    activities ??
    [
      { id: "a1", avatarUrl: undefined, title: "You have a bug that needs...", timeAgo: "Just now" },
      { id: "a2", avatarUrl: undefined, title: "Released a new version", timeAgo: "59 minutes ago" },
      { id: "a3", avatarUrl: undefined, title: "Submitted a bug", timeAgo: "12 hours ago" },
    ];

  const sampleContacts: ContactItem[] =
    contacts ??
    [
      { id: "c1", name: "Natali Craig", avatarUrl: undefined },
      { id: "c2", name: "Drew Cano", avatarUrl: undefined },
      { id: "c3", name: "Orlando Diggs", avatarUrl: undefined },
      { id: "c4", name: "Andi Lane", avatarUrl: undefined },
      { id: "c5", name: "Kate Morrison", avatarUrl: undefined },
      { id: "c6", name: "Koray Okumus", avatarUrl: undefined },
    ];
  const { theme, resolvedTheme, toggleTheme, themeStyles } = useTheme();

  return (
    <aside className={`flex-shrink-0 w-72 ${themeStyles.background} ${themeStyles.text}  ${className}`}>
      <div className="h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold ">Notifications</h3>
          <button className="text-xs ">Clear</button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          {/* Notifications list */}
          <div className="space-y-3">
            {sampleNotifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 border ">
                  {/* icon or a small avatar */}
                  {n.icon ?? <Bell className="w-4 h-4 " />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm  truncate">{n.title}</div>
                  {n.detail && <div className="text-xs  mt-1">{n.detail}</div>}
                </div>

                <div className="text-xs  whitespace-nowrap ml-2">{n.timeAgo}</div>
              </div>
            ))}
          </div>

          {/* Activities */}
          <div>
            <div className="mb-2 text-sm font-semibold ">Activities</div>
            <div className="space-y-3">
              {sampleActivities.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <Avatar src={a.avatarUrl} alt={a.title} size={36} />

                  <div className="flex-1 min-w-0">
                    <div className="text-sm ">{a.title}</div>
                    <div className="text-xs  mt-1">{a.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="mb-2 text-sm font-semibold ">Contacts</div>
            <div className=" rounded-md p-2 ">
              <ul className="space-y-2">
                {sampleContacts.map((c) => (
                  <li key={c.id} className="flex items-center gap-3 px-2 py-1 rounded hover:bg-gray-400">
                    <Avatar src={c.avatarUrl} alt={c.name} size={36} />
                    <div>
                      <div className="text-sm ">{c.name}</div>
                      {c.role && <div className="text-xs ">{c.role}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer (optional) */}
        <div className="mt-4 text-xs ">
          <div>Last sync: 2m ago</div>
        </div>
      </div>
    </aside>
  );
}
