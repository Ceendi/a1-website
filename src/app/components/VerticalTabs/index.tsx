"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Home", href: "/" },
  { name: "Projekty", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Firma", href: "/about" },
];

export function VerticalTabs() {
  const path = usePathname();
  return (
    <nav className="flex h-screen bg-gray-100">
      {tabs.map((tab) => {
        const isActive = path === tab.href;
        return (
          <div
            key={tab.href}
            className="
              flex-1
              border-r
              last:border-r-1
              flex
              items-center
              justify-center
            "
          >
            <Link
              href={tab.href}
              className={`
                    px-6 py-2 font-medium transition-colors
                    text-4xl
                    ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }
                    [writing-mode:vertical-rl]
                    [text-orientation:upright]
                `}
            >
              {tab.name}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
