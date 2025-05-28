import type { Metadata } from "next";
import "./globals.css";
import Navigation, { MobileNavigation } from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "A1 website",
  description: "A1 website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-black text-white min-h-screen overflow-hidden">
        <div className="relative h-screen">
          <Navigation />
          <MobileNavigation />
          <main className="h-full flex items-center justify-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
