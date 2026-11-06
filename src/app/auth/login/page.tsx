"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Hexagon, Heart, Sparkles, Quote, ArrowUpRight, ArrowUpLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

const LOGIN_TEXTS: Record<string, any> = {
  AR: {
    homeBtn: "الرئيسية",
    brandName: "سَنَد",
    heroTitle: "بين الغربة والوطن..",
    heroDesc: "عطاؤك يختصر المسافات، ويصنع في قلب العائلة ابتسامة لا تغيب.",
    quoteText: "أهلاً بك مجدداً يا سَنَد العائلة.",
    badgeText: "استمر في مسيرة العطاء.",
    title: "تسجيل الدخول",
    subtitle: "أهلاً بك مجدداً في عائلة سَنَد.",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    submitBtn: "الدخول للمنصة",
    loadingBtn: "جاري تسجيل الدخول...",
    orText: "أو الدخول عبر",
    noAccount: "ليس لديك حساب؟",
    signupLink: "إنشاء حساب جديد",
    errorMsg: "البريد الإلكتروني أو كلمة المرور غير صحيحة."
  },
  EN: {
    homeBtn: "Home",
    brandName: "SANAD",
    heroTitle: "Between exile and homeland..",
    heroDesc: "Your giving shortens distances, creating an endless smile in the heart of your family.",
    quoteText: "Welcome back, the pillar of your family.",
    badgeText: "Continue your journey of giving.",
    title: "Log In",
    subtitle: "Welcome back to the Sanad family.",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    submitBtn: "Enter Platform",
    loadingBtn: "Logging in...",
    orText: "Or login with",
    noAccount: "Don't have an account?",
    signupLink: "Create new account",
    errorMsg: "Incorrect email or password."
  },
  TR: {
    homeBtn: "Ana Sayfa",
    brandName: "SANAD",
    heroTitle: "Gurbet ve memleket arasında..",
    heroDesc: "Bağışınız mesafeleri kısaltır, ailenizin kalbinde bitmeyen bir gülümseme yaratır.",
    quoteText: "Tekrar hoş geldiniz, ailenizin dayanağı.",
    badgeText: "Bağış yolculuğunuza devam edin.",
    title: "Giriş Yap",
    subtitle: "Sanad ailesine tekrar hoş geldiniz.",
    emailLabel: "E-posta Adresi",
    passwordLabel: "Şifre",
    submitBtn: "Platforma Gir",
    loadingBtn: "Giriş yapılıyor...",
    orText: "Veya şununla giriş yap",
    noAccount: "Hesabınız yok mu?",
    signupLink: "Yeni hesap oluştur",
    errorMsg: "E-posta veya şifre hatalı."
  },
  DE: {
    homeBtn: "Startseite",
    brandName: "SANAD",
    heroTitle: "Zwischen Fremde und Heimat..",
    heroDesc: "Ihr Geben verkürzt Distanzen und zaubert ein unendliches Lächeln in die Herzen Ihrer Familie.",
    quoteText: "Willkommen zurück, die Stütze Ihrer Familie.",
    badgeText: "Setzen Sie Ihre Reise des Gebens fort.",
    title: "Anmelden",
    subtitle: "Willkommen zurück in der Sanad-Familie.",
    emailLabel: "E-Mail-Adresse",
    passwordLabel: "Passwort",
    submitBtn: "Plattform betreten",
    loadingBtn: "Anmeldung...",
    orText: "Oder anmelden mit",
    noAccount: "Haben Sie kein Konto?",
    signupLink: "Neues Konto erstellen",
    errorMsg: "Falsche E-Mail oder Passwort."
  }
};

