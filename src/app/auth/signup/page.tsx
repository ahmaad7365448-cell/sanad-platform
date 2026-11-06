"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck, Hexagon, Heart, Sparkles, Quote, User, ArrowUpRight, ArrowUpLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

const SIGNUP_TEXTS: Record<string, any> = {
  AR: {
    homeBtn: "الرئيسية",
    brandName: "سَنَد",
    quoteText: "خطوة واحدة لتكون السَّنَد الذي تعتمد عليه عائلتك.",
    badgeText: "انضم لعائلة الداعمين الآن.",
    title: "إنشاء حساب جديد",
    subtitle: "ابدأ رحلة العطاء بكل أمان وسهولة.",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "الاسم الثلاثي",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    submitBtn: "تأكيد وبدء العطاء",
    loadingBtn: "جاري إنشاء الحساب...",
    orText: "أو التسجيل عبر",
    hasAccount: "لديك حساب بالفعل؟",
    loginLink: "تسجيل الدخول",
    errorMsg: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى."
  },
  EN: {
    homeBtn: "Home",
    brandName: "SANAD",
    quoteText: "One step to be the pillar your family depends on.",
    badgeText: "Join the family of supporters now.",
    title: "Create New Account",
    subtitle: "Start your journey of giving safely and easily.",
    nameLabel: "Full Name",
    namePlaceholder: "Full Name",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    submitBtn: "Confirm & Start Giving",
    loadingBtn: "Creating account...",
    orText: "Or register with",
    hasAccount: "Already have an account?",
    loginLink: "Log In",
    errorMsg: "An error occurred during registration. Please try again."
  },
  TR: {
    homeBtn: "Ana Sayfa",
    brandName: "SANAD",
    quoteText: "Ailenizin güvendiği dayanak olmak için sadece bir adım.",
    badgeText: "Destekçiler ailesine şimdi katılın.",
    title: "Yeni Hesap Oluştur",
    subtitle: "Güvenle ve kolayca bağış yolculuğunuza başlayın.",
    nameLabel: "Ad Soyad",
    namePlaceholder: "Ad Soyad",
    emailLabel: "E-posta Adresi",
    passwordLabel: "Şifre",
    submitBtn: "Onayla ve Bağışa Başla",
    loadingBtn: "Hesap oluşturuluyor...",
    orText: "Veya şununla kaydol",
    hasAccount: "Zaten hesabınız var mı?",
    loginLink: "Giriş Yap",
    errorMsg: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
  },
  DE: {
    homeBtn: "Startseite",
    brandName: "SANAD",
    quoteText: "Ein Schritt, um die Stütze zu sein, auf die sich Ihre Familie verlässt.",
    badgeText: "Treten Sie jetzt der Unterstützerfamilie bei.",
    title: "Neues Konto erstellen",
    subtitle: "Beginnen Sie Ihre Reise des Gebens sicher und einfach.",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "Vollständiger Name",
    emailLabel: "E-Mail-Adresse",
    passwordLabel: "Passwort",
    submitBtn: "Bestätigen & Geben beginnen",
    loadingBtn: "Konto wird erstellt...",
    orText: "Oder registrieren mit",
    hasAccount: "Haben Sie bereits ein Konto?",
    loginLink: "Anmelden",
    errorMsg: "Während der Registrierung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
  }
};

export default function SignupPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const currentLang = lang && SIGNUP_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = SIGNUP_TEXTS[currentLang];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // إرسال البيانات إلى Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name, // حفظ اسم المستخدم في الـ metadata
          }
        }
      });

      if (signUpError) throw signUpError;

      // عند النجاح، توجيه المستخدم إلى بوابة الطلبات
      if (data.user) {
        router.push("/expat");
      }
    } catch (err: any) {
      console.error("Signup Error:", err.message);
      setError(ui.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'facebook') => {
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

        {/* القسم الأيمن: الاقتباس */}
        <div className={`lg:w-5/12 bg-gradient-to-br from-cyan-950/80 to-slate-950 p-10 lg:p-12 relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 ${isRtl ? 'lg:border-l' : 'lg:border-r'} border-white/5`}>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center bg-black/40 rounded-xl border border-cyan-500/30 shadow-inner backdrop-blur-sm">
              <Hexagon className="absolute h-9 w-9 text-cyan-400" strokeWidth={1.5} />
              <Heart className="relative h-4 w-4 text-emerald-300 fill-emerald-300/20" strokeWidth={2} />
            </div>
            <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg">{ui.brandName}</span>
          </div>

          <div className="relative z-10 mt-12 lg:mt-0 lg:mb-10">
            <Quote className="w-12 h-12 text-cyan-400/20 mb-6 rotate-180" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-[1.4] drop-shadow-md">
              {ui.quoteText}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
              <p className="text-cyan-300 font-bold text-lg tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                {ui.badgeText}
              </p>
            </div>
          </div>
        </div>

        {/* القسم الأيسر: نموذج الإنشاء */}
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

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{ui.nameLabel}</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`block w-full bg-black/20 border border-white/10 rounded-xl py-3 ${isRtl ? 'pl-4 pr-11' : 'pr-4 pl-11'} text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all backdrop-blur-sm disabled:opacity-50`}
                    placeholder={ui.namePlaceholder}
                  />
                </div>
              </div>

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
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-cyan-500/30 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] text-base font-extrabold text-white bg-gradient-to-r from-cyan-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 transition-all transform hover:-translate-y-0.5 mt-6 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {ui.loadingBtn}
                  </>
                ) : (
                  <>
                    {ui.submitBtn}
                    <ShieldCheck className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider font-bold">
                  <span className="px-4 bg-slate-950 text-slate-500">{ui.orText}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleOAuthSignup('google')} 
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleOAuthSignup('facebook')} 
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  Facebook
                </button>
              </div>
            </div>

            <div className="mt-6 text-center pt-4 border-t border-white/5">
              <p className="text-slate-400 text-sm font-medium">{ui.hasAccount} <Link href="/auth/login" className={`font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors ${isRtl ? 'ml-1' : 'mr-1'}`}>{ui.loginLink}</Link></p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}