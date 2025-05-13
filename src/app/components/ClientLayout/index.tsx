"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const currentIndex = tabs.findIndex((tab) => tab.href === path);

  const leftTabs = tabs.slice(0, currentIndex + 1);
  const rightTabs = tabs.slice(currentIndex + 1);

  const renderVerticalTab = (tab: (typeof tabs)[0]) => (
    <motion.div
      key={tab.href}
      initial={{ width: 60 }}
      whileHover={{ width: 80 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="
        flex-1
        h-full
        flex items-center justify-center 
        border-r border-gray-300 bg-white 
        overflow-hidden
      "
    >
      <Link
        href={tab.href}
        className="flex flex-col text-sm font-medium text-gray-600 hover:text-blue-600"
      >
        {tab.name.split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </Link>
    </motion.div>
  );

  return (
    <div className="flex h-screen w-full">
      <aside className="flex flex-row h-full">
        {leftTabs.map(renderVerticalTab)}
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50">{children}</main>

      <nav className="flex flex-row h-full">
        {rightTabs.map(renderVerticalTab)}
      </nav>
    </div>
  );
}