export default function LoginPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push("/expat");
    };
    checkUser();
  }, [router]);

  const currentLang = lang && LOGIN_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = LOGIN_TEXTS[currentLang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        router.push("/expat");
      }
    } catch (err: any) {
      console.error("Login Error:", err.message);
      setError(ui.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/expat`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      console.error(`${provider} Auth Error:`, err.message);
      setError(ui.errorMsg);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-5xl min-h-[650px] bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row relative z-10">
        
        <Link 
          href="/" 
          className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} z-50 group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-300 hover:text-cyan-400 transition-all backdrop-blur-md text-sm font-medium`}
        >
          {isRtl ? (
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <ArrowUpLeft className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 transition-transform" />
          )}
          {ui.homeBtn}
        </Link>

        {/* القسم الأيمن (الجمالي) */}
        <div className={`lg:w-5/12 bg-gradient-to-br from-cyan-950/80 to-slate-950 p-10 lg:p-12 relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 ${isRtl ? 'lg:border-l' : 'lg:border-r'} border-white/5`}>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>

          {/* اللوجو */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center bg-black/40 rounded-xl border border-cyan-500/30 shadow-inner backdrop-blur-sm">
              <Hexagon className="absolute h-9 w-9 text-cyan-400" strokeWidth={1.5} />
              <Heart className="relative h-4 w-4 text-emerald-300 fill-emerald-300/20" strokeWidth={2} />
            </div>
            <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg">{ui.brandName}</span>
          </div>

          {/* العبارة المؤثرة الجديدة (المكان الفارغ سابقاً) */}
          <div className="relative z-10 flex-grow flex flex-col justify-center my-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 leading-snug drop-shadow-sm">
                {ui.heroTitle}
              </h3>
              <p className={`text-lg text-slate-300/90 font-medium leading-relaxed ${isRtl ? 'border-r-4 pr-5 bg-gradient-to-l' : 'border-l-4 pl-5 bg-gradient-to-r'} border-emerald-500/40 from-emerald-500/10 to-transparent py-3 rounded-2xl shadow-inner`}>
                {ui.heroDesc}
              </p>
            </div>
          </div>

          {/* الاقتباس السفلي */}
          <div className="relative z-10 mt-auto">
            <Quote className="w-10 h-10 text-cyan-400/20 mb-4 rotate-180" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-[1.4] drop-shadow-md">
              {ui.quoteText}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
              <p className="text-cyan-300 font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {ui.badgeText}
              </p>
            </div>
          </div>
        </div>

        {/* نموذج الدخول */}
        <div className="lg:w-7/12 p-10 lg:p-14 relative flex flex-col justify-center bg-slate-950/50">
          <div className="w-full max-w-sm mx-auto">
            <div className={`mb-8 text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'} pt-8 lg:pt-0`}>
              <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">{ui.title}</h1>
              <p className="text-slate-400 text-sm font-medium">{ui.subtitle}</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{ui.emailLabel}</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full bg-black/20 border border-white/10 rounded-xl py-3 ${isRtl ? 'pl-4 pr-11' : 'pr-4 pl-11'} text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all backdrop-blur-sm disabled:opacity-50`}
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{ui.passwordLabel}</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full bg-black/20 border border-white/10 rounded-xl py-3 ${isRtl ? 'pl-4 pr-11' : 'pr-4 pl-11'} text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all backdrop-blur-sm disabled:opacity-50`}
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-cyan-500/30 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] text-base font-extrabold text-white bg-gradient-to-r from-cyan-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 transition-all transform hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {ui.loadingBtn}
                  </>
                ) : (
                  <>
                    {ui.submitBtn}
                    <LogIn className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider font-bold">
                  <span className="px-4 bg-slate-950 text-slate-500">{ui.orText}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleOAuthLogin('google')} 
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleOAuthLogin('facebook')} 
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  Facebook
                </button>
              </div>
            </div>

            <div className="mt-8 text-center pt-5 border-t border-white/5">
              <p className="text-slate-400 text-sm font-medium">{ui.noAccount} <Link href="/auth/signup" className={`font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors ${isRtl ? 'ml-1' : 'mr-1'}`}>{ui.signupLink}</Link></p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}