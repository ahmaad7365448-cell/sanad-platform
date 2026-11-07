"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, User as UserIcon, Hexagon, Heart, Globe, 
  Home, Layers, Info, PhoneCall, ShieldCheck, FileText
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const meta = session.user.user_metadata || {};
        setAvatarUrl(meta.avatar_url || meta.picture || null);
        setUserName(meta.full_name || meta.name || session.user.email?.split('@')[0] || "مستخدم سَنَد");
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        const meta = session.user.user_metadata || {};
        setAvatarUrl(meta.avatar_url || meta.picture || null);
        setUserName(meta.full_name || meta.name || session.user.email?.split('@')[0] || "مستخدم سَنَد");
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    setIsLangOpen(false);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const languages = [
    { code: 'AR', name: 'العربية' },
    { code: 'EN', name: 'English' },
    { code: 'TR', name: 'Türkçe' },
    { code: 'DE', name: 'Deutsch' }
  ];

  const initialLetter = userName ? userName.charAt(0).toUpperCase() : "S";

  return (
    <>
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#020617]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
          
          {/* الشعار */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ scale: 1.05 }} className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-xl blur-[12px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center bg-slate-950 rounded-xl border border-emerald-500/50 overflow-hidden z-10 shadow-inner">
                <div className="absolute inset-0 bg-emerald-500/10"></div>
                <Hexagon className="absolute h-7 w-7 sm:h-9 sm:w-9 text-emerald-500" strokeWidth={1.5} />
                <Heart className="relative h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" strokeWidth={2} />
              </div>
            </motion.div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white drop-shadow-md leading-none mt-1 uppercase">
                {t.brand?.name || "سَنَد"}
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 tracking-[0.2em] uppercase hidden sm:block mt-1">
                {t.brand?.subtitle || "المنظومة الأولى"}
              </span>
            </div>
          </Link>

          {/* روابط التنقل */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300 relative">
            <Link href="/" className="hover:text-emerald-400 transition-colors">{t.nav?.home || "الرئيسية"}</Link>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">{t.nav?.services || "خدماتنا"}</Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">{t.nav?.about || "عن سَنَد"}</Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">{t.nav?.contact || "تواصل معنا"}</Link>
          </nav>

          {/* الأزرار الجانبية */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {user && (
              <Link href="/expat/profile" className="md:hidden flex items-center gap-2 rounded-xl bg-slate-800/80 p-1 px-3 border border-emerald-500/30 hover:border-emerald-500 shadow-sm transition-all">
                <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  {avatarUrl && !imageError ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      onError={() => setImageError(true)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-emerald-400 font-bold text-xs">{initialLetter}</span>
                  )}
                </div>
                <span className="text-xs font-bold text-emerald-400 truncate max-w-[70px]">{userName}</span>
              </Link>
            )}

            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all text-xs sm:text-sm font-bold shadow-sm outline-none"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{lang}</span>
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-12 rtl:right-0 ltr:left-0 w-36 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-50 py-1 backdrop-blur-xl"
                  >
                    {languages.map((l) => (
                      <button 
                        key={l.code} 
                        onClick={() => changeLanguage(l.code)} 
                        className={`w-full text-start px-4 py-2 text-xs font-medium transition-colors ${
                          lang === l.code ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-emerald-400'
                        }`}
                      >
                        {l.name} ({l.code})
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              {user ? (
                <Link href="/expat/profile" className="flex items-center gap-3 rounded-xl bg-slate-800/80 p-1.5 px-4 border border-emerald-500/30 hover:border-emerald-500 hover:bg-slate-800 transition-all shadow-md">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600 shrink-0">
                    {avatarUrl && !imageError ? (
                      <img 
                        src={avatarUrl} 
                        alt="User" 
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-emerald-400 font-bold text-sm">{initialLetter}</span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-emerald-400 truncate max-w-[120px]">{userName}</span>
                </Link>
              ) : (
                <Link href="/auth/login" className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-slate-900/80 px-2 py-1.5 pr-6 font-bold text-white border border-slate-700 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-md">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative text-sm tracking-wide">{t.nav?.login || "كُن سَنداً"}</span>
                  <div className="relative w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-colors duration-300">
                    <UserIcon className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              )}
            </div>
            
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors z-50 outline-none" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* قائمة الموبايل */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#020617]/95 backdrop-blur-3xl md:hidden"
            dir={lang === "AR" ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center bg-slate-950 rounded-xl border border-emerald-500/50 shadow-inner">
                  <Hexagon className="absolute h-8 w-8 text-emerald-500" strokeWidth={1.5} />
                  <Heart className="relative h-3 w-3 text-cyan-400 fill-cyan-400/20" strokeWidth={2} />
                </div>
                <span className="text-xl font-black text-white">{t.brand?.name || "سَنَد"}</span>
              </div>
              <button 
                onClick={closeMenu}
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-rose-400 transition-colors outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scrollbar-hide">
              <div className="flex flex-col gap-1.5">
                <MobileNavLink href="/" icon={<Home className="w-5 h-5 text-emerald-500" />} text={t.nav?.home || "الرئيسية"} onClick={closeMenu} />
                <MobileNavLink href="/services" icon={<Layers className="w-5 h-5 text-emerald-500" />} text={t.nav?.services || "خدماتنا"} onClick={closeMenu} />
                <MobileNavLink href="/about" icon={<Info className="w-5 h-5 text-emerald-500" />} text={t.nav?.about || "عن سَنَد"} onClick={closeMenu} />
                <MobileNavLink href="/contact" icon={<PhoneCall className="w-5 h-5 text-emerald-500" />} text={t.nav?.contact || "تواصل معنا"} onClick={closeMenu} />
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-1.5">
                <MobileSubLink href="/privacy-policy" icon={<ShieldCheck className="w-4 h-4" />} text="سياسة الخصوصية" onClick={closeMenu} />
                <MobileSubLink href="/terms-of-service" icon={<FileText className="w-4 h-4" />} text="شروط الخدمة" onClick={closeMenu} />
              </div>
            </div>

            {/* الفوتر */}
            <div className="p-5 sm:p-6 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
              {user ? (
                <Link href="/expat/profile" onClick={closeMenu} className="flex justify-center items-center gap-3 w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-black text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-95">
                  <UserIcon className="w-6 h-6" />
                  الملف الشخصي ({userName})
                </Link>
              ) : (
                <Link href="/auth/login" onClick={closeMenu} className="flex justify-center items-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-black text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] active:scale-95">
                  <UserIcon className="w-6 h-6" />
                  {t.nav?.login || "تسجيل الدخول / كُن سَنداً"}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavLink({ href, icon, text, onClick }: { href: string, icon: React.ReactNode, text: string, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 active:bg-white/10 transition-colors group outline-none"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-center shadow-inner group-hover:border-emerald-500/30 transition-colors">
          {icon}
        </div>
        <span className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{text}</span>
      </div>
    </Link>
  );
}

function MobileSubLink({ href, icon, text, onClick }: { href: string, icon: React.ReactNode, text: string, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors text-slate-400 hover:text-slate-200 group outline-none"
    >
      <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}