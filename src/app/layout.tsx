import "./globals.css";

export const metadata = {
  title: "Animated Vertical Tabs Navigation",
  description: "Framer Motion + Tailwind CSS + Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
