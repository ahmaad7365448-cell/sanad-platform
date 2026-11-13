import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmartChat from "@/components/chat/SmartChat";
import { LanguageProvider } from "@/context/LanguageContext";
import HelpTicker from "@/components/HelpTicker";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "منصة سَنَد | Sanad Platform",
  description: "سوق إلكتروني متكامل لربط المغتربين بالداخل السوري عبر نظام تسليم مشفر وآمن.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#020617] text-slate-100 min-h-screen flex flex-col">
        <LanguageProvider>
          <HelpTicker /> {/* الشريط المتحرك يعمل في جميع الصفحات */}
          <Header />
          <main className="flex-grow flex flex-col pt-1">
            {children}
          </main>
          <SmartChat />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}