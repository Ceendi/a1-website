"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const pages = [
  { path: "/", name: "Home" },
  { path: "/projects", name: "Projects" },
  { path: "/blog", name: "Blog" },
  { path: "/about", name: "About" },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const index = pages.findIndex((page) => page.path === pathname);
    setCurrentIndex(index !== -1 ? index : 0);
  }, [pathname]);

  const getTabsLayout = () => {
    const leftTabs = pages.slice(0, currentIndex + 1);
    const rightTabs = pages.slice(currentIndex + 1);
    return { leftTabs, rightTabs };
  };

  const navigateWithTransition = async (
    targetPath: string,
    direction: "next" | "prev"
  ) => {
    if (pathname === targetPath || isTransitioning) return;

    setIsTransitioning(true);

    // Dodaj klasę kierunkową do body
    document.body.classList.remove("nav-direction-next", "nav-direction-prev");
    document.body.classList.add(
      direction === "next" ? "nav-direction-next" : "nav-direction-prev"
    );

    // Jeśli przeglądarka wspiera ViewTransition API
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        router.push(targetPath);
      });

      try {
        await transition.finished;
      } catch (err) {
        console.error("Transition error:", err);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      router.push(targetPath);
      setIsTransitioning(false);
    }
  };

  const handleClick = (tabPath: string) => {
    const targetIndex = pages.findIndex((p) => p.path === tabPath);
    const direction = targetIndex > currentIndex ? "next" : "prev";
    navigateWithTransition(tabPath, direction);
  };

  const { leftTabs, rightTabs } = getTabsLayout();

  const renderTab = (tab: (typeof pages)[number]) => (
    <button
      key={tab.path}
      onClick={() => handleClick(tab.path)}
      disabled={isTransitioning}
      className={`
        h-screen flex items-center justify-center relative group
        ${isTransitioning ? "cursor-not-allowed opacity-50" : ""}
        ${
          tab.path === pathname
            ? "bg-white text-black w-24"
            : "bg-black/80 text-white/70 hover:text-white hover:bg-white/10 w-16 hover:w-20"
        }
      `}
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      <span className="text-lg font-light tracking-widest transform rotate-180">
        {tab.name.toUpperCase()}
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-40 flex justify-between pointer-events-none">
      <div className="flex pointer-events-auto">{leftTabs.map(renderTab)}</div>
      <div className="flex pointer-events-auto">{rightTabs.map(renderTab)}</div>
    </div>
  );
}
