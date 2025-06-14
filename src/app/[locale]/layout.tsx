import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VMG Game",
  description: "VMG Game",
};
export const viewport: Viewport = {
  themeColor: "#0a0d12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
