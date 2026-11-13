"use client";

import Link from "next/link";
import { 
  Store, Car, Smartphone, Sofa, Shirt, ArrowRight, ArrowLeft, 
  ShoppingBasket, Beef, Pill, Sun, BookOpen, Receipt, Sparkles, HeartHandshake
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoriesPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "AR" || !lang;

  // 1. الأقسام الجديدة (السوق التجاري)
  const marketCategories = [
    { id: 'real-estate', name: 'عقارات', desc: 'شقق، أراضي، ومحلات تجارية', icon: Store, color: 'from-amber-400 to-orange-500' },
    { id: 'vehicles', name: 'سيارات ومحركات', desc: 'سيارات، دراجات نارية، وقطع غيار', icon: Car, color: 'from-blue-400 to-indigo-500' },
    { id: 'electronics', name: 'إلكترونيات', desc: 'هواتف، شاشات، وأجهزة ذكية', icon: Smartphone, color: 'from-purple-400 to-fuchsia-500' },
    { id: 'home', name: 'أثاث منزلي', desc: 'مفروشات، ديكور، ومستلزمات منزلية', icon: Sofa, color: 'from-rose-400 to-red-500' },
    { id: 'fashion', name: 'أزياء وملابس', desc: 'ملابس رجالية، نسائية، أطفال وأحذية', icon: Shirt, color: 'from-teal-400 to-emerald-500' },
  ];

  // 2. الأقسام القديمة (خدمات الدعم العائلي)
  const supportCategories = [
    { id: 'food', name: 'سلة غذائية ومؤونة', desc: 'تجهيز السلال والمؤونة حسب الطلب', icon: ShoppingBasket, color: 'from-emerald-400 to-green-600' },
    { id: 'meat', name: 'لحوم طازجة', desc: 'لحوم عجل وخروف طازجة يومياً', icon: Beef, color: 'from-red-400 to-rose-600' },
    { id: 'medicine', name: 'أدوية وعلاجات مزمنة', desc: 'تأمين الأدوية من الصيدليات المعتمدة', icon: Pill, color: 'from-cyan-400 to-blue-500' },
    { id: 'solar', name: 'منظومة طاقة شمسية', desc: 'ألواح، بطاريات، وإنفرترات طاقة', icon: Sun, color: 'from-yellow-400 to-amber-500' },
    { id: 'school', name: 'مستلزمات مدرسية', desc: 'حقائب، قرطاسية، وأقساط طلاب', icon: BookOpen, color: 'from-indigo-400 to-violet-500' },
    { id: 'bills', name: 'تسديد فواتير', desc: 'دفع فواتير الكهرباء، المياه والاتصالات', icon: Receipt, color: 'from-slate-400 to-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-16 px-4 md:px-8 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* خلفية جمالية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* الترويسة وزر العودة */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              أقسام <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">المنصة</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              اختر القسم الذي تريد التسوق منه لعائلتك في سوريا. المنصة تدعم السوق التجاري وخدمات الدعم العائلي.
            </p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/50 text-white font-medium transition-all backdrop-blur-md group">
            {isRtl ? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />}
            العودة للرئيسية
          </Link>
        </div>

        {/* ----------------- قسم السوق التجاري ----------------- */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 inline-flex">
             <Sparkles className="w-6 h-6 text-cyan-400" />
             <h2 className="text-2xl font-bold text-white tracking-wide">السوق التجاري <span className="text-slate-400 text-lg font-normal">(منتجات وبائعين)</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketCategories.map((cat) => (
              <Link href={`/categories/${cat.id}`} key={cat.id} className="group relative bg-slate-900/50 border border-slate-800/80 rounded-[2rem] p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-lg hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="flex items-start gap-5 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <h2 className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors mb-2">{cat.name}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ----------------- قسم خدمات الدعم العائلي ----------------- */}
        <div>
          <div className="flex items-center gap-3 mb-8 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 inline-flex">
             <HeartHandshake className="w-6 h-6 text-emerald-400" />
             <h2 className="text-2xl font-bold text-white tracking-wide">بوابة الدعم العائلي <span className="text-slate-400 text-lg font-normal">(مفتوح حسب الطلب)</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((cat) => (
              <Link href={`/categories/${cat.id}`} key={cat.id} className="group relative bg-slate-900/50 border border-slate-800/80 rounded-[2rem] p-6 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-lg hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="flex items-start gap-5 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <h2 className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors mb-2">{cat.name}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}