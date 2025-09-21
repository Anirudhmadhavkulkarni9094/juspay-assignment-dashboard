// components/DropDownNav.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useTheme } from "@/context/ThemeContext";

interface TitleProps {
  label: string;
  Icon?: StaticImport;
}

interface DropDownNavProps {
  title: TitleProps;
  options?: string[];
  defaultOpen?: boolean;
  dropdown?: boolean; // force dropdown behavior even if no options
}

export default function DropDownNav({
  title,
  options = [],
  defaultOpen = false,
  dropdown,
}: DropDownNavProps) {
  const hasOptions = options.length > 0;
  const isDropdown = dropdown ?? hasOptions;
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultOpen && isDropdown);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const {theme,  themeStyles } = useTheme();

  // Safe fallbacks for theme keys
  const containerText = themeStyles?.text || "text-gray-900";
  const cardBg =  "bg-transparent";
  const muted = themeStyles?.muted || "text-gray-500";
  const border = themeStyles?.border || "border-gray-200";
  // Optional accent key — recommended to add to ThemeContext if you want a specific accent color
  // e.g. themeStyles.accent = "bg-indigo-500"
  // fallback to a sensible Tailwind accent if not provided
  // (we access via any because ThemeContext currently doesn't declare `accent`)
  const accent = (themeStyles as any)?.accent || "bg-gray-500";

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // keyboard support: Enter/Space toggles, Escape closes
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!rootRef.current) return;
      const activeInside = rootRef.current.contains(document.activeElement);
      if (!activeInside) return;
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      } else if ((e.key === "Enter" || e.key === " ") && isDropdown) {
        e.preventDefault();
        setIsOpen((s) => !s);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isDropdown]);

  const slug =
    title.label.trim().toLowerCase() === "default"
      ? "/"
      : `/${title.label.trim().toLowerCase().replace(/\s+/g, "-")}`;

  const FallbackIcon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className=""
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5 2.2386 5 5 5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21c1.5-4 6-6 9-6s7.5 2 9 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const bgMatch = (cardBg || "").match(/\bbg-[^\s]+/);
const groupHoverCard = bgMatch ? `group-hover:${bgMatch[0]}` : "";

  return (
    <div ref={rootRef} className={`w-full ${containerText}`}>
      {isDropdown ? (
        <>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={`${slug.replace(/\W/g, "-")}-submenu`}
            onClick={() => setIsOpen((s) => !s)}
            className={`flex items-center w-fit px-1 py-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded-md ${containerText}`}
          >
            <span className="flex-shrink-0 mr-2">
              {/* Chevron inherits currentColor, which is controlled by containerText */}
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>

            <span className={`w-7 h-7 flex items-center text-white justify-center rounded-sm flex-shrink-0 mr-3 ${cardBg} ${containerText}`}>
              {title.Icon ? (
                <Image
                  src={title.Icon}
                  alt={`${title.label} icon`}
                  width={18}
                  height={18}
                  color="white"
                  className={`object-contain ${theme=== "dark" ? "invert" : ""}`}
                />
              ) : (
                FallbackIcon
              )}
            </span>

            <span className={`ml-1 text-sm font-medium ${containerText}`}>{title.label}</span>
          </button>

          {isOpen && hasOptions && (
            <nav
              id={`${slug.replace(/\W/g, "-")}-submenu`}
              className="mt-2"
              aria-label={`${title.label} submenu`}
            >
              <ul className="pl-14 space-y-3">
                {options.map((opt) => {
                  const optSlug = `${slug.replace(/\/$/, "")}/${opt
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`;
                  return (
                    <li key={opt}>
                      <Link
                        href={optSlug}
                        className={`block w-full text-sm ${containerText} ${muted} hover:${containerText} focus:outline-none`}
                      >
                        {opt}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </>
      ) : (
        <Link href={slug} className="relative block group">
  {/* accent bar on hover — uses theme `accent` if available */}
  <span
    aria-hidden
    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity ${accent}`}
  />
  <div
    className={`flex items-center gap-4 w-full px-4 py-3 rounded-full bg-transparent ${cardBg} ${groupHoverCard} transition-colors`}
    // keep the element focusable for keyboard users via the Link wrapper
  >
   <span
  className={`flex items-center justify-center rounded-sm flex-shrink-0 p-1 ${cardBg} ${containerText} transition-transform group-hover:scale-105`}
  aria-hidden
>
  {title.Icon ? (
    <Image
      src={title.Icon}
      alt={`${title.label} icon`}
      width={24}
      height={24}
      className={`object-contain ${theme=== "dark" ? "invert" : ""}`}
    />
  ) : (
    FallbackIcon
  )}
</span>

    <span className={`ml-1 text-sm font-medium ${containerText}`}>{title.label}</span>
  </div>
</Link>
      )}
    </div>
  );
}
