"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon, Heart, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith("/auth") || pathname?.startsWith("/expat")) return null;

  return (
    <footer className="border-t border-slate-800/80 bg-[#020617] pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* العمود الأول: الشعار والوصف */}
          <div className="flex flex-col items-start text-start">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative flex h-10 w-10 items-center justify-center bg-slate-900 rounded-xl border border-emerald-500/30 shadow-inner">
                <Hexagon className="absolute h-7 w-7 text-emerald-400" strokeWidth={1.5} />
                <Heart className="relative h-3 w-3 text-cyan-400 fill-cyan-400/20" strokeWidth={2} />
              </div>
              <span className="text-2xl font-black text-white tracking-widest uppercase">
                {t.brand.name}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              {t.footer.desc}
            </p>
          </div>

          {/* العمود الثاني: المنصة (الدائرة الحمراء الوسطى) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">{t.footer.platform}</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.nav.services}</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.nav.howItWorks}</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.nav.about}</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: السياسات والدعم (الدائرة الحمراء اليمنى) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">{t.footer.policies}</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.footer.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.footer.terms}</Link></li>
              <li><Link href="/rate" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.footer.rateUs}</Link></li>
              <li><Link href="/report" className="hover:text-emerald-400 transition-colors flex items-center gap-2">{t.footer.reportIssue}</Link></li>
              <li><Link href="/donate" className="hover:text-emerald-400 transition-colors flex items-center gap-2 font-bold">{t.footer.donateBtn}</Link></li>
            </ul>
          </div>

          {/* العمود الرابع: تواصل معنا (جزء من الدائرة الحمراء الوسطى) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">{t.nav.contact}</h3>
            <ul className="space-y-5 text-sm font-medium text-slate-400 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3" dir="ltr">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="w-full">+90 542 345 63 16</span>
              </li>
              <li className="flex items-center gap-3" dir="ltr">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="w-full text-xs">aborame5230200@icloud.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* حقوق النشر */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-medium">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase">
            <Hexagon className="w-4 h-4" />
            {t.brand.subtitle}
          </div>
        </div>
      </div>
    </footer>
  );
}