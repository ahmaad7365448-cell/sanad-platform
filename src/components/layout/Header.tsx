"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, Briefcase, Info, 
  Phone, Settings, User, Hexagon, Heart, Sparkles 
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isExpat = pathname?.startsWith("/expat");
  const isProvider = pathname?.startsWith("/provider");
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#020617]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          
          {/* الشعار الأسطوري */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center justify-center w-12 h-12"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-xl blur-[12px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex h-11 w-11 items-center justify-center bg-slate-950 rounded-xl border border-emerald-500/50 overflow-hidden z-10 shadow-inner">
                <div className="absolute inset-0 bg-emerald-500/10"></div>
                <Hexagon className="absolute h-9 w-9 text-emerald-500" strokeWidth={1.5} />
                <Heart className="relative h-4 w-4 text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" strokeWidth={2} />
              </div>
            </motion.div>
            <div className="flex flex-col justify-center">
              <span className="text-3xl font-black tracking-widest text-white drop-shadow-md leading-none mt-1">سَنَد</span>
              <span className="text-[9px] font-bold text-emerald-400 tracking-[0.2em] uppercase hidden md:block mt-1">Sanad Platform</span>
            </div>
          </Link>

          {/* روابط الديسكتوب */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {!isExpat && !isProvider && (
              <>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">خدماتنا</Link>
                <Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors">آلية العمل</Link>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">عن سَنَد</Link>
              </>
            )}
            {isExpat && (
              <Link href="/expat" className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                بوابة الطلبات
              </Link>
            )}
          </nav>

          {/* زر "كُن سَنَداً" (VIP Design) يوجه لصفحة تسجيل الدخول */}
          <div className="hidden md:flex items-center gap-4">
            {!isExpat && !isProvider && (
              <Link
                href="/auth/login"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-slate-900/80 px-2 py-1.5 pr-6 font-bold text-white border border-slate-700 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-md"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative text-sm tracking-wide">كُن سَنَداً</span>
                <div className="relative w-8 h-8 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-colors duration-300">
                  <User className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
                </div>
              </Link>
            )}
            {isExpat && (
              <Link href="/expat/profile" className="rounded-xl bg-slate-800 p-2.5 text-slate-300 hover:bg-emerald-500 hover:text-white transition-all shadow-md">
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>

          <button
            className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-screen w-[80%] max-w-sm bg-slate-950 border-l border-slate-800 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center bg-slate-900 rounded-xl border border-emerald-500/50 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Hexagon className="absolute h-8 w-8 text-emerald-500" strokeWidth={1.5} />
                    <Heart className="relative h-4 w-4 text-cyan-400 fill-cyan-400/20" strokeWidth={2} />
                  </div>
                  <span className="text-2xl font-black text-white tracking-wider mt-1">سَنَد</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
                <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition-colors">
                  <Home className="h-5 w-5" />
                  <span className="font-medium text-lg">الرئيسية</span>
                </Link>
                <Link href="/services" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition-colors">
                  <Briefcase className="h-5 w-5" />
                  <span className="font-medium text-lg">خدماتنا</span>
                </Link>
                <Link href="/about" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition-colors">
                  <Info className="h-5 w-5" />
                  <span className="font-medium text-lg">عن سَنَد</span>
                </Link>
                <Link href="/about" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium text-lg">تواصل معنا</span>
                </Link>

                <div className="h-px bg-slate-800/60 my-6"></div>

                {/* زر الجوال "كُن سَنَداً" يوجه لتسجيل الدخول */}
                <Link href="/auth/login" className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <User className="h-5 w-5" />
                  كُن سَنَداً
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}