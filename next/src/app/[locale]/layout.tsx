import type { Metadata } from "next";
import "../globals.css";
import Navigation, {
  MobileNavigation,
} from "@/app/[locale]/components/Navigation";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
      <NextIntlClientProvider>
        <body className="bg-black text-white">
          <div className="relative h-screen">
            <Navigation />
            <MobileNavigation />
            <main className="flex items-center justify-center">{children}</main>
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
