"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Shield, Eye, Lock, CheckCircle, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PRIVACY_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    title: "سياسة الخصوصية",
    subtitle: "في منصة سَنَد، ندرك تماماً حساسية البيانات الشخصية والمالية للمغتربين وعائلاتهم. وثيقتنا هذه تشرح بشفافية مطلقة كيف نحمي بياناتك.",
    sec1Title: "1. البيانات التي نجمعها",
    sec1Desc: "نحن نجمع فقط البيانات الضرورية لتنفيذ الخدمات وإيصالها بسلامة:",
    sec1Bullet1: "معلومات حساب المغترب (الاسم، البريد الإلكتروني، رقم الهاتف).",
    sec1Bullet2: "تفاصيل المستفيد في دمشق وريفها (الاسم، العنوان الدقيق، رقم التواصل اللوجستي).",
    sec1NoteStart: "ملاحظة: ",
    sec1NoteBold: "لا نحتفظ إطلاقاً",
    sec1NoteEnd: " ببيانات بطاقتك الائتمانية، حيث تتم معالجتها بالكامل عبر بوابات دفع عالمية مشفرة (Lemon Squeezy/Stripe).",
    sec2Title: "2. حماية البيانات ومشاركتها",
    sec2Desc: "تُحفظ بياناتك في قواعد بيانات سحابية مشفرة (Supabase). نحن لا نبيع ولا نؤجر بياناتك لأي طرف ثالث. تتم مشاركة اسم ورقم المستفيد وعنوانه حصرياً مع فريقنا الميداني في دمشق الموثوق والمعتمد، وذلك لغرض إيصال الطلبات فقط.",
    sec3Title: "3. التحديثات وحقوقك",
    sec3Desc: "يحق لك في أي وقت طلب حذف حسابك وكافة بياناتك وسجلات طلباتك عبر مراسلة الدعم الفني. قد نقوم بتحديث هذه السياسة، وسنعلمك بأي تغييرات جوهرية عبر البريد الإلكتروني."
  },
  EN: {
    backHome: "Back to Home",
    title: "Privacy Policy",
    subtitle: "At Sanad, we fully understand the sensitivity of personal and financial data for expatriates and their families. This document transparently explains how we protect your data.",
    sec1Title: "1. Data We Collect",
    sec1Desc: "We only collect data necessary to execute and deliver services safely:",
    sec1Bullet1: "Expat account information (Name, Email, Phone number).",
    sec1Bullet2: "Beneficiary details in Damascus & suburbs (Name, Exact address, Contact number).",
    sec1NoteStart: "Note: ",
    sec1NoteBold: "We NEVER store",
    sec1NoteEnd: " your credit card details; payments are processed securely via encrypted global gateways (Lemon Squeezy/Stripe).",
    sec2Title: "2. Data Protection & Sharing",
    sec2Desc: "Your data is stored in encrypted cloud databases (Supabase). We do not sell or rent your data to any third party. The beneficiary's name, number, and address are shared exclusively with our trusted and certified field team in Damascus, solely for the purpose of delivering orders.",
    sec3Title: "3. Updates & Your Rights",
    sec3Desc: "You have the right at any time to request the deletion of your account, all your data, and order records by contacting technical support. We may update this policy, and we will notify you of any material changes via email."
  },
  TR: {
    backHome: "Ana Sayfaya Dön",
    title: "Gizlilik Politikası",
    subtitle: "Sanad platformunda, gurbetçilerin ve ailelerinin kişisel ve finansal verilerinin hassasiyetini tam olarak anlıyoruz. Bu belge verilerinizi nasıl koruduğumuzu şeffaflıkla açıklar.",
    sec1Title: "1. Topladığımız Veriler",
    sec1Desc: "Yalnızca hizmetleri güvenle gerçekleştirmek için gerekli verileri topluyoruz:",
    sec1Bullet1: "Gurbetçi hesap bilgileri (İsim, E-posta, Telefon numarası).",
    sec1Bullet2: "Şam ve kırsalındaki alıcı detayları (İsim, Tam adres, İletişim numarası).",
    sec1NoteStart: "Not: ",
    sec1NoteBold: "ASLA saklamıyoruz",
    sec1NoteEnd: " Kredi kartı bilgilerinizi; ödemeler şifreli küresel ödeme altyapıları ile işlenir.",
    sec2Title: "2. Veri Koruma ve Paylaşım",
    sec2Desc: "Verileriniz şifrelenmiş bulut veritabanlarında (Supabase) saklanır. Verilerinizi hiçbir üçüncü tarafa satmıyor veya kiralamıyoruz. Alıcının adı, numarası ve adresi, yalnızca siparişleri teslim etmek amacıyla Şam'daki güvenilir ve sertifikalı saha ekibimizle özel olarak paylaşılır.",
    sec3Title: "3. Güncellemeler ve Haklarınız",
    sec3Desc: "Teknik destekle iletişime geçerek istediğiniz zaman hesabınızın, tüm verilerinizin ve sipariş kayıtlarınızın silinmesini talep etme hakkına sahipsiniz. Bu politikayı güncelleyebiliriz ve önemli değişiklikleri size e-posta ile bildireceğiz."
  },
  DE: {
    backHome: "Zurück zur Startseite",
    title: "Datenschutz-Bestimmungen",
    subtitle: "Bei Sanad verstehen wir die Sensibilität persönlicher und finanzieller Daten. Dieses Dokument erklärt transparent, wie wir Ihre Daten schützen.",
    sec1Title: "1. Daten, die wir sammeln",
    sec1Desc: "Wir sammeln nur Daten, die für die sichere Ausführung der Dienste erforderlich sind:",
    sec1Bullet1: "Kontoinformationen des Auswanderers (Name, E-Mail, Telefonnummer).",
    sec1Bullet2: "Empfängerdetails in Damaskus & Umgebung (Name, genaue Adresse, Kontaktnummer).",
    sec1NoteStart: "Hinweis: ",
    sec1NoteBold: "Wir speichern NIEMALS",
    sec1NoteEnd: " Ihre Kreditkartendaten; Zahlungen werden über verschlüsselte Gateways verarbeitet.",
    sec2Title: "2. Datenschutz & Weitergabe",
    sec2Desc: "Ihre Daten werden in verschlüsselten Cloud-Datenbanken (Supabase) gespeichert. Wir verkaufen oder vermieten Ihre Daten an keine Dritten. Name, Nummer und Adresse des Empfängers werden ausschließlich mit unserem vertrauenswürdigen und zertifizierten Außendienstteam in Damaskus geteilt, und zwar nur zum Zweck der Auslieferung von Bestellungen.",
    sec3Title: "3. Aktualisierungen & Ihre Rechte",
    sec3Desc: "Sie haben jederzeit das Recht, die Löschung Ihres Kontos, aller Ihrer Daten und Bestelldatensätze durch Kontaktaufnahme mit dem technischen Support zu verlangen. Wir können diese Richtlinie aktualisieren und werden Sie per E-Mail über wesentliche Änderungen informieren."
  }
};

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const currentLang = lang && PRIVACY_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const t = PRIVACY_TEXTS[currentLang];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 py-12 px-6 lg:px-12 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* زر العودة للرئيسية */}
        <div className="flex justify-start mb-8">
          <Link href="/" className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all text-xs font-bold shadow-md">
            {isRtl ? <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
            <span>{t.backHome}</span>
          </Link>
        </div>

        {/* عنوان الصفحة */}
        <div className="mb-12">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">{t.title}</h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">{t.subtitle}</p>
        </div>

        {/* الأقسام الثلاثة */}
        <div className="space-y-6">
          
          {/* القسم الأول */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg mb-4">
              <Eye className="w-5 h-5 shrink-0" />
              <h2>{t.sec1Title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{t.sec1Desc}</p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 mb-6">
              <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /><span>{t.sec1Bullet1}</span></li>
              <li className="flex items-center gap-2.5"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /><span>{t.sec1Bullet2}</span></li>
            </ul>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-xs sm:text-sm text-emerald-300 font-medium leading-relaxed">
              {t.sec1NoteStart}<span className="font-bold text-emerald-400">{t.sec1NoteBold}</span>{t.sec1NoteEnd}
            </div>
          </div>

          {/* القسم الثاني */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 text-cyan-400 font-bold text-lg mb-4">
              <Lock className="w-5 h-5 shrink-0" />
              <h2>{t.sec2Title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{t.sec2Desc}</p>
          </div>

          {/* القسم الثالث */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg mb-4">
              <FileText className="w-5 h-5 shrink-0" />
              <h2>{t.sec3Title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{t.sec3Desc}</p>
          </div>

        </div>
      </div>
    </div>
  );
}