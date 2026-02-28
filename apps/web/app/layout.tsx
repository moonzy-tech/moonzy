import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "../components/Navbar";
import { Providers } from "./providers";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Moonzy Snacks – Crunchy Millet Chips",
  description:
    "Discover Moonzy’s bold snack lineup – peri peri, pudina, caramel and hing chips with big flavour and even bigger crunch.",
  icons: {
    icon: "/monnzy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-berlin`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-XRGRZLPSEK" />
    </html>
  );
}
