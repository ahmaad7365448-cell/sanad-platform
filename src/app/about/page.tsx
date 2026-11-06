"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, Globe, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ABOUT_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    badge: "من نحن",
    mainTitle: "نحن سَنَد لأهلك في دمشق",
    description: "تأسست المنصة لتكون الحل الجذر والآمن للمغتربين السوريين. نحن نتفهم صعوبة إيصال الدعم العيني والمالي للداخل، لذلك قمنا ببناء شبكة لوجستية موثوقة تغطي دمشق وريفها لضمان وصول دعمك بكل أمان وسرعة.",
    feature1: "أسعار مطابقة للسوق المحلي بدون عمولات خفية",
    feature2: "جودة وموثوقية عالية في اختيار المنتجات",
    feature3: "دعم فني متواصل على مدار الساعة",
    cardTitle: "منظومة حماية ودعم متكاملة",
    cardSub: "نربطك مباشرة بأهلك في دمشق بأعلى معايير الأمان المالي والشفافية اللوجستية المطلقة.",
    stat1Title: "100% مضمون",
    stat1Sub: "مستوى الموثوقية",
    stat2Title: "دمشق وريفها",
    stat2Sub: "نطاق التغطية"
  },
  EN: {
    backHome: "Back to Home",
    badge: "About Us",
    mainTitle: "We are Sanad for your family in Damascus",
    description: "The platform was established as the ultimate and secure solution for Syrian expatriates. We understand the difficulty of delivering in-kind and financial support back home, so we built a reliable logistical network covering Damascus and its suburbs to ensure your support arrives safely and quickly.",
    feature1: "Prices matching local market with zero hidden fees",
    feature2: "High quality and reliability in product selection",
    feature3: "24/7 continuous technical support",
    cardTitle: "Integrated Protection & Support System",
    cardSub: "Directly connecting you with your family in Damascus using the highest standards of financial security and total logistical transparency.",
    stat1Title: "100% Guaranteed",
    stat1Sub: "Reliability Level",
    stat2Title: "Damascus & Suburbs",
    stat2Sub: "Coverage Area"
  },
  TR: {
    backHome: "Ana Sayfaya Dön",
    badge: "Hakkımızda",
    mainTitle: "Şam'daki aileniz için Sanad'ız",
    description: "Platform, Suriyeli gurbetçiler için temel ve güvenli bir çözüm olmak üzere kuruldu. Ailenize destek ulaştırmanın zorluğunu anlıyoruz; bu nedenle desteğinizin hızlı ve güvenli bir şekilde ulaşmasını sağlamak için Şam ve kırsalını kapsayan güvenilir bir lojistik ağı kurduk.",
    feature1: "Gizli ücret olmadan yerel pazarla eşleşen fiyatlar",
    feature2: "Ürün seçiminde yüksek kalite ve güvenilirlik",
    feature3: "7/24 kesintisiz teknik destek",
    cardTitle: "Entegre Koruma ve Destek Sistemi",
    cardSub: "Sizi Şam'daki ailenize en yüksek finansal güvenlik standartları ve mutlak lojistik şeffaflıkla doğrudan bağlıyoruz.",
    stat1Title: "%100 Garantili",
    stat1Sub: "Güvenilirlik Seviyesi",
    stat2Title: "Şam ve Kırsalı",
    stat2Sub: "Kapsama Alanı"
  },
  DE: {
    backHome: "Zurück zur Startseite",
    badge: "Über uns",
    mainTitle: "Wir sind Sanad für Ihre Familie in Damaskus",
    description: "Die Plattform wurde als fundamentale und sichere Lösung für syrische Auswanderer gegründet. Wir verstehen die Schwierigkeiten bei der Bereitstellung von Unterstützung, daher haben wir ein zuverlässiges Logistiknetzwerk aufgebaut, das Damaskus und seine Umgebung abdeckt.",
    feature1: "Preise wie auf dem lokalen Markt ohne versteckte Gebühren",
    feature2: "Hohe Qualität und Zuverlässigkeit bei der Produktauswahl",
    feature3: "Kontinuierlicher technischer Support rund um die Uhr",
    cardTitle: "Integriertes Schutz- und Unterstützungssystem",
    cardSub: "Wir verbinden Sie direkt mit Ihrer Familie in Damaskus unter Einhaltung höchster Finanzsicherheitsstandards.",
    stat1Title: "100% Garantiert",
    stat1Sub: "Zuverlässigkeitsgrad",
    stat2Title: "Damaskus & Umgebung",
    stat2Sub: "Abdeckungsbereich"
  }
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const currentLang = lang && ABOUT_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const t = ABOUT_TEXTS[currentLang];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 px-6 lg:px-12 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* إضاءات خلفية */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* زر العودة للرئيسية */}
        <div className="flex justify-start mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all text-xs font-bold shadow-md"
          >
            {isRtl ? <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
            <span>{t.backHome}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center my-auto">
          
          {/* الجانب الأيمن / النصوص */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {t.mainTitle}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              {t.description}
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.feature1}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.feature2}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.feature3}</span>
              </div>
            </div>
          </div>

          {/* الجانب الأيسر / الكرت التفاعلي */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden text-center flex flex-col justify-between min-h-[380px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />
            
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              {t.cardTitle}
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-8 font-medium">
              {t.cardSub}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="text-emerald-400 font-black text-lg sm:text-xl mb-1">{t.stat1Title}</div>
                <div className="text-slate-500 text-[11px] font-bold">{t.stat1Sub}</div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="text-emerald-400 font-black text-lg sm:text-xl mb-1">{t.stat2Title}</div>
                <div className="text-slate-500 text-[11px] font-bold">{t.stat2Sub}</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}