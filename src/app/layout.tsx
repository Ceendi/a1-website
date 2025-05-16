import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "A1 Studio",
  description: "A1 Studio - Your Partner in Architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
