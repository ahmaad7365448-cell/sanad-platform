"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CONTACT_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    title1: "تواصل",
    title2: "مع سَنَد",
    subtitle: "نحن هنا لنستمع إليك. أرسل استفسارك أو طلبك، وفريقنا سيتواصل معك بأسرع وقت.",
    contactInfo: "معلومات التواصل المباشر",
    hq: "المقر الرئيسي",
    hqAddress: "تركيا، بورصا، عثمان غازي",
    phone: "رقم الهاتف (واتساب)",
    emailLabel: "البريد الإلكتروني",
    socialLinks: "منصاتنا الاجتماعية",
    formTitle: "أرسل لنا رسالة",
    fullName: "الاسم الكامل",
    namePlaceholder: "الاسم الثلاثي",
    emailPlaceholder: "name@example.com",
    subject: "موضوع الرسالة",
    subjSelect: "اختر موضوع الرسالة...",
    subjInquiry: "استفسار عام",
    subjSupport: "دعم فني",
    subjPartner: "اقتراح شراكة",
    subjOther: "أخرى",
    messageLabel: "نص الرسالة",
    msgPlaceholder: "كيف يمكننا مساعدتك اليوم؟...",
    sendBtn: "إرسال الرسالة",
    loadingBtn: "جاري الإرسال...",
    successMsg: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
    errorMsg: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً."
  },
  EN: {
    backHome: "Back to Home",
    title1: "Contact",
    title2: "Sanad",
    subtitle: "We are here to listen. Send your inquiry or request, and our team will get back to you shortly.",
    contactInfo: "Direct Contact Info",
    hq: "Headquarters",
    hqAddress: "Turkey, Bursa, Osmangazi",
    phone: "Phone Number (WhatsApp)",
    emailLabel: "Email Address",
    socialLinks: "Our Social Media",
    formTitle: "Send Us a Message",
    fullName: "Full Name",
    namePlaceholder: "John Doe",
    emailPlaceholder: "name@example.com",
    subject: "Message Subject",
    subjSelect: "Select a subject...",
    subjInquiry: "General Inquiry",
    subjSupport: "Technical Support",
    subjPartner: "Partnership Proposal",
    subjOther: "Other",
    messageLabel: "Message Body",
    msgPlaceholder: "How can we help you today?...",
    sendBtn: "Send Message",
    loadingBtn: "Sending...",
    successMsg: "Your message has been sent successfully! We will contact you soon.",
    errorMsg: "An error occurred while sending the message. Please try again later."
  },
  TR: {
    backHome: "Ana Sayfa",
    title1: "İletişim",
    title2: "Sanad",
    subtitle: "Sizi dinlemek için buradayız. Sorunuzu veya talebinizi gönderin, ekibimiz en kısa sürede size dönecektir.",
    contactInfo: "Doğrudan İletişim Bilgileri",
    hq: "Merkez",
    hqAddress: "Türkiye, Bursa, Osmangazi",
    phone: "Telefon Numarası (WhatsApp)",
    emailLabel: "E-posta Adresi",
    socialLinks: "Sosyal Medya",
    formTitle: "Bize Mesaj Gönderin",
    fullName: "Ad Soyad",
    namePlaceholder: "Ahmet Yılmaz",
    emailPlaceholder: "isim@ornek.com",
    subject: "Mesaj Konusu",
    subjSelect: "Bir konu seçin...",
    subjInquiry: "Genel Soru",
    subjSupport: "Teknik Destek",
    subjPartner: "Ortaklık Teklifi",
    subjOther: "Diğer",
    messageLabel: "Mesaj İçeriği",
    msgPlaceholder: "Bugün size nasıl yardımcı olabiliriz?...",
    sendBtn: "Mesaj Gönder",
    loadingBtn: "Gönderiliyor...",
    successMsg: "Mesajınız başarıyla gönderildi! Yakında sizinle iletişime geçeceğiz.",
    errorMsg: "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
  },
  DE: {
    backHome: "Zurück",
    title1: "Kontakt",
    title2: "Sanad",
    subtitle: "Wir sind hier, um zuzuhören. Senden Sie Ihre Anfrage und unser Team wird sich in Kürze bei Ihnen melden.",
    contactInfo: "Direkte Kontaktinformationen",
    hq: "Hauptsitz",
    hqAddress: "Türkei, Bursa, Osmangazi",
    phone: "Telefonnummer (WhatsApp)",
    emailLabel: "E-Mail Adresse",
    socialLinks: "Unsere sozialen Medien",
    formTitle: "Nachricht senden",
    fullName: "Vollständiger Name",
    namePlaceholder: "Max Mustermann",
    emailPlaceholder: "name@beispiel.com",
    subject: "Betreff",
    subjSelect: "Wählen Sie einen Betreff...",
    subjInquiry: "Allgemeine Anfrage",
    subjSupport: "Technischer Support",
    subjPartner: "Partnerschaftsvorschlag",
    subjOther: "Andere",
    messageLabel: "Nachricht",
    msgPlaceholder: "Wie können wir Ihnen heute helfen?...",
    sendBtn: "Senden",
    loadingBtn: "Senden...",
    successMsg: "Ihre Nachricht wurde erfolgreich gesendet! Wir werden uns in Kürze bei Ihnen melden.",
    errorMsg: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
  }
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = lang && CONTACT_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = CONTACT_TEXTS[currentLang];

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  // تحديث دالة الإرسال لتوجه الطلب إلى مجلد الـ API الجديد
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(ui.successMsg);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "فشل الإرسال");
      }
    } catch (error) {
      alert(ui.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-20 relative overflow-hidden text-slate-300" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        <div className="flex justify-start mb-12 mt-4">
          <Link href="/" className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md">
            <div className="p-1.5 rounded-full bg-slate-800/80 group-hover:bg-emerald-500/20 transition-colors">
              {isRtl ? <ArrowRight className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />}
            </div>
            <span className="text-sm tracking-wide">{ui.backHome}</span>
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
            {ui.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{ui.title2}</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {ui.subtitle}
          </p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* معلومات التواصل */}
          <div className={`lg:w-5/12 bg-gradient-to-br from-emerald-950/80 to-slate-950 p-10 lg:p-14 relative border-b lg:border-b-0 ${isRtl ? 'lg:border-l' : 'lg:border-r'} border-white/5`}>
            <h3 className="text-2xl font-bold text-white mb-8">{ui.contactInfo}</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{ui.hq}</h4>
                  <p className="text-slate-400 text-sm">{ui.hqAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{ui.phone}</h4>
                  <p className="text-slate-400 text-sm" dir="ltr">+90 542 345 63 16</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{ui.emailLabel}</h4>
                  <p className="text-slate-400 text-sm">aborame5230200@icloud.com</p>
                </div>
              </div>
            </div>

            {/* روابط منصات التواصل الاجتماعي (الواتساب، الفيسبوك، الانستغرام) */}
            <div className="pt-8 border-t border-slate-800">
              <h4 className="text-white font-bold mb-4">{ui.socialLinks}</h4>
              <div className="flex gap-4">
                <a href="https://wa.me/905423456316" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-slate-900 transition-colors" title="WhatsApp">
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/1W3f3jjvhf/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-colors" title="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.instagram.com/ahmed_abo_rame?rpxt=eTJjOTVpaDhpYmNw&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-pink-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

          </div>

          {/* نموذج التواصل */}
          <div className="lg:w-7/12 p-10 lg:p-14 bg-slate-950/50">
            <h2 className="text-2xl font-bold text-white mb-6">{ui.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.fullName}</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-3.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" placeholder={ui.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.emailLabel}</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-3.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" placeholder={ui.emailPlaceholder} dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.subject}</label>
                <select required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-3.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none outline-none">
                  <option value="" disabled>{ui.subjSelect}</option>
                  <option value="inquiry">{ui.subjInquiry}</option>
                  <option value="support">{ui.subjSupport}</option>
                  <option value="partnership">{ui.subjPartner}</option>
                  <option value="other">{ui.subjOther}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.messageLabel}</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-3.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none outline-none" placeholder={ui.msgPlaceholder}></textarea>
              </div>
              <button type="submit" disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 transition-all disabled:opacity-70">
                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {ui.loadingBtn}</> : <>{ui.sendBtn} <Send className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}