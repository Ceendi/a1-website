"use client";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import AnimatedNav from "./AnimatedNav";
import { PAGES } from "../config/pages";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const currentPage = PAGES.find((page) => page.path === path) || PAGES[0];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MobileMenu />
      <AnimatedNav />
      {/* lg hidden because animated nav already has content, so its only for mobile */}
      <main className="lg:ml-48 w-full lg:hidden">{currentPage.content}</main>
    </div>
  );
}
