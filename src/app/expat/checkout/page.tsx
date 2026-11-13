"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, ArrowLeft, MapPin, Phone, User, CreditCard, 
  ShieldCheck, CheckCircle2, FileText, ChevronRight, ChevronLeft, Loader2
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CHECKOUT_TEXTS: Record<string, any> = {
  AR: { backBtn: "العودة للبوابة", title: "إتمام الطلب والدفع الحقيقي", subtitle: "أدخل بياناتك وبيانات المستلم في سوريا، ثم انتقل لبوابة الدفع المعتمدة.", buyerTitle: "1. بيانات المشتري (صاحب الدفع)", buyerName: "اسم المشتري الكامل", buyerNamePlaceholder: "أحمد الشن...", buyerPhone: "رقم هاتف المشتري (واتساب)", recipientTitle: "2. بيانات المستلم (للاستلام بالرمز السري في سوريا)", recipName: "اسم المستلم الثلاثي", namePlaceholder: "محمد عبد الله...", recipPhone: "رقم هاتف المستلم (واتساب)", recipAddress: "المحافظة / المنطقة أو نقطة الاستلام", addressPlaceholder: "دمشق، المزة...", notes: "ملاحظات إضافية", notesPlaceholder: "أي تفاصيل إضافية للطلب...", summaryTitle: "ملخص الطلب", subtotal: "قيمة الخدمات", deliveryFee: "نظام الاستلام", free: "استلام آمن بالـ OTP", total: "الإجمالي", securePayment: "دفع حقيقي ومشفّر عبر Shopier", paymentNote: "سيتم تحويلك لبوابة الدفع البنكية وإصدار رمز الاستلام السري فور الدفع.", continueBtn: "الانتقال لبوابة الدفع البنكية", loadingBtn: "جاري التحويل لبوابة Shopier...", errorMsg: "حدث خطأ أثناء الاتصال ببوابة الدفع. يرجى المحاولة مرة أخرى." },
  EN: { backBtn: "Back to Portal", title: "Checkout & Real Payment", subtitle: "Enter your details and recipient info in Syria, then proceed to payment.", buyerTitle: "1. Buyer Details (Payer)", buyerName: "Buyer Full Name", buyerNamePlaceholder: "John Doe...", buyerPhone: "Buyer Phone (WhatsApp)", recipientTitle: "2. Recipient Details (OTP Pickup in Syria)", recipName: "Recipient Full Name", namePlaceholder: "Full Name...", recipPhone: "Recipient Phone (WhatsApp)", recipAddress: "City / Area / Pickup Point", addressPlaceholder: "Damascus, Al-Mazzeh...", notes: "Additional Notes", notesPlaceholder: "Any extra details...", summaryTitle: "Order Summary", subtotal: "Services Value", deliveryFee: "Pickup System", free: "Secure OTP Pickup", total: "Total", securePayment: "100% Real & Encrypted via Shopier", paymentNote: "You will be redirected to the bank gateway and receive your secret OTP code.", continueBtn: "Proceed to Bank Gateway", loadingBtn: "Redirecting to Shopier...", errorMsg: "An error occurred connecting to the payment gateway." },
  TR: { backBtn: "Portala Dön", title: "Gerçek Ödeme ve Onay", subtitle: "Alıcı bilgilerini girin, ardından güvenli banka ödemesine geçin.", buyerTitle: "1. Alıcı (Ödeyen) Bilgileri", buyerName: "Ödeyen Ad Soyad", buyerNamePlaceholder: "Ahmet Yılmaz...", buyerPhone: "Ödeyen Telefon (WhatsApp)", recipientTitle: "2. Suriye'deki Teslim Alacak Kişi", recipName: "Teslim Alacak Ad Soyad", namePlaceholder: "Ad Soyad...", recipPhone: "Teslim Alacak Telefon (WhatsApp)", recipAddress: "Şehir / Bölge", addressPlaceholder: "Şam, El-Mezze...", notes: "Ek Notlar", notesPlaceholder: "Ek detaylar...", summaryTitle: "Sipariş Özeti", subtotal: "Hizmet Bedeli", deliveryFee: "Teslimat Sistemi", free: "Güvenli OTP Teslimat", total: "Toplam", securePayment: "Shopier ile %100 Güvenli Ödeme", paymentNote: "Banka ödeme sayfasına yönlendirileceksiniz ve gizli teslimat kodu oluşturulacaktır.", continueBtn: "Banka Ödemesine Geç", loadingBtn: "Shopier'e Yönlendiriliyor...", errorMsg: "Ödeme geçidine bağlanırken bir hata oluştu." },
  DE: { backBtn: "Zurück zum Portal", title: "Kasse & Echte Zahlung", subtitle: "Geben Sie Ihre Daten und Empfängerdaten ein und zahlen Sie sicher.", buyerTitle: "1. Käuferdaten (Zahler)", buyerName: "Vollständiger Name", buyerNamePlaceholder: "Max Mustermann...", buyerPhone: "Telefonnummer (WhatsApp)", recipientTitle: "2. Empfängerdaten (OTP-Abholung in Syrien)", recipName: "Name des Empfängers", namePlaceholder: "Vollständiger Name...", recipPhone: "Telefon des Empfängers", recipAddress: "Stadt / Region", addressPlaceholder: "Damaskus...", notes: "Zusätzliche Hinweise", notesPlaceholder: "Zusätzliche Details...", summaryTitle: "Bestellübersicht", subtotal: "Warenwert", deliveryFee: "Abholsystem", free: "Sichere OTP-Abholung", total: "Gesamt", securePayment: "100% sicher über Shopier", paymentNote: "Sie werden zum Zahlungsportal weitergeleitet und erhalten Ihren geheimen Code.", continueBtn: "Weiter zur Bankzahlung", loadingBtn: "Weiterleitung zu Shopier...", errorMsg: "Fehler bei der Verbindung zum Zahlungsportal." }
};

