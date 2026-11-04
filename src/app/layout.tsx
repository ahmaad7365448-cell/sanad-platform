import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmartChat from "@/components/chat/SmartChat"; // استدعاء المساعد الذكي

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "منصة سَنَد | Sanad Platform",
  description: "المنصة الأولى لربط المغتربين بالداخل السوري",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#020617] text-slate-100 min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        {/* المكونات الثابتة أسفل الشاشة */}
        <SmartChat />
        <Footer />
        
      </body>
    </html>
  );
}