"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  unstable_ViewTransition as ViewTransition,
} from "react";

const pages = [
  { path: "/", name: "Home" },
  { path: "/projects", name: "Projects" },
  { path: "/blog", name: "Blog" },
  { path: "/about", name: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = pages.findIndex((page) => page.path === pathname);
    setCurrentIndex(index !== -1 ? index : 0);
  }, [pathname]);

  const getTabsLayout = () => {
    const leftTabs = pages.slice(0, currentIndex + 1);
    const rightTabs = pages.slice(currentIndex + 1);
    return { leftTabs, rightTabs };
  };

  const { leftTabs, rightTabs } = getTabsLayout();

  const renderTab = (tab: (typeof pages)[number]) => (
    <Link
      href={tab.path}
      key={tab.path}
      className={`h-screen flex items-center justify-center relative group
        ${
          tab.path === pathname
            ? "bg-white text-black w-24"
            : "bg-black/80 text-white/70 hover:text-white hover:bg-white/10 w-16 hover:w-20"
        }`}
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      <span className="text-lg font-light tracking-widest transform rotate-180">
        {tab.name.toUpperCase()}
      </span>
    </Link>
  );

  return (
    <ViewTransition>
      <div className="fixed inset-0 z-40 flex justify-between pointer-events-none">
        <div className="flex pointer-events-auto">
          {leftTabs.map(renderTab)}
        </div>
        <div className="flex pointer-events-auto">
          {rightTabs.map(renderTab)}
        </div>
      </div>
    </ViewTransition>
  );
}
