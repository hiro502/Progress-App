"use client";

import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import { usePathname } from "next/navigation";
import AddProjectModal from "../modals/AddProjectModal";

export default function SideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [addPageOpen, setAddPageOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-[calc(100vh - 140px)] overflow-y-scroll scrollbar-none border-r p-4 bg-gray-50">
        <FilterSidebar />
        {pathname === "/projects" && <AddProjectModal />}
      </aside>

      {/* Main Content */}
      <div className="md:hidden w-full flex justify-end gap-4 pt-3 mb-3 pr-4">
        <div>{pathname === "/projects" && <AddProjectModal />}</div>
        {/* Mobile Filter Button */}
        <div>
          <button
            onClick={() => setMobileOpen(true)}
            className="px-3 py-1  bg-blue-500 text-white rounded-lg"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto md:hidden transition-transform">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-500 px-4"
            >
              ✕
            </button>
          </div>
          <FilterSidebar />
        </div>
      )}

      {addPageOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto md:hidden transition-transform">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setAddPageOpen(false)}
              className="text-gray-500 px-4"
            >
              ✕
            </button>
          </div>
          <FilterSidebar />
        </div>
      )}
    </>
  );
}
