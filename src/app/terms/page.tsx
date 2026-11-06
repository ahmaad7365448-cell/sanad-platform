"use client";

import { Scale, AlertCircle, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TERMS_TEXTS: Record<string, any> = {
  AR: {
    subtitle: "استخدامك لمنصة سَنَد يعني موافقتك على هذه الشروط التي وُضعت لضمان حقوقك وحقوق المنصة في تقديم خدمة شفافة وموثوقة.",
    term1Title: "1. طبيعة الخدمة والأسعار",
    term1Desc: 'تعمل منصة "سَنَد" كوكيل لوجستي لتمكين المغتربين من تأمين الاحتياجات لعائلاتهم في دمشق وريفها. يتم تسعير كافة الطلبات بالدولار الأمريكي (USD) نظراً لكون الدفع يتم من خارج سوريا، ونضمن أن تكون الأسعار مطابقة لأسعار السوق المحلي الموازية لضمان العدالة وتجنب العمولات المخفية.',
    term2Title: "2. سياسة الإلغاء والاسترجاع",
    term2Intro: "لأن معظم خدماتنا تعتمد على المنتجات الطازجة (كالأغذية واللحوم) أو تسديد الفواتير الفورية:",
    term2Bullet1: "يمكن إلغاء الطلب واسترداد المبلغ بالكامل إذا لم يدخل قيد التنفيذ (عادة خلال أول 3 ساعات من الطلب).",
    term2Bullet2: "بمجرد شراء المنتجات وبدء التوصيل، لا يمكن إلغاء الطلب.",
    term2Bullet3: "في حال وجود تلف أو خطأ في المنتجات المسلّمة للمستفيد في دمشق، نلتزم بالتعويض الكامل أو استبدال المنتج فوراً بناءً على إثبات من المستفيد.",
    term3Title: "3. مسؤولية المستخدم",
    term3Desc: "المستخدم (المغترب) هو المسؤول الأول عن صحة بيانات المستلم (العنوان، أرقام الهواتف المتاحة في سوريا). المنصة لا تتحمل مسؤولية تأخير الطلبات الناتج عن عدم رد المستفيد على الهاتف أو كتابة عنوان خاطئ."
  },
  EN: {
    subtitle: "Your use of the Sanad platform implies your full agreement to these terms, designed to ensure your rights and the platform's rights in providing a transparent and reliable service.",
    term1Title: "1. Nature of Service & Pricing",
    term1Desc: "The 'Sanad' platform acts as a logistics agent enabling expats to secure the needs of their families in Damascus and its suburbs. All orders are priced in US Dollars (USD) since payments are made from outside Syria. We guarantee prices match the parallel local market to ensure fairness and avoid hidden fees.",
    term2Title: "2. Cancellation & Refund Policy",
    term2Intro: "Since most of our services rely on fresh products (like food and meat) or immediate bill payments:",
    term2Bullet1: "Orders can be fully canceled and refunded if they have not yet entered processing (usually within the first 3 hours of the order).",
    term2Bullet2: "Once products are purchased and delivery begins, the order cannot be canceled.",
    term2Bullet3: "In case of damage or errors in the products delivered to the beneficiary in Damascus, we commit to full compensation or immediate replacement based on proof from the beneficiary.",
    term3Title: "3. User Responsibility",
    term3Desc: "The user (expat) is primarily responsible for the accuracy of the recipient's details (address, available phone numbers in Syria). The platform is not responsible for order delays caused by the beneficiary not answering the phone or providing an incorrect address."
  },
  TR: {
    subtitle: "Sanad platformunu kullanmanız, şeffaf ve güvenilir bir hizmet sunarken hem sizin hem de platformun haklarını güvence altına almak için belirlenen bu şartları kabul ettiğiniz anlamına gelir.",
    term1Title: "1. Hizmetin Doğası ve Fiyatlandırma",
    term1Desc: "'Sanad' platformu, gurbetçilerin Şam ve kırsalındaki ailelerinin ihtiyaçlarını karşılamasını sağlayan bir lojistik acentesi olarak çalışır. Ödemeler Suriye dışından yapıldığı için tüm siparişler ABD Doları (USD) üzerinden fiyatlandırılır. Adil olmayı sağlamak ve gizli ücretlerden kaçınmak için fiyatların yerel pazarla eşleşmesini garanti ediyoruz.",
    term2Title: "2. İptal ve İade Politikası",
    term2Intro: "Hizmetlerimizin çoğu taze ürünlere (gıda ve et gibi) veya anında fatura ödemelerine dayandığından:",
    term2Bullet1: "Sipariş işleme alınmadıysa (genellikle ilk 3 saat içinde) tamamen iptal edilebilir ve iade edilebilir.",
    term2Bullet2: "Ürünler satın alınıp teslimat başladığında sipariş iptal edilemez.",
    term2Bullet3: "Şam'daki alıcıya teslim edilen ürünlerde hasar veya hata olması durumunda, alıcının kanıtına dayanarak anında tam tazminat veya ürün değişimi yapmayı taahhüt ediyoruz.",
    term3Title: "3. Kullanıcı Sorumluluğu",
    term3Desc: "Alıcı bilgilerinin (adres, Suriye'de ulaşılabilecek telefon numaraları) doğruluğundan öncelikli olarak kullanıcı (gurbetçi) sorumludur. Platform, alıcının telefona cevap vermemesi veya yanlış adres girilmesinden kaynaklanan gecikmelerden sorumlu değildir."
  },
  DE: {
    subtitle: "Ihre Nutzung der Sanad-Plattform bedeutet Ihr Einverständnis mit diesen Bedingungen, die Ihre Rechte und die der Plattform bei der Bereitstellung eines transparenten und zuverlässigen Dienstes sichern.",
    term1Title: "1. Art der Dienstleistung & Preise",
    term1Desc: "Die Plattform 'Sanad' fungiert als Logistikagent, der es Auswanderern ermöglicht, den Bedarf ihrer Familien in Damaskus und Umgebung zu decken. Da Zahlungen von außerhalb Syriens erfolgen, werden alle Bestellungen in US-Dollar (USD) abgerechnet. Wir garantieren marktübliche Preise, um Fairness zu gewährleisten und versteckte Gebühren zu vermeiden.",
    term2Title: "2. Stornierungs- & Rückerstattungsrichtlinie",
    term2Intro: "Da unsere Dienste meist auf frischen Produkten (wie Lebensmitteln) oder sofortigen Rechnungszahlungen basieren:",
    term2Bullet1: "Bestellungen können vollständig storniert und erstattet werden, wenn die Bearbeitung noch nicht begonnen hat (meist innerhalb der ersten 3 Stunden).",
    term2Bullet2: "Sobald Produkte gekauft wurden und die Lieferung beginnt, ist keine Stornierung mehr möglich.",
    term2Bullet3: "Bei Schäden oder Fehlern an den gelieferten Produkten verpflichten wir uns nach Nachweis des Empfängers zu vollständiger Entschädigung oder sofortigem Ersatz.",
    term3Title: "3. Verantwortung des Nutzers",
    term3Desc: "Der Nutzer ist für die Richtigkeit der Empfängerdaten (Adresse, Telefonnummern in Syrien) verantwortlich. Die Plattform haftet nicht für Verzögerungen, wenn der Empfänger nicht ans Telefon geht oder die Adresse falsch ist."
  }
};

export default function TermsPage() {
  const { lang } = useLanguage();
  const currentLang = lang && TERMS_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const t = TERMS_TEXTS[currentLang];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 px-6 lg:px-12 relative overflow-hidden font-sans" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-4xl relative z-10 pt-4">
        
        {/* النص التمهيدي العلوي */}
        <p className="text-center text-slate-400 text-sm md:text-base leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
          {t.subtitle}
        </p>

        {/* حاوية الكروت */}
        <div className="space-y-8">
          
          {/* الكرت الأول */}
          <div className="bg-[#050b1a] border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-7 h-7 text-cyan-400 shrink-0" strokeWidth={1.5} />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{t.term1Title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {t.term1Desc}
            </p>
          </div>

          {/* الكرت الثاني */}
          <div className="bg-[#050b1a] border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-7 h-7 text-cyan-400 shrink-0" strokeWidth={1.5} />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{t.term2Title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-5 font-medium">
              {t.term2Intro}
            </p>
            <ul className="space-y-4 text-sm text-slate-300 font-medium">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2"></div>
                <span className="leading-relaxed">{t.term2Bullet1}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2"></div>
                <span className="leading-relaxed">{t.term2Bullet2}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-2"></div>
                <span className="leading-relaxed">{t.term2Bullet3}</span>
              </li>
            </ul>
          </div>

          {/* الكرت الثالث */}
          <div className="bg-[#050b1a] border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-7 h-7 text-cyan-400 shrink-0" strokeWidth={1.5} />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{t.term3Title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {t.term3Desc}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}