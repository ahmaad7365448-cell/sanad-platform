"use client";

import Link from "next/link";
import { Heart, ShieldCheck, ArrowLeft, ArrowRight, Store, Car, Smartphone, Sofa, Shirt } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
// 1. استيراد زر الدفع هنا
import CheckoutButton from "@/components/CheckoutButton";

export default function HomePage() {
  const { lang, t } = useLanguage();
  const isRtl = lang === "AR";
  const ui = t.home;

  const categories = [
    { name: 'عقارات', icon: Store, color: 'from-amber-400 to-orange-500', link: '/categories/real-estate' },
    { name: 'سيارات ومحركات', icon: Car, color: 'from-blue-400 to-indigo-500', link: '/categories/vehicles' },
    { name: 'إلكترونيات', icon: Smartphone, color: 'from-purple-400 to-fuchsia-500', link: '/categories/electronics' },
    { name: 'أثاث منزلي', icon: Sofa, color: 'from-rose-400 to-red-500', link: '/categories/home' },
    { name: 'أزياء وملابس', icon: Shirt, color: 'from-teal-400 to-emerald-500', link: '/categories/fashion' },
  ];

  return (
    <div className="min-h-[90vh] bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center pt-8">
        
        {/* العناوين والترحيب */}
        <div className="relative group mb-4 mt-8">
          <div className="absolute -inset-2 bg-emerald-500 rounded-full blur-[30px] opacity-30 group-hover:opacity-50 transition duration-700"></div>
          <div className="relative px-6 py-3 bg-slate-900/80 backdrop-blur-md border border-emerald-500/40 rounded-full flex items-center justify-center gap-3 shadow-lg">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Heart className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-white font-bold text-sm md:text-base tracking-wide whitespace-nowrap">{ui.topBadge || 'سوق سَنَد المتعدد'}</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-emerald-400 text-xs md:text-sm font-bold mb-8 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>{ui.subBadge || 'تسوق آمن بنظام الاستلام المشفر (OTP)'}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight flex items-center justify-center gap-3 sm:gap-4 flex-wrap leading-tight drop-shadow-lg text-center">
          {isRtl ? (
            <><span className="text-white">{ui.titleWhite || 'تسوق الآن من'}</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{ui.titleColored || 'الأقسام'}</span></>
          ) : (
            <><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{ui.titleColored}</span> <span className="text-white">{ui.titleWhite}</span></>
          )}
        </h1>

        <p className="text-slate-300 text-lg md:text-xl text-center max-w-3xl leading-relaxed mb-14 font-medium">
          {ui.subtitle || 'تصفح أقسام المنصة واشترِ المنتجات الحقيقية لعائلتك في سوريا، سيصلهم إشعار ورقم سري لاستلام الطلب من البائع مباشرة.'}
        </p>

        {/* الأزرار: زر التصفح العام للأقسام وزر الدفع */}
        <div className="relative group flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 mt-8">
          <Link href="/categories" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
             <span>عرض جميع المنتجات والأقسام</span>
             {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </Link>

          {/* 2. وضع زر الدفع هنا بجانب الزر الآخر */}
          <CheckoutButton />
        </div>

        {/* إحصائيات المنصة */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-10 bg-slate-900/30 border border-slate-800/80 rounded-[2rem] backdrop-blur-xl">
          <div className="text-center md:text-start"><div className="text-2xl md:text-4xl font-black text-emerald-400 mb-2">+5</div><div className="text-slate-400 text-xs md:text-sm font-bold">أقسام رئيسية</div></div>
          <div className="text-center md:text-start"><div className="text-2xl md:text-4xl font-black text-emerald-400 mb-2">100%</div><div className="text-slate-400 text-xs md:text-sm font-bold">تسليم آمن بالرقم السري</div></div>
          <div className="text-center md:text-start"><div className="text-2xl md:text-4xl font-black text-emerald-400 mb-2">0</div><div className="text-slate-400 text-xs md:text-sm font-bold">رسوم توصيل (استلام من المتجر)</div></div>
          <div className="text-center md:text-start"><div className="text-2xl md:text-4xl font-black text-emerald-400 mb-2">24/7</div><div className="text-slate-400 text-xs md:text-sm font-bold">دعم بائعين مباشر</div></div>
        </div>

      </div>
    </div>
  );
}