import type { Metadata } from "next";
import "@/app/globals.css";
import Navigation from "@/app/components/Navigation";
import { MobileNavigation } from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "A1 website",
  description: "A1 website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-white text-black">
        <div className="relative h-screen">
          <Navigation />
          <MobileNavigation />
          <main className="flex items-center justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
