"use client";

import { usePathname } from "next/navigation";
import SideBar from "./sidebar/SideBar";
import { FilterProvider } from "@/contexte/FilterContext";
import { useData } from "@/contexte/DataContext";
import { useEffect } from "react";

export default function MainContents({ children }) {
  const { user, reloadData } = useData();
  useEffect(() => {
    reloadData();
  }, [user]);

  const pathname = usePathname();
  const onlySidebarPaths = ["/", "/projects", "/tasks"];

  const showSidebar = onlySidebarPaths.includes(pathname);

  const mainClasses = `
    w-[80%] max-w-7xl
    flex flex-col items-center
    ${
      showSidebar
        ? "md:flex-row md:justify-between md:items-start"
        : "md:flex-col md:w-full"
    }
    fixed top-[105px] h-[calc(100vh-130px)]
  `;

  return (
    <FilterProvider>
      <main className={mainClasses}>
        {showSidebar && <SideBar />}

        <div
          className={`w-full flex flex-col items-center overflow-y-auto h-full pt-4 ${
            showSidebar ? "" : "md:w-full"
          }`}
        >
          {children}
        </div>
      </main>
    </FilterProvider>
  );
}
