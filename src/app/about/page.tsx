"use client";

import Link from "next/link";
import { ArrowRight, Shield, CheckCircle, MapPin, Phone, Mail, Globe, Target, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-500/10 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* زر الرجوع الكبسولي الاحترافي */}
        <div className="flex justify-start mb-10 md:mb-12">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
            العودة للرئيسية
          </Link>
        </div>

        {/* 1. قسم من نحن (بالتصميم الزجاجي المتفوق) */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-sm font-medium mb-6 shadow-lg shadow-emerald-500/5">
              <Globe className="w-4 h-4" />
              <span>من نحن</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              نحن <span className="text-emerald-400">سَنَد</span> لأهلك في دمشق
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
              تأسست المنصة لتكون الحل الجذري والآمن للمغتربين السوريين. نحن نتفهم صعوبة إيصال الدعم العيني والمالي للداخل، لذلك قمنا ببناء شبكة لوجستية موثوقة تغطي دمشق وريفها لضمان وصول دعمك بكل أمان وسرعة.
            </p>
            <ul className="space-y-6">
              {["أسعار مطابقة للسوق المحلي بدون عمولات خفية", "جودة وموثوقية عالية في اختيار المنتجات", "دعم فني متواصل على مدار الساعة"].map((point, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-300 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 relative w-full">
            <div className="absolute -inset-10 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-[120px] -z-10 rounded-full"></div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 flex flex-col items-center justify-center text-center shadow-2xl group hover:border-emerald-500/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">منظومة حماية ودعم متكاملة</h3>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
                نربطك مباشرة بأهلك في دمشق بأعلى معايير الأمان المالي والشفافية اللوجستية المطلقة.
              </p>
              <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 p-4 rounded-2xl flex items-center justify-around shadow-xl">
                <div className="flex flex-col items-center">
                  <span className="text-emerald-400 font-bold text-lg">دمشق وريفها</span>
                  <span className="text-slate-500 text-xs">نطاق التغطية</span>
                </div>
                <div className="w-[1px] h-8 bg-slate-800"></div>
                <div className="flex flex-col items-center">
                  <span className="text-cyan-400 font-bold text-lg">مضمون 100%</span>
                  <span className="text-slate-500 text-xs">مستوى الموثوقية</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. قسم الرؤية والرسالة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] hover:border-emerald-500/30 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">رؤيتنا</h3>
            <p className="text-slate-400 leading-relaxed">
              أن نكون المنصة الرقمية الأولى والأكثر أماناً وموثوقية التي تربط المغتربين السوريين بعائلاتهم، لتصبح "سَنَد" الشريان الحيوي الذي يسهل إيصال الدعم وتلبية كافة الاحتياجات المعيشية بضغطة زر.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] hover:border-emerald-500/30 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">رسالتنا</h3>
            <p className="text-slate-400 leading-relaxed">
              تخفيف أعباء الغربة من خلال توفير حلول لوجستية ومالية مبتكرة ومستقرة، تضمن وصول المنتجات والخدمات لعائلاتنا في دمشق وريفها بأعلى جودة، وأسرع وقت، وبأقل التكاليف الممكنة.
            </p>
          </div>
        </div>

        {/* 3. قسم تواصل معنا الاحترافي */}
        <div className="relative border-t border-slate-800/60 pt-24 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">هل لديك استفسار؟ <span className="text-emerald-400">تواصل معنا</span></h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto">
            فريق الدعم الفني متواجد على مدار الساعة للرد على كافة أسئلتك وضمان تجربة استخدام سلسة وآمنة لك ولعائلتك.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 flex flex-col items-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">الإدارة العامة</h4>
              <p className="text-slate-400 text-sm text-center leading-relaxed">تركيا، بورصا، عثمان غازي<br/>الرمز البريدي: 16165</p>
            </div>
            
            <a href="https://wa.me/905423456316" target="_blank" rel="noreferrer" className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 flex flex-col items-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-[#25D366]/20 group-hover:text-[#25D366] transition-all duration-300">
                <Phone className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">رقم الهاتف / واتساب</h4>
              <p className="text-slate-400 text-sm text-center" dir="ltr">+90 542 345 63 16</p>
            </a>
            
            <a href="mailto:aborame5230200@icloud.com" className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 flex flex-col items-center group hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-[#EA4335]/20 group-hover:text-[#EA4335] transition-all duration-300">
                <Mail className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">البريد الإلكتروني</h4>
              <p className="text-slate-400 text-sm text-center">aborame5230200@icloud.com</p>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}