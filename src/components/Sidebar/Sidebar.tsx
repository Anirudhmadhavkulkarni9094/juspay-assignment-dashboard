"use client";
import React from "react";
import SideBarSection, { SidebarSection } from "./SideBarSection";
import profile from "../../assets/profile.png";
import account from "../../assets/IdentificationCard.png";
import corporate from "../../assets/UsersThree.png";
import blog from "../../assets/Notebook.png";
import social from "../../assets/ChatsTeardrop.png";
import shoppingBag from "../../assets/ShoppingBagOpen.png";
import bookOpen from "../../assets/BookOpen.png";
import defaultImage from "../../assets/default.png";
import folderNotch from "../../assets/FolderNotch.png";
import HistoryTab from "./HistoryTab";
import ProfileTab from "./ProfileTab";
import { useTheme } from "@/context/ThemeContext";

const sections: SidebarSection[] = [
  {
    title: "Dashboard",
    items: [
      { label: "Default", Icon: defaultImage, dropdown: false },
      { label: "eCommerce", Icon: shoppingBag, dropdown: true },
      { label: "Projects", Icon: folderNotch, dropdown: true },
      { label: "Online Courses", Icon: bookOpen, dropdown: true },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        label: "User Profile",
        Icon: profile,
        options: ["Overview", "Projects", "Campaigns", "Documents", "Followers"],
        defaultOpen: true,
        dropdown: true,
      },
      { label: "Account", Icon: account, dropdown: true },
      { label: "Corporate", Icon: corporate, dropdown: true },
      { label: "Blog", Icon: blog, dropdown: true },
      { label: "Social", Icon: social, dropdown: true },
    ],
  },
];

const favorites = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Projects" },
];

const recent = [
  { id: "r1", label: "Campaigns" },
  { id: "r2", label: "Documents" },
];

export default function Sidebar() {
    const { themeStyles } = useTheme();

  return <div className={`w-fit ${themeStyles.background} min-h-screen border-r border-gray-700`}>
    <ProfileTab></ProfileTab>
    <HistoryTab favorites={favorites} recent={recent}></HistoryTab>
    <SideBarSection sections={sections} className="min-h-screen" />
  </div>
}
