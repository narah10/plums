import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  weight: ['200','300','400','500','600','700','800'],
  preload: false,
  subsets: ['latin'],
  display: 'swap',
  });

export const metadata: Metadata = {
  title: "Plums",
  description: "Dashboard for study web app Plums",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
