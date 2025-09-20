"use client";
import React from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import DropDownNav from "./DropDownNav";
import { useTheme } from "@/context/ThemeContext";

export type SidebarItem = {
  label: string;
  Icon?: StaticImport;
  options?: string[];
  defaultOpen?: boolean;
  dropdown?: boolean;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

interface SideBarSectionProps {
  sections?: SidebarSection[];
  className?: string;
}

export default function SideBarSection({
  sections,
  className = "",
}: SideBarSectionProps) {
  const defaultSections: SidebarSection[] = [
    {
      title: "Pages",
      items: [
        {
          label: "User Profile",
          Icon: undefined,
          options: ["Overview", "Projects", "Campaigns", "Documents", "Followers"],
          defaultOpen: true,
          dropdown: true,
        },
        { label: "Account", Icon: undefined, dropdown: false },
        { label: "Corporate", Icon: undefined, dropdown: false },
        { label: "Blog", Icon: undefined, dropdown: false },
        { label: "Social", Icon: undefined, dropdown: false },
      ],
    },
  ];

  const input = sections ?? defaultSections;
  const { theme, resolvedTheme, toggleTheme, themeStyles } = useTheme();
  return (
    <aside className={`w-fit p-6 ${themeStyles.background} ${themeStyles.text} ${className}`}>
      {input.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="mb-4 text-sm font-medium">
            {section.title}
          </div>

          <div className="space-y-4">
            {section.items.map((item) => (
              <DropDownNav
                key={item.label}
                title={{ label: item.label, Icon: item.Icon }}
                options={item.options ?? []}
                defaultOpen={!!item.defaultOpen}
                dropdown={item.dropdown}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
