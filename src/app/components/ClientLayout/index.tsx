"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { name: "Home", href: "/", bg: "purple" },
  { name: "Projects", href: "/projects", bg: "yellow" },
  { name: "Blog", href: "/blog", bg: "blue" },
  { name: "About", href: "/about", bg: "red" },
];

const bgClasses: Record<string, string> = {
  purple: "bg-purple-900",
  yellow: "bg-yellow-900",
  blue: "bg-blue-900",
  red: "bg-red-900",
};

const tabVariants: Variants = {
  initial: (side: "left" | "right") => ({
    x: side === "left" ? "100vw" : "-100vw",
    opacity: 1,
  }),
  animate: {
    x: 0,
    opacity: [1, 1, 1],
  },
  exit: (side: "left" | "right") => ({
    x: side === "left" ? "100vw" : "-100vw",
    opacity: [1, 1, 1],
  }),
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const currentIndex = tabs.findIndex((tab) => tab.href === path);
  const prevIndexRef = useRef(currentIndex);
  const [displayChildren, setDisplayChildren] = useState(children);

  const direction: "left" | "right" =
    currentIndex > prevIndexRef.current ? "left" : "right";

  useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  function renderVerticalTab(tab: (typeof tabs)[0], side: "left" | "right") {
    const isActive = tab.href === path;
    return (
      <motion.div
        key={tab.href}
        custom={side}
        layoutId={`tab-${tab.href}`}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="h-full w-16 flex-shrink-0 flex items-center justify-center bg-black"
      >
        <Link
          href={tab.href}
          className={`
          flex flex-col items-center text-sm font-medium transition-colors
          ${
            isActive
              ? "text-blue-400 font-bold"
              : "text-gray-300 hover:text-blue-300"
          }
        `}
        >
          {tab.name.split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </Link>
      </motion.div>
    );
  }

  const activeTab = tabs[currentIndex] || { bg: "black" };
  const activeBgClass = bgClasses[activeTab.bg] || "bg-black";

  return (
    <LayoutGroup>
      <div className={`flex h-screen w-full bg-black`}>
        <aside className="h-full flex border-r border-gray-700 overflow-visible z-10">
          <AnimatePresence initial={false} mode="popLayout">
            {tabs
              .filter((_, i) => i <= currentIndex)
              .map((tab) => renderVerticalTab(tab, "left"))}
          </AnimatePresence>
        </aside>

        <div className={`flex-1 relative overflow-hidden`}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={path}
              custom={direction}
              variants={{
                initial: (dir) => ({
                  x: dir === "left" ? "100vw" : "-100vw",
                  opacity: 1,
                }),
                animate: { x: 0, opacity: 1 },
                exit: (dir) => ({
                  x: dir === "left" ? "-100vw" : "100vw",
                  opacity: 1,
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
              className={`absolute inset-0 overflow-auto ${activeBgClass} shadow-xl`}
              onAnimationStart={() => setDisplayChildren(children)}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <nav className="h-full flex border-l border-gray-700 overflow-visible z-10">
          <AnimatePresence initial={false} mode="popLayout">
            {tabs
              .filter((_, i) => i > currentIndex)
              .map((tab) => renderVerticalTab(tab, "right"))}
          </AnimatePresence>
        </nav>
      </div>
    </LayoutGroup>
  );
}
