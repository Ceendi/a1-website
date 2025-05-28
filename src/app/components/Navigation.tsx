"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  unstable_addTransitionType as addTransitionType,
  startTransition,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";

const pages = [
  { path: "/", name: "home", index: 0 },
  { path: "/projects", name: "projects", index: 1 },
  { path: "/blog", name: "blog", index: 2 },
  { path: "/about", name: "about", index: 3 },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = pages.findIndex((page) => page.path === pathname);

  const leftTabs = pages.slice(0, currentIndex + 1);
  const rightTabs = pages.slice(currentIndex + 1);

  const renderTab = (tab: (typeof pages)[number]) => (
    <ViewTransition key={`${tab.path}`} name={`tab-${tab.name}`}>
      <Link
        href={tab.path}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => {
            if (tab.index > currentIndex) {
              addTransitionType("right-tabs");
            } else {
              addTransitionType("left-tabs");
            }
            router.push(tab.path);
          });
        }}
        className={`h-screen flex items-center justify-center relative w-16
          ${
            tab.path === pathname
              ? "bg-white/80 text-black/70 disabled"
              : "bg-white/70 text-black/70 hover:text-white hover:bg-white/10"
          }`}
        style={{
          writingMode: "vertical-lr",
          textOrientation: "mixed",
          padding: 0,
        }}
        key={tab.path}
      >
        <span className="text-lg font-light tracking-widest transform rotate-180">
          {tab.name.toUpperCase()}
        </span>
      </Link>
    </ViewTransition>
  );

  return (
    <div className="hidden lg:block">
      <div className="fixed inset-0 z-99 flex justify-between">
        <div className="flex">{leftTabs.map(renderTab)}</div>
        <div className="flex">{rightTabs.map(renderTab)}</div>
      </div>
    </div>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 flex flex-col justify-center items-center w-10 h-10 lg:hidden"
        aria-label="Otwórz menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block w-7 h-0.5 bg-white mb-1 transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-0.5 bg-white mb-1 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-0.5 bg-white transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/80 flex flex-col items-center justify-center lg:hidden animate-fade-in">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              onClick={() => setOpen(false)}
              className={`text-2xl font-semibold my-4 transition-colors duration-200 ${
                pathname === page.path
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {page.name.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
