"use client";

import React from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  themeStyles: {
    background: string;
    card: string;
    text: string;
    muted: string;
    border: string;
  };
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "app-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      return (raw as Theme) || "system";
    } catch {
      return "system";
    }
  });

  // system theme updates
  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") applyTheme("system");
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, [theme]);

  function applyTheme(next: Theme) {
    const resolved = next === "system" ? getSystemTheme() : next;
    const html = document.documentElement;
    if (resolved === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    applyTheme(theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : prev === "light" ? "system" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  };

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  const themeStyles =
    resolvedTheme === "dark"
      ? {
          background: "bg-gray-900",
          card: "bg-gray-800",
          text: "text-white",
          muted: "text-gray-500",
          border: "border-gray-700",
        }
      : {
          background: "bg-gray-100",
          card: "bg-white",
          text: "text-gray-900",
          muted: "text-gray-500",
          border: "border-gray-200",
        };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
