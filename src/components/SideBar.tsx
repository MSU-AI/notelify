"use client";
import { data } from "@/app/dashboard/utils";
import { Router } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [expanded, setExpanded] = useState(true);
  const [showRestoreButton, setShowRestoreButton] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const sidebar = sidebarRef.current;

    if (expanded && sidebar && !sidebar.contains(event.target as Node)) {
      setExpanded(false);
      setShowRestoreButton(true);
    }
  };

  const restoreSidebar = () => {
    setExpanded(true);
    setShowRestoreButton(true);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        id="docs-sidebar"
        className={`flex flex-col justify-between hs-overlay transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] min-w-[350px] w-[13%] bg-white dark:bg-[#181818] dark:border-[#262626] border-e border-gray-200 overflow-y-auto lg:end-auto lg:bottom-0 ${expanded ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <nav
          className="hs-accordion-group py-4 px-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <div className="w-full flex justify-end">
              <button
                type="button"
                className="px-2 py-2 rounded-md cursor-pointer hover:bg-[#212121] rounded-md p-2"
                onClick={toggleSidebar}
              >
                <img className="" src="sidebar.svg"></img>
              </button>
            </div>
            {Object.keys(data).map((key) => {
              return (
                <>
                  <h1 className="text-1xl font-bold text-[#808080]">{key}</h1>
                  <div className="flex flex-row flex-wrap gap-2 pb-8">
                    {data[key]["cards"].map((card, index) => {
                      return (
                        <>
                          <div className="pl-8 cursor-pointer">
                            <div className="hover:bg-[#212121] rounded-md p-2">
                              <h2 className="text-1xl font-bold">{card["title"]}</h2>
                              <h2 className="text-1xl w-60 truncate text-[#7e7e7e]">{card["description"]}</h2>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div> </>
              );
            })}
          </ul>
        </nav>
        <div className="justify-end p-4">
          <div className="flex flex-col pb-4">
            <div className="flex flex-row gap-2 cursor-pointer hover:bg-[#212121] rounded-md p-2" onClick={() => router.push("/dashboard")}>
              <img className="px-1" src="dashboardSidebar.svg" alt=""></img>
              <h2 className="text-1xl text-[#d1d1d1]">Dashboard</h2>
            </div>
            <div className="flex flex-row gap-2 cursor-pointer hover:bg-[#212121] rounded-md p-2" onClick={() => router.push("/login")}>
              <img className="px-1" src="loginSidebar.svg" alt=""></img>
              <h2 className="text-1xl text-[#d1d1d1]">Login</h2>
            </div>
          </div>
        </div>
      </div>
      {showRestoreButton && (
        <button
          type="button"
          className="fixed top-4 start-4 px-2 py-2 rounded-md cursor-pointer hover:bg-[#212121] rounded-md p-2"
          onClick={restoreSidebar}
        >
          <img className="" src="sidebar.svg"></img>
        </button>
      )}
    </>
  );
}