export default function CheckoutPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const savedTotal = localStorage.getItem('sanad_cart_total');
    const savedCurrency = localStorage.getItem('sanad_cart_currency');
    const savedCart = localStorage.getItem('sanad_cart');

    if (savedTotal) setSubtotal(parseFloat(savedTotal));
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const currentLang = lang && CHECKOUT_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = CHECKOUT_TEXTS[currentLang];

  const currencySymbol = currency === 'TRY' ? '₺' : currency === 'EUR' ? '€' : '$';
  const serviceTitle = cartItems.length > 0 ? cartItems.map(item => item.serviceTitle).join(" + ") : "طلب مخصص من منصة سَنَد";

  // بيانات المشتري (مطلوبة لبوابة Shopier)
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("+90");

  // بيانات المستلم في سوريا
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("+963");
  const [address, setAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRealShopierRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subtotal <= 0) {
      alert(isRtl ? "السلة فارغة. يرجى إضافة طلب أولاً." : "Cart is empty.");
      router.push("/expat");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/shopier/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: `${serviceTitle} (${address})`,
          amount: subtotal,
          currency: currency,
          buyerName: buyerName,
          buyerPhone: buyerPhone,
          receiverName: recipientName,
          receiverPhone: `${recipientPhone} - ${address} ${orderNotes ? `(${orderNotes})` : ''}`,
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed");
      }

      // مسح السلة قبل الانتقال لبوابة الدفع
      localStorage.removeItem('sanad_cart');
      localStorage.removeItem('sanad_cart_total');
      localStorage.removeItem('sanad_cart_currency');

      // إنشاء نموذج مخفي وإرساله تلقائياً لبوابة Shopier الحقيقية
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;

      Object.entries(data.payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Shopier Redirect Error:", error);
      alert(ui.errorMsg);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden text-slate-300" dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        <div className="flex items-center gap-4 mb-10 mt-4">
          <Link href="/expat" className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:bg-emerald-500/10 text-slate-300 font-medium transition-all duration-300 backdrop-blur-md">
            <div className="p-1.5 rounded-full bg-slate-800/80 group-hover:bg-emerald-500/20 transition-colors">
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </div>
            <span className="text-sm tracking-wide">{ui.backBtn}</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
            {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-emerald-400">{ui.title}</span>
          </div>
        </div>

        <div className={`mb-10 ${isRtl ? 'text-right' : 'text-left'} lg:text-start text-center`}>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{ui.title}</h1>
          <p className="text-slate-400 text-lg">{ui.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3">
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-50"></div>

              <form id="recipient-form" onSubmit={handleRealShopierRedirect} className="space-y-8">
                
                {/* القسم الأول: بيانات المشتري */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-white">{ui.buyerTitle}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.buyerName}</label>
                      <div className="relative group">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                          <User className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                        </div>
                        <input type="text" required value={buyerName} onChange={(e) => setBuyerName(e.target.value)}
                          className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`} placeholder={ui.buyerNamePlaceholder} />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.buyerPhone}</label>
                      <div className="relative group">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                          <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                        </div>
                        <input type="tel" required value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} dir="ltr" 
                          className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'px-12 text-right' : 'px-12 text-left'} text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* القسم الثاني: بيانات المستلم في سوريا */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-white">{ui.recipientTitle}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.recipName}</label>
                      <div className="relative group">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                          <User className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input type="text" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)}
                          className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`} placeholder={ui.namePlaceholder} />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.recipPhone}</label>
                      <div className="relative group">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                          <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input type="tel" required value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} dir="ltr" 
                          className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'px-12 text-right' : 'px-12 text-left'} text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.recipAddress}</label>
                    <div className="relative group">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                        <MapPin className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`} placeholder={ui.addressPlaceholder} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.notes}</label>
                    <div className="relative group">
                      <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} flex items-start pointer-events-none`}>
                        <FileText className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <textarea rows={2} value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)}
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none`} placeholder={ui.notesPlaceholder}></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)] sticky top-10">
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                {ui.summaryTitle}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{ui.subtotal}</span>
                  <span className="font-bold text-slate-200">{subtotal.toLocaleString()} {currencySymbol}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{ui.deliveryFee}</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md font-bold text-xs">{ui.free}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-base font-bold text-white">{ui.total}</span>
                  <span className="text-3xl font-black text-emerald-400">{subtotal.toLocaleString()} {currencySymbol}</span>
                </div>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-8 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className={`text-xs text-slate-400 leading-relaxed font-medium ${isRtl ? 'text-right' : 'text-left'}`}>
                  <span className="text-slate-200 font-bold block mb-1">{ui.securePayment}</span>
                  {ui.paymentNote}
                </p>
              </div>

              <button type="submit" form="recipient-form" disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] text-lg font-black text-slate-900 bg-emerald-500 hover:bg-emerald-400 transition-all transform hover:-translate-y-1 disabled:opacity-60 cursor-pointer">
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {ui.loadingBtn}</>
                ) : (
                  <><CreditCard className="w-5 h-5" /> {ui.continueBtn}</>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}