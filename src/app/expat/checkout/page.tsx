"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, MapPin, Phone, User, CreditCard, 
  ShieldCheck, CheckCircle2, Lock, FileText, ChevronRight, ChevronLeft, Loader2, X
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CHECKOUT_TEXTS: Record<string, any> = {
  AR: { backBtn: "العودة للبوابة", title: "إتمام الطلب والدفع", subtitle: "أدخل بيانات المستلم، ثم انتقل للدفع الآمن.", recipientTitle: "بيانات المستلم (في سوريا)", recipName: "اسم المستلم الثلاثي", namePlaceholder: "محمد عبد الله...", recipPhone: "رقم هاتف المستلم (واتساب)", recipAddress: "المنطقة / العنوان التفصيلي", addressPlaceholder: "دمشق، الميدان، شارع...", notes: "ملاحظات إضافية للتوصيل", notesPlaceholder: "أي تفاصيل إضافية للوصول أسرع...", summaryTitle: "ملخص الطلب", subtotal: "قيمة الخدمات", deliveryFee: "رسوم التوصيل", free: "مجاني", total: "الإجمالي", securePayment: "دفع آمن ومشفّر 100%", paymentNote: "لن يتم خصم أي مبلغ حتى تؤكد العملية.", continueBtn: "متابعة للدفع البنكي", modalTitle: "بوابة الدفع الآمنة", modalSubtitle: "أدخل بيانات بطاقتك البنكية لإتمام الطلب.", nameOnCard: "الاسم على البطاقة", cardNumber: "رقم البطاقة", expiryDate: "تاريخ الانتهاء (MM/YY)", cvc: "رمز الأمان (CVC)", payBtn: "ادفع الآن", loadingBtn: "جاري المعالجة المشفّرة...", successMsg: "تم تأكيد الدفع واستلام الطلب بنجاح! سيتم إشعارك عبر تليجرام.", errorMsg: "حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى." },
  EN: { backBtn: "Back to Portal", title: "Checkout & Payment", subtitle: "Enter recipient details, then proceed to secure payment.", recipientTitle: "Recipient Details (in Syria)", recipName: "Full Name", namePlaceholder: "John Doe...", recipPhone: "Phone Number (WhatsApp)", recipAddress: "Area / Detailed Address", addressPlaceholder: "Damascus, Al-Midan, Street...", notes: "Additional Delivery Notes", notesPlaceholder: "Any extra details for faster delivery...", summaryTitle: "Order Summary", subtotal: "Services Value", deliveryFee: "Delivery Fee", free: "Free", total: "Total", securePayment: "100% Secure & Encrypted", paymentNote: "No amount will be deducted until you confirm.", continueBtn: "Proceed to Payment", modalTitle: "Secure Payment Gateway", modalSubtitle: "Enter your card details to complete the order.", nameOnCard: "Name on Card", cardNumber: "Card Number", expiryDate: "Expiry Date (MM/YY)", cvc: "Security Code (CVC)", payBtn: "Pay Now", loadingBtn: "Processing Securely...", successMsg: "Payment confirmed and order received successfully! You will be notified via Telegram.", errorMsg: "An error occurred while processing payment. Please try again." },
  TR: { backBtn: "Portala Dön", title: "Ödeme ve Onay", subtitle: "Alıcı bilgilerini girin, ardından güvenli ödemeye geçin.", recipientTitle: "Alıcı Bilgileri (Suriye'de)", recipName: "Ad Soyad", namePlaceholder: "Ahmet Yılmaz...", recipPhone: "Telefon Numarası (WhatsApp)", recipAddress: "Bölge / Detaylı Adres", addressPlaceholder: "Şam, El-Meydan, Sokak...", notes: "Ek Teslimat Notları", notesPlaceholder: "Daha hızlı teslimat için ek detaylar...", summaryTitle: "Sipariş Özeti", subtotal: "Hizmet Bedeli", deliveryFee: "Teslimat Ücreti", free: "Ücretsiz", total: "Toplam", securePayment: "%100 Güvenli ve Şifreli", paymentNote: "Onaylayana kadar hiçbir ücret kesilmeyecektir.", continueBtn: "Ödemeye Geç", modalTitle: "Güvenli Ödeme Geçidi", modalSubtitle: "Siparişi tamamlamak için kart bilgilerinizi girin.", nameOnCard: "Kart Üzerindeki İsim", cardNumber: "Kart Numarası", expiryDate: "Son Kullanma Tarihi (AA/YY)", cvc: "Güvenlik Kodu (CVC)", payBtn: "Şimdi Öde", loadingBtn: "Güvenle İşleniyor...", successMsg: "Ödeme onaylandı ve sipariş başarıyla alındı! Telegram üzerinden bilgilendirileceksiniz.", errorMsg: "Ödeme işlenirken bir hata oluştu. Lütfen tekrar deneyin." },
  DE: { backBtn: "Zurück zum Portal", title: "Kasse & Zahlung", subtitle: "Empfängerdaten eingeben und zur sicheren Zahlung gehen.", recipientTitle: "Empfängerdaten (in Syrien)", recipName: "Vollständiger Name", namePlaceholder: "Max Mustermann...", recipPhone: "Telefonnummer (WhatsApp)", recipAddress: "Region / Detaillierte Adresse", addressPlaceholder: "Damaskus, Al-Midan, Straße...", notes: "Zusätzliche Lieferhinweise", notesPlaceholder: "Zusätzliche Details für eine schnellere Lieferung...", summaryTitle: "Bestellübersicht", subtotal: "Warenwert", deliveryFee: "Liefergebühr", free: "Kostenlos", total: "Gesamt", securePayment: "100% sicher & verschlüsselt", paymentNote: "Es wird kein Betrag abgebucht, bis Sie bestätigen.", continueBtn: "Weiter zur Zahlung", modalTitle: "Sicheres Zahlungsportal", modalSubtitle: "Geben Sie Ihre Kartendaten ein, um die Bestellung abzuschließen.", nameOnCard: "Name auf der Karte", cardNumber: "Kartennummer", expiryDate: "Ablaufdatum (MM/JJ)", cvc: "Sicherheitscode (CVC)", payBtn: "Jetzt bezahlen", loadingBtn: "Sicher verarbeiten...", successMsg: "Zahlung bestätigt und Bestellung erfolgreich erhalten! Sie werden über Telegram benachrichtigt.", errorMsg: "Bei der Zahlungsverarbeitung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut." }
};

