"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  unstable_addTransitionType as addTransitionType,
  startTransition,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});

const polishNames: Record<string, string> = {
  HOME: "STRONA GŁÓWNA",
  PROJECTS: "PROJEKTY",
  BLOG: "BLOG",
  ABOUT: "O NAS",
};

const pages = [
  { path: "/", name: "home", index: 0 },
  { path: "/projects", name: "projects", index: 1 },
  { path: "/blog", name: "blog", index: 2 },
  { path: "/about", name: "about", index: 3 },
];

function isTabActive(pathname: string, tabName: string) {
  return (
    pathname.includes(tabName) ||
    (tabName === "home" && /^\/(en|pl)?$/.test(pathname))
  );
}

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = pages.findIndex((p) => isTabActive(pathname, p.name));

  const leftTabs = pages.slice(0, currentIndex + 1);
  const rightTabs = pages.slice(currentIndex + 1);

  type Side = "left" | "right";

  const renderTab = (tab: (typeof pages)[number], side: Side) => {
    const isActive = isTabActive(pathname, tab.name);
    const borderSide = side === "left" ? "border-r" : "border-l";
    const gradientClass =
      tab.index % 2 === 0
        ? "bg-gradient-to-b from-[#808080] via-white to-[#808080]"
        : "bg-gradient-to-b from-[#808080] via-white/90 to-[#808080] [background:linear-gradient(to_bottom,#808080_0%,#ffffff_30%,#808080_100%)]";
    return (
      <ViewTransition key={`${tab.path}`} name={`tab-${tab.name}`}>
        <Link
          href={tab.path}
          onClick={(e) => {
            if (isActive) {
              e.preventDefault();
              return;
            }
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
          className={`h-screen flex items-center justify-center relative w-16 z-50 animate-in-place ${borderSide} border-black border-1 px-6 py-3 ${gradientClass} ${
            isActive
              ? "text-black disabled cursor-default"
              : "group text-black hover:bg-neutral-300 transition-colors ease-in-out"
          }`}
          key={tab.path}
          aria-current={isActive ? "page" : undefined}
          aria-disabled={isActive ? "true" : undefined}
          tabIndex={isActive ? -1 : 0}
        >
          <span
            className={`text-2xl sm:text-3xl tracking-widest flex flex-col items-center select-none transform transition-transform duration-200 ease-in-out group-hover:-translate-y-2 ${montserrat.className}`}
          >
            {(polishNames[tab.name.toUpperCase()] || tab.name.toUpperCase())
              .split("")
              .map((char, i) =>
                char === " " ? (
                  <span key={`${tab.name}-${i}`} style={{ minHeight: "1em" }}>
                    &nbsp;
                  </span>
                ) : (
                  <span key={`${tab.name}-${i}`}>{char}</span>
                )
              )}
          </span>
        </Link>
      </ViewTransition>
    );
  };

  return (
    <ViewTransition name="nav">
      <nav className="hidden lg:block nav z-50">
        <div className="fixed top-0 left-0 bottom-0 z-50 flex flex-row">
          {leftTabs.map((t) => renderTab(t, "left"))}
        </div>
        <div className="fixed top-0 right-0 bottom-0 z-50 flex flex-row">
          {rightTabs.map((t) => renderTab(t, "right"))}
        </div>
      </nav>
    </ViewTransition>
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
          className={`block w-7 h-0.5 bg-black mb-1 transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-0.5 bg-black mb-1 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {open && (
        <nav className="fixed inset-0 z-40 bg-black/50 flex flex-col items-center justify-center lg:hidden animate-fade-in">
          <div
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => setOpen(false)}
          >
            {pages.map((page) => (
              <Link
                href={page.path}
                key={page.path}
                className={`text-2xl font-semibold my-4 transition-colors duration-200 bg-transparent border-none outline-none ${
                  pathname === page.path
                    ? "text-white"
                    : "text-white hover:text-gray-500"
                }`}
                style={{ cursor: "pointer" }}
              >
                {page.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
