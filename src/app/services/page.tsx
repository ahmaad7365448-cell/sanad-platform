"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake, Box, HeartPulse, Monitor, Wallet, BookOpen, Gift, Heart } from "lucide-react";

export default function ServicesPage() {
  const allServices = [
    { icon: Box, title: "الغذائيات والمؤونة", desc: "تأمين السلل الغذائية، اللحوم الطازجة، والمواد الأساسية بأعلى معايير الجودة من السوق المحلي." },
    { icon: HeartPulse, title: "الرعاية الطبية والأدوية", desc: "توفير الأدوية المزمنة، تغطية تكاليف التحاليل والمعاينات الطبية عبر أفضل الصيدليات والمراكز." },
    { icon: Monitor, title: "الطاقة والإلكترونيات", desc: "تجهيز منظومات الطاقة الشمسية، البطاريات، والأجهزة المنزلية الأساسية لضمان استقرار العائلة." },
    { icon: BookOpen, title: "التعليم والقرطاسية", desc: "دعم المسيرة التعليمية عبر توفير الحقائب، القرطاسية، وتسديد الأقساط المدرسية والجامعية." },
    { icon: Gift, title: "الألبسة وتجهيز الهدايا", desc: "شراء الألبسة لكافة الأعمار وتجهيز الهدايا المغلفة للمناسبات والأعياد لزرع البسمة." },
    { icon: Wallet, title: "تسديد الفواتير والخدمات", desc: "دفع فواتير الكهرباء، المياه، والاتصالات بشكل فوري لضمان عدم انقطاع الخدمات الأساسية." },
    { icon: Heart, title: "التبرعات والأعمال الخيرية", desc: "إيصال زكاة أموالك وصدقاتك لعائلات محتاجة في دمشق وريفها عبر توزيع وجبات ودعم مالي." },
    { icon: HeartHandshake, title: "طلبات خاصة المفتوحة", desc: "أي احتياجات أخرى غير مدرجة؟ اكتبها لنا وسيقوم فريقنا بتأمينها وتوصيلها بأمان تام." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-500/15 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* زر الرجوع الكبسولي الاحترافي */}
        <div className="flex justify-start mb-12">
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

        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            لأن المسافة لا تقطع حبال الود... <br/>
            <span className="text-emerald-400">نحن هنا لنكون امتداداً ليدك</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            مهما بعدت المسافات، تظل العائلة هي البوصلة. صممنا خدماتنا لتغطي كافة التفاصيل اليومية لأهلك في دمشق وريفها، لنوصل دعمك وحبك لهم بكل أمانة، سرعة، واحترافية عالية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {allServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-lg">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            href="/expat" 
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          >
            الانتقال لبوابة الطلبات
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
        </div>

      </div>
    </div>
  );
}