export default function CheckoutPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // المتغيرات الديناميكية للسلة
  const [subtotal, setSubtotal] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // قراءة بيانات السلة المحفوظة في الـ localStorage
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
  const serviceTitle = cartItems.length > 0 ? cartItems.map(item => item.serviceTitle).join(" + ") : "طلب مخصص عبر السلة";
  const orderDetails = cartItems.length > 0 ? cartItems.map(item => item.details).join(" | ") : "الطلب تم دفعه بنجاح عبر البوابة الآمنة.";

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("+963");
  const [address, setAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (subtotal === 0) {
      alert(isRtl ? "السلة فارغة. يرجى إضافة طلب أولاً." : "Cart is empty.");
      router.push("/expat");
      return;
    }
    setShowPaymentModal(true);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    setCardExpiry(value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCardCvc(value);
  };

  const handleFinalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: serviceTitle,
          price: subtotal,
          currency: currency,
          details: orderDetails,
          recipientName: recipientName,
          recipientPhone: recipientPhone,
          address: address,
          notes: orderNotes,
          userId: null
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(ui.successMsg);
        // مسح السلة بعد نجاح الدفع
        localStorage.removeItem('sanad_cart');
        localStorage.removeItem('sanad_cart_total');
        localStorage.removeItem('sanad_cart_currency');
        setShowPaymentModal(false);
        router.push("/expat");
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(ui.errorMsg);
    } finally {
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
              
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{ui.recipientTitle}</h2>
              </div>

              <form id="recipient-form" onSubmit={handleOpenPayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.recipName}</label>
                    <div className="relative group">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                        <User className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                      </div>
                      <input type="text" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)}
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`} placeholder={ui.namePlaceholder} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.recipPhone}</label>
                    <div className="relative group">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                        <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                      </div>
                      <input type="tel" required value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} dir="ltr" 
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'px-12 text-right' : 'px-12 text-left'} text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.recipAddress}</label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                      <MapPin className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                    </div>
                    <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                      className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`} placeholder={ui.addressPlaceholder} />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>{ui.notes}</label>
                  <div className="relative group">
                    <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} flex items-start pointer-events-none`}>
                      <FileText className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                    </div>
                    <textarea rows={2} value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)}
                      className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none`} placeholder={ui.notesPlaceholder}></textarea>
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

              <button type="submit" form="recipient-form" className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] text-lg font-black text-slate-900 bg-emerald-500 hover:bg-emerald-400 transition-all transform hover:-translate-y-1">
                <CreditCard className="w-5 h-5" />
                {ui.continueBtn}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showPaymentModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir={isRtl ? "rtl" : "ltr"}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPaymentModal(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              ></motion.div>
              
              <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden z-10 p-8"
              >
                <button type="button" onClick={() => setShowPaymentModal(false)} className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors`}>
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center mb-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{ui.modalTitle}</h3>
                  <p className="text-sm text-slate-400">{ui.modalSubtitle}</p>
                </div>

                <form onSubmit={handleFinalCheckout} className="space-y-5">
                  <div>
                    <label className={`block text-xs font-bold text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>{ui.nameOnCard}</label>
                    <input type="text" required value={cardName} onChange={(e) => setCardName(e.target.value)}
                      className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all ${isRtl ? 'text-right' : 'text-left'}`} 
                      placeholder="JOHN DOE" />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>{ui.cardNumber}</label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
                        <CreditCard className="w-5 h-5 text-slate-500" />
                      </div>
                      <input type="text" required value={cardNumber} onChange={handleCardNumberChange} dir="ltr"
                        className={`w-full bg-slate-950 border border-slate-800 rounded-xl py-3 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white font-mono text-lg tracking-widest focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`} 
                        placeholder="0000 0000 0000 0000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>{ui.expiryDate}</label>
                      <input type="text" required value={cardExpiry} onChange={handleExpiryChange} dir="ltr"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white font-mono text-center tracking-widest focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                        placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>{ui.cvc}</label>
                      <input type="password" required value={cardCvc} onChange={handleCvcChange} dir="ltr" maxLength={4}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white font-mono text-center tracking-widest focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                        placeholder="•••" />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-lg font-black text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 transition-all shadow-lg disabled:opacity-70">
                      {isLoading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> {ui.loadingBtn}</>
                      ) : (
                        <><ShieldCheck className="w-5 h-5" /> {ui.payBtn} ({subtotal.toLocaleString()} {currencySymbol})</>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}