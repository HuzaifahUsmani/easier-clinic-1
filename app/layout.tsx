import type { Metadata } from "next";
import { Instrument_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ChapterNav from "@/components/ChapterNav";
import EHRStrip from "@/components/EHRStrip";
import ThemePicker from "@/components/ThemePicker";
import PageTransition from "@/components/PageTransition";

const sans = Instrument_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-serif-custom",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "EasierClinic — operations support for Australian clinics",
  description:
    "Virtual assistants, ClickUp, automation and dashboards for Australian allied health, psychology and dental practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <EHRStrip />
        <Navbar />
        <ChapterNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <PageTransition />
        <ThemePicker />
      </body>
    </html>
  );
}
