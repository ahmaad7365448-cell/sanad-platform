"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ShieldCheck, Hexagon, Heart, Sparkles, Quote, ArrowRight, AlertCircle, Fingerprint, Zap } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("جاري تسجيل الدخول...", { email, password });
    }
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`جاري تسجيل الدخول بواسطة ${provider}...`);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden" dir="rtl">
      {/* إضاءات خلفية كونية متوهجة */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* الحاوية الزجاجية الكبرى */}
      <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] shadow-[0_20px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row relative z-10">
        
        {/* القسم الأيمن: الاقتباس والهوية الإنسانية */}
        <div className="lg:w-5/12 bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 p-8 sm:p-12 lg:p-14 relative flex flex-col justify-center overflow-hidden border-b lg:border-b-0 lg:border-l border-slate-800">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <Hexagon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] text-emerald-500/[0.03] pointer-events-none" strokeWidth={0.5} />

          {/* اللوغو */}
          <Link href="/" className="relative z-10 flex items-center gap-3 w-fit group mb-12">
            <div className="relative flex h-12 w-12 items-center justify-center bg-slate-950 rounded-2xl border border-emerald-500/40 shadow-inner group-hover:scale-105 transition-transform">
              <Hexagon className="absolute h-8 w-8 text-emerald-400" strokeWidth={1.5} />
              <Heart className="relative h-4 w-4 text-cyan-300 fill-cyan-300/20" strokeWidth={2} />
            </div>
            <span className="text-3xl font-black text-white tracking-widest">سَنَد</span>
          </Link>

          {/* العبارة المؤثرة والمميزات */}
          <div className="relative z-10 flex flex-col justify-center gap-8">
            <div>
              <Quote className="w-12 h-12 text-emerald-400/20 mb-6 rotate-180" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-relaxed">
                لأنك الأمان في زمن الغربة، واليد التي تمتد بالخير.
              </h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-emerald-500 rounded-full"></div>
                <p className="text-emerald-400 font-bold text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  نحن هنا لنصل عطاءك.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-3 rounded-xl backdrop-blur-sm">
                <div className="bg-emerald-500/10 p-2 rounded-lg"><Fingerprint className="w-5 h-5 text-emerald-400" /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">أمان مشفر</h4>
                  <p className="text-xs text-slate-400">بياناتك محمية بأعلى المعايير</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-3 rounded-xl backdrop-blur-sm">
                <div className="bg-cyan-500/10 p-2 rounded-lg"><Zap className="w-5 h-5 text-cyan-400" /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">استجابة سريعة</h4>
                  <p className="text-xs text-slate-400">فريق سند معك على مدار الساعة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* القسم الأيسر: نموذج تسجيل الدخول */}
        <div className="lg:w-7/12 p-8 sm:p-12 lg:p-14 relative flex flex-col justify-center bg-slate-950/40">
          
          {/* زر العودة للرئيسية - تم وضعه في الزاوية العلوية اليسرى بتصميم احترافي */}
          <Link 
            href="/" 
            className="absolute top-6 left-6 sm:top-8 sm:left-8 group inline-flex items-center gap-2 px-3 py-2 bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/30 rounded-xl backdrop-blur-md transition-all text-xs font-bold text-slate-400 hover:text-emerald-400 z-20 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            العودة للرئيسية
          </Link>

          <div className="w-full max-w-md mx-auto mt-6 sm:mt-0">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">تسجيل الدخول</h1>
              <p className="text-slate-400 text-sm">مرحباً بك مجدداً في بوابة السَّنَد.</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin} noValidate>
              
              {/* حقل البريد الإلكتروني */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">البريد الإلكتروني</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-500 group-focus-within:text-emerald-400'}`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: false });
                    }}
                    className={`block w-full bg-slate-900/80 border rounded-xl py-3 pl-4 pr-11 text-white placeholder-slate-600 focus:outline-none transition-all text-sm ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                        : "border-slate-700/80 focus:border-emerald-500"
                    }`}
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> هذا الحقل مطلوب
                  </p>
                )}
              </div>

              {/* حقل كلمة المرور */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">كلمة المرور</label>
                  <Link href="#" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">نسيت الكلمة؟</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${errors.password ? 'text-red-500' : 'text-slate-500 group-focus-within:text-emerald-400'}`} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: false });
                    }}
                    className={`block w-full bg-slate-900/80 border rounded-xl py-3 pl-4 pr-11 text-white placeholder-slate-600 focus:outline-none transition-all text-sm ${
                      errors.password 
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                        : "border-slate-700/80 focus:border-emerald-500"
                    }`}
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> هذا الحقل مطلوب
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-2"
              >
                دخول آمن
                <ShieldCheck className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider font-bold">
                  <span className="px-3 bg-slate-950 text-slate-500">أو المتابعة عبر</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => handleOAuthLogin('google')} className="flex items-center justify-center gap-2 rounded-xl bg-slate-900/80 px-4 py-3 text-xs font-bold text-slate-300 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button onClick={() => handleOAuthLogin('facebook')} className="flex items-center justify-center gap-2 rounded-xl bg-slate-900/80 px-4 py-3 text-xs font-bold text-slate-300 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}