"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, HeartHandshake, CreditCard, ShieldCheck, Heart, Sparkles, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DONATE_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    heroTitle: "عطاؤك يصنع الفارق، كن سَنَداً لمن تحب.",
    heroDesc: "دعمك المالي يساهم في توفير الاحتياجات الأساسية لعائلاتنا في الداخل. اختر المبلغ الذي يناسبك، وادفع بكل أمان وموثوقية.",
    feature1: "مدفوعات مشفرة وآمنة 100% عبر بوابات عالمية.",
    feature2: "إيصال الدعم بشفافية وموثوقية عالية لمستحقيه.",
    currencyLabel: "اختر عملة الدفع",
    amountLabel: "اختر مبلغ الدعم",
    customPlaceholder: "أو أدخل مبلغاً آخر...",
    submitBtn: "متابعة الدفع الآمن",
    securityNote: "نقبل الدفع عبر البطاقات الائتمانية والبنكية الآمنة"
  },
  EN: {
    backHome: "Back to Home",
    heroTitle: "Your giving makes a difference, be a pillar for those you love.",
    heroDesc: "Your financial support contributes to providing basic needs for our families back home. Choose the amount that suits you and pay securely.",
    feature1: "100% encrypted and secure payments via global gateways.",
    feature2: "Delivering support with high transparency and reliability to those in need.",
    currencyLabel: "Select Payment Currency",
    amountLabel: "Select Donation Amount",
    customPlaceholder: "Or enter another amount...",
    submitBtn: "Proceed to Secure Payment",
    securityNote: "We accept secure credit and debit card payments"
  },
  TR: {
    backHome: "Ana Sayfaya Dön",
    heroTitle: "Bağışınız fark yaratır, sevdikleriniz için bir dayanak olun.",
    heroDesc: "Maddi desteğiniz, içerideki ailelerimizin temel ihtiyaçlarının karşılanmasına katkıda bulunur. Size uygun miktarı seçin ve güvenle ödeyin.",
    feature1: "Küresel ağlar üzerinden %100 şifreli ve güvenli ödemeler.",
    feature2: "Desteği yüksek şeffaflık ve güvenilirlikle hak sahiplerine ulaştırma.",
    currencyLabel: "Ödeme Para Birimini Seçin",
    amountLabel: "Bağış Miktarını Seçin",
    customPlaceholder: "Veya başka bir tutar girin...",
    submitBtn: "Güvenli Ödemeye Devam Et",
    securityNote: "Güvenli kredi ve banka kartı ödemelerini kabul ediyoruz"
  },
  DE: {
    backHome: "Zurück zur Startseite",
    heroTitle: "Ihr Beitrag macht den Unterschied, seien Sie eine Stütze.",
    heroDesc: "Ihre finanzielle Unterstützung trägt dazu bei, die Grundbedürfnisse unserer Familien zu decken. Wählen Sie den Betrag und zahlen Sie sicher.",
    feature1: "100% verschlüsselte und sichere Zahlungen über globale Gateways.",
    feature2: "Weitergabe der Unterstützung mit hoher Transparenz und Zuverlässigkeit.",
    currencyLabel: "Zahlungswährung auswählen",
    amountLabel: "Spendenbetrag auswählen",
    customPlaceholder: "Oder einen anderen Betrag eingeben...",
    submitBtn: "Weiter zur sicheren Zahlung",
    securityNote: "Wir akzeptieren sichere Kredit- und Bankkarten"
  }
};

export default function DonatePage() {
  const { lang } = useLanguage();
  const currentLang = lang && DONATE_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = DONATE_TEXTS[currentLang];

  const [amount, setAmount] = useState<number | string>(50);
  const [currency, setCurrency] = useState("USD");
  const [customAmount, setCustomAmount] = useState("");

  const presetAmounts = [10, 50, 100, 500];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? customAmount : amount;
    console.log(`جاري التوجيه لبوابة الدفع... المبلغ: ${finalAmount} ${currency}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-20 relative overflow-hidden text-slate-300" dir={isRtl ? "rtl" : "ltr"}>
      {/* إضاءات خلفية كونية */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* زر الرجوع للرئيسية */}
        <div className="flex justify-start mb-10 mt-4">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <div className="p-1.5 rounded-full bg-slate-800/80 group-hover:bg-emerald-500/20 transition-colors">
              {isRtl ? (
                <ArrowRight className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              )}
            </div>
            <span className="text-sm tracking-wide">{ui.backHome}</span>
          </Link>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* القسم الأيمن: الرسالة الإنسانية */}
          <div className={`lg:w-5/12 bg-gradient-to-br from-emerald-950/80 to-slate-950 p-10 lg:p-14 relative border-b lg:border-b-0 ${isRtl ? 'lg:border-l' : 'lg:border-r'} border-white/5 overflow-hidden flex flex-col justify-center`}>
            <div className={`absolute -top-24 ${isRtl ? '-right-24' : '-left-24'} w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl`}></div>
            <div className={`absolute -bottom-24 ${isRtl ? '-left-24' : '-right-24'} w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl`}></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-4 bg-black/40 rounded-2xl border border-emerald-500/30 shadow-inner mb-8">
                <HeartHandshake className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-[1.4] drop-shadow-md">
                {ui.heroTitle}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {ui.heroDesc}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                  <p className="text-sm text-slate-300 font-medium">{ui.feature1}</p>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <Heart className="w-6 h-6 text-emerald-500 shrink-0" />
                  <p className="text-sm text-slate-300 font-medium">{ui.feature2}</p>
                </div>
              </div>
            </div>
          </div>

          {/* القسم الأيسر: لوحة التبرع */}
          <div className="lg:w-7/12 p-10 lg:p-14 bg-slate-950/50">
            <form onSubmit={handleDonate} className="max-w-md mx-auto">
              
              {/* اختيار العملة */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">{ui.currencyLabel}</label>
                <div className="flex bg-slate-900/80 border border-slate-700/80 rounded-xl p-1">
                  {['USD', 'EUR', 'TRY'].map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        currency === curr 
                        ? "bg-emerald-500 text-white shadow-md" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '₺ TRY'}
                    </button>
                  ))}
                </div>
              </div>

              {/* أزرار المبالغ السريعة */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">{ui.amountLabel}</label>
                <div className="grid grid-cols-2 gap-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                      className={`py-4 rounded-xl font-bold text-lg border transition-all ${
                        amount === preset && !customAmount
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-slate-900/80 border-slate-700/80 text-white hover:border-emerald-500/50"
                      }`}
                    >
                      {preset} {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₺'}
                    </button>
                  ))}
                </div>
              </div>

              {/* إدخال مبلغ مخصص */}
              <div className="mb-10">
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                    <span className="text-slate-500 font-bold">{currency}</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                    className={`block w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-4 ${isRtl ? 'pl-4 pr-16' : 'pr-4 pl-16'} text-white text-lg font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`}
                    placeholder={ui.customPlaceholder}
                    dir="ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 px-8 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] text-lg font-black text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 transition-all transform hover:-translate-y-1"
              >
                <Lock className="w-5 h-5" />
                {ui.submitBtn}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <CreditCard className="w-4 h-4" />
                <span>{ui.securityNote}</span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}