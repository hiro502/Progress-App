"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginButton, LogoutButton } from "./authentication/AuthControls";
import { useData } from "@/contexte/DataContext";

export default function Header() {
  const { user, loading } = useData();
  console.log(user);

  const imgSrc = user?.photoURL || "/default-icon.png";

  const pathname = usePathname();

  const links = [
    { href: "/", label: "Aujourd'hui" },
    { href: "/projects", label: "Projets" },
    { href: "/tasks", label: "Tâches" },
  ];

  return (
    <header className="w-[80%] max-w-7xl mx-auto  pt-4 fixed">
      <div className="flex justify-between items-center mb-0 h-[40px]">
        <h1 className="text-2xl font-bold text-black">Progress App</h1>
        <div className="flex items-center text-xl text-gray-800 hover:text-gray-500">
          {loading ? (
            <LogoutButton />
          ) : typeof user === "undefined" ? null : user ? (
            <>
              <img
                src={imgSrc}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>

      <nav className="flex justify-end gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-0 py-2  text-lg ${
              pathname === href
                ? "text-black font-semibold border-b-2 border-black inline-block"
                : "text-gray-800 hover:text-gray-500"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
