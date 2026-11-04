import Link from "next/link";
import { ArrowLeft, Shield, HeartHandshake } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      {/* شبكة الخلفية الفاخرة */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* هالة إضاءة خلفية علوية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-emerald-500/10 blur-[150px] pointer-events-none"></div>

      {/* 1. القسم الرئيسي (Hero) */}
      <main className="relative container mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center z-10">
        
        {/* العبارة الإيمانية المؤثرة (عالية الوضوح والسطوع) */}
        <div className="relative group mb-10 cursor-default z-20">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-full blur-md opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
          <div className="relative flex items-center gap-4 px-6 md:px-8 py-3.5 bg-slate-950/90 ring-1 ring-emerald-500/50 rounded-full backdrop-blur-xl shadow-2xl">
            <div className="p-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <HeartHandshake className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
            <span className="text-lg md:text-xl font-extrabold text-white tracking-wide drop-shadow-md" dir="rtl">
              « أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ »
            </span>
          </div>
        </div>

        {/* الشارة التقنية للمنصة */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 text-emerald-400 text-xs font-bold mb-6 border border-slate-700/80 shadow-lg">
          <Shield className="w-3.5 h-3.5" />
          <span>المنظومة الأولى لخدمة المغتربين السوريين</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-lg">
          منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">سَنَد</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed font-medium">
          الجسر المالي واللوجستي الفوري. اختر ما تحتاجه عائلتك في <strong className="text-emerald-400">دمشق وما حولها</strong>، ادفع بدقة وأمان بالدولار، وتابع التنفيذ لحظة بلحظة.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
          <Link 
            href="/expat" 
            className="group inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_0_35px_rgba(16,185,129,0.4)]"
          >
            بدء التسوق للعائلة
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* الإحصائيات / المميزات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400">&lt; 24 ساعة</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">سرعة التوصيل</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400">100% آمنة</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">حماية المدفوعات</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400">حصرياً</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">دمشق وريفها</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400">0%</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">عمولات خفية</span>
          </div>
        </div>
      </main>

      {/* 2. قسم آلية العمل */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">آلية عمل بسيطة وشفافة</h2>
            <p className="text-slate-400 text-sm sm:text-base font-medium">ثلاث خطوات سهلة تفصلك عن إيصال الدعم لعائلتك بكل موثوقية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"></div>
            
            {[
              { step: "1", title: "اختر المنتجات", desc: "تصفح الأقسام الشاملة واختر ما تحتاجه عائلتك في دمشق بحرية." },
              { step: "2", title: "الدفع الآمن", desc: "ادفع إلكترونياً بالدولار عبر بطاقتك البنكية وبأعلى معايير الحماية." },
              { step: "3", title: "التوصيل والمتابعة", desc: "فريقنا في دمشق يقوم بالتجهيز والتوصيل لباب المنزل مع متابعة لحظية." },
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-2xl font-bold text-emerald-400 mb-6 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}