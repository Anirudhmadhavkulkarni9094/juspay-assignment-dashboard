// components/Shell.tsx
"use client";

import Navbar from "@/components/navbar/Navbar";
import RightSidebar from "@/components/rightbar/RightSidebar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useTheme } from "@/context/ThemeContext";
import React from "react";


interface ShellProps {
    children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [isRightOpen, setIsRightOpen] = React.useState(true);
  const { theme, resolvedTheme, toggleTheme, themeStyles } = useTheme();

    return (
        <div className="min-h-screen flex bg-gray-50">
            {isSidebarOpen && <Sidebar />}
            <div className={`w-full ${theme === "dark" ? "bg-gray-900" : ""}`}>

            <Navbar
                toggleSidebar={() => setIsSidebarOpen((s) => !s)}
                toggleRightSidebar={() => setIsRightOpen((s) => !s)}
                />

            <div className="">
                <main className={`transition-all duration-300 ease-in-out ${themeStyles.text}`}>
                    {children}
                </main>
            </div>
                </div>
            {isRightOpen && <RightSidebar />}
        </div>
    );
}
