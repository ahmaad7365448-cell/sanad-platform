"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, HeartHandshake, Box, HeartPulse, Monitor, Wallet, BookOpen, Gift, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SERVICES_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    titlePart1: "لأن المسافة لا تقطع حبال الود...",
    titlePart2: "نحن هنا لنكون امتداداً ليدك",
    subtitle: "مهما بعدت المسافات، تظل العائلة هي البوصلة. صممنا خدماتنا لتغطي كافة التفاصيل اليومية لأهلك في دمشق وريفها، لنوصل دعمك وحبك لهم بكل أمانة، سرعة، واحترافية عالية.",
    ctaButton: "الانتقال لبوابة الطلبات",
    services: [
      { title: "الغذائيات والمؤونة", desc: "تأمين السلل الغذائية، اللحوم الطازجة، والمواد الأساسية بأعلى معايير الجودة من السوق المحلي." },
      { title: "الرعاية الطبية والأدوية", desc: "توفير الأدوية المزمنة، تغطية تكاليف التحاليل والمعاينات الطبية عبر أفضل الصيدليات والمراكز." },
      { title: "الطاقة والإلكترونيات", desc: "تجهيز منظومات الطاقة الشمسية، البطاريات، والأجهزة المنزلية الأساسية لضمان استقرار العائلة." },
      { title: "التعليم والقرطاسية", desc: "دعم المسيرة التعليمية عبر توفير الحقائب، القرطاسية، وتسديد الأقساط المدرسية والجامعية." },
      { title: "الألبسة وتجهيز الهدايا", desc: "شراء الألبسة لكافة الأعمار وتجهيز الهدايا المغلفة للمناسبات والأعياد لزرع البسمة." },
      { title: "تسديد الفواتير والخدمات", desc: "دفع فواتير الكهرباء، المياه، والاتصالات بشكل فوري لضمان عدم انقطاع الخدمات الأساسية." },
      { title: "التبرعات والأعمال الخيرية", desc: "إيصال زكاة أموالك وصدقاتك لعائلات محتاجة في دمشق وريفها عبر توزيع وجبات ودعم مالي." },
      { title: "طلبات خاصة المفتوحة", desc: "أي احتياجات أخرى غير مدرجة؟ اكتبها لنا وسيقوم فريقنا بتأمينها وتوصيلها بأمان تام." }
    ]
  },
  EN: {
    backHome: "Back to Home",
    titlePart1: "Because distance doesn't sever bonds...",
    titlePart2: "We are here to be an extension of your hand",
    subtitle: "No matter how far the distance, family remains the compass. We designed our services to cover all daily details for your family in Damascus and its suburbs, delivering your support and love with absolute honesty, speed, and high professionalism.",
    ctaButton: "Go to Orders Portal",
    services: [
      { title: "Groceries & Provisions", desc: "Securing food baskets, fresh meat, and essential goods with the highest quality standards from the local market." },
      { title: "Medical Care & Medicines", desc: "Providing chronic medications, covering the costs of medical tests and checkups through top pharmacies and centers." },
      { title: "Energy & Electronics", desc: "Equipping solar energy systems, batteries, and essential home appliances to ensure family stability." },
      { title: "Education & Stationery", desc: "Supporting the educational journey by providing bags, stationery, and paying school and university tuition." },
      { title: "Clothing & Gift Preparation", desc: "Buying clothes for all ages and preparing wrapped gifts for occasions and holidays to bring a smile." },
      { title: "Bills & Services Payment", desc: "Paying electricity, water, and telecom bills instantly to ensure continuous basic services." },
      { title: "Donations & Charity", desc: "Delivering your Zakat and charity to needy families in Damascus and its suburbs through meal distribution and financial support." },
      { title: "Open Special Requests", desc: "Any other unlisted needs? Write to us and our team will secure and deliver them with complete safety." }
    ]
  },
  TR: {
    backHome: "Ana Sayfaya Dön",
    titlePart1: "Mesafe bağları koparmaz çünkü...",
    titlePart2: "Elinizin uzantısı olmak için buradayız",
    subtitle: "Mesafe ne kadar uzak olursa olsun, aile pusuladır. Desteğinizi ve sevginizi tam bir dürüstlük, hız ve profesyonellikle ulaştırmak için hizmetlerimizi Şam ve kırsalındaki ailenizin günlük detaylarını kapsayacak şekilde tasarladık.",
    ctaButton: "Sipariş Portalına Git",
    services: [
      { title: "Gıda ve Erzak", desc: "Yerel pazardan en yüksek kalite standartlarında gıda sepetleri, taze et ve temel malzemelerin temini." },
      { title: "Tıbbi Bakım ve İlaçlar", desc: "Kronik ilaçların sağlanması, en iyi eczane ve merkezler aracılığıyla tıbbi tahlil ve muayene masraflarının karşılanması." },
      { title: "Enerji ve Elektronik", desc: "Ailenin istikrarını sağlamak için güneş enerjisi sistemleri, aküler ve temel ev aletlerinin kurulumu." },
      { title: "Eğitim ve Kırtasiye", desc: "Çanta, kırtasiye temini ve okul/üniversite taksitlerinin ödenmesi yoluyla eğitim yolculuğunun desteklenmesi." },
      { title: "Giyim ve Hediye Hazırlama", desc: "Her yaş için kıyafet alımı ve gülümseme getirmek üzere özel günler için paketlenmiş hediyelerin hazırlanması." },
      { title: "Fatura ve Hizmet Ödemeleri", desc: "Temel hizmetlerin kesintisiz olmasını sağlamak için elektrik, su ve iletişim faturalarının anında ödenmesi." },
      { title: "Bağışlar ve Hayır İşleri", desc: "Zekat ve sadakalarınızı yemek dağıtımı ve mali destek yoluyla Şam ve kırsalındaki ihtiyaç sahibi ailelere ulaştırma." },
      { title: "Açık Özel Talepler", desc: "Listelenmeyen başka bir ihtiyacınız mı var? Bize yazın, ekibimiz güvenle temin edip ulaştırsın." }
    ]
  },
  DE: {
    backHome: "Zurück zur Startseite",
    titlePart1: "Weil Distanz keine Bande trennt...",
    titlePart2: "Wir sind hier, um die Verlängerung Ihrer Hand zu sein",
    subtitle: "Egal wie weit die Distanz ist, die Familie bleibt der Kompass. Wir haben unsere Dienste so konzipiert, dass sie alle täglichen Details Ihrer Familie in Damaskus und Umgebung abdecken, um Ihre Unterstützung und Liebe mit absoluter Ehrlichkeit, Schnelligkeit und hoher Professionalität zu überbringen.",
    ctaButton: "Zum Bestellportal",
    services: [
      { title: "Lebensmittel & Vorräte", desc: "Sicherung von Lebensmittelkörben, frischem Fleisch und Grundgütern nach höchsten Qualitätsstandards vom lokalen Markt." },
      { title: "Medizinische Versorgung & Medikamente", desc: "Bereitstellung chronischer Medikamente, Übernahme der Kosten für medizinische Tests und Untersuchungen über Top-Apotheken." },
      { title: "Energie & Elektronik", desc: "Ausstattung mit Solarenergiesystemen, Batterien und Haushaltsgeräten zur Gewährleistung der familiären Stabilität." },
      { title: "Bildung & Schreibwaren", desc: "Unterstützung des Bildungswegs durch Bereitstellung von Taschen, Schreibwaren und Bezahlung von Schul- und Universitätsgebühren." },
      { title: "Kleidung & Geschenkvorbereitung", desc: "Kauf von Kleidung für alle Altersgruppen und Vorbereitung verpackter Geschenke für Anlässe und Feiertage." },
      { title: "Rechnungs- & Dienstleistungszahlung", desc: "Sofortige Bezahlung von Strom-, Wasser- und Telekommunikationsrechnungen zur Sicherung der Grundversorgung." },
      { title: "Spenden & Wohltätigkeit", desc: "Überbringung Ihrer Zakat und Almosen an Bedürftige in Damaskus und Umgebung durch Essensverteilung und finanzielle Unterstützung." },
      { title: "Offene Sonderwünsche", desc: "Andere nicht aufgeführte Bedürfnisse? Schreiben Sie uns und unser Team wird sie sicher beschaffen und liefern." }
    ]
  }
};

export default function ServicesPage() {
  const { lang } = useLanguage();
  const currentLang = lang && SERVICES_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = SERVICES_TEXTS[currentLang];

  const iconsList = [Box, HeartPulse, Monitor, BookOpen, Gift, Wallet, Heart, HeartHandshake];

  const allServices = ui.services.map((service: any, idx: number) => ({
    ...service,
    icon: iconsList[idx]
  }));

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-500/15 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* زر الرجوع الكبسولي الاحترافي */}
        <div className="flex justify-start mb-12">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 transition-colors">
              {isRtl ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
            </div>
            {ui.backHome}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            {ui.titlePart1} <br/>
            <span className="text-emerald-400">{ui.titlePart2}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            {ui.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {allServices.map((service: any, idx: number) => {
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
            {ui.ctaButton}
            {isRtl ? (
              <ArrowRight className="w-5 h-5 rotate-180" />
            ) : (
              <ArrowLeft className="w-5 h-5 rotate-180" />
            )}
          </Link>
        </div>

      </div>
    </div>
  );
}