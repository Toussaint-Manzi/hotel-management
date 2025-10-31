import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Olympic Hotel",
  description: "A hotel management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>
        <main>
          <ClientLayout>{children}</ClientLayout>
        </main>
      </body>
    </html>
  );
}
