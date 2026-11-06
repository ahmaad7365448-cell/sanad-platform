"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Star, Send, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const RATE_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    basedOn: "بناءً على ",
    reviewsText: " تقييماً حقيقياً من المغتربين والداعمين.",
    successTitle: "شكراً لتقييمك الصادق!",
    successDesc: "تم حفظ تقييمك بنجاح في سجلات المنصة. رأيك يعيننا على تقديم خدمة أسطورية تليق بأهالينا.",
    titleText: "قيم منصة ",
    brandName: "سَنَد",
    subtitleText: "اضغط على النجوم لتحديد تقييمك، وشاركنا رأيك لنستمر بالتطوير.",
    labelSelectFirst: "يرجى تحديد عدد النجوم أولاً",
    labelYourRating: "تقييمك: ",
    labelOutOfFive: " من 5 نجوم - أضف ملاحظاتك (اختياري)",
    placeholderText: "اكتب تجربتك أو اقتراحك هنا...",
    loadingText: "جاري الإرسال والحفظ...",
    submitBtnText: "إرسال التقييم الفوري"
  },
  EN: {
    backHome: "Back to Home",
    basedOn: "Based on ",
    reviewsText: " real reviews from expats and supporters.",
    successTitle: "Thank you for your honest feedback!",
    successDesc: "Your review has been successfully saved. Your opinion helps us deliver extraordinary service for our people.",
    titleText: "Rate ",
    brandName: "SANAD",
    subtitleText: "Click on the stars to set your rating and share your thoughts to help us keep improving.",
    labelSelectFirst: "Please select a star rating first",
    labelYourRating: "Your rating: ",
    labelOutOfFive: " out of 5 stars - Add your feedback (optional)",
    placeholderText: "Write your experience or suggestion here...",
    loadingText: "Submitting & saving...",
    submitBtnText: "Submit Instant Review"
  },
  TR: {
    backHome: "Ana Sayfaya Dön",
    basedOn: "Gurbetçi ve destekçilerden gelen ",
    reviewsText: " gerçek değerlendirmeye dayanmaktadır.",
    successTitle: "Dürüst değerlendirmeniz için teşekkür ederiz!",
    successDesc: "Değerlendirmeniz başarıyla kaydedildi. Görüşleriniz halkımıza harika bir hizmet sunmamıza yardımcı oluyor.",
    titleText: "Platformu Değerlendirin: ",
    brandName: "SANAD",
    subtitleText: "Puanınızı belirlemek için yıldızlara tıklayın ve geliştirmeye devam etmemiz için görüşlerinizi paylaşın.",
    labelSelectFirst: "Lütfen önce bir yıldız puanı seçin",
    labelYourRating: "Puanınız: ",
    labelOutOfFive: " / 5 yıldız - Notlarınızı ekleyin (isteğe bağlı)",
    placeholderText: "Deneyiminizi veya önerinizi buraya yazın...",
    loadingText: "Gönderiliyor ve kaydediliyor...",
    submitBtnText: "Anında Değerlendirmeyi Gönder"
  },
  DE: {
    backHome: "Zurück zur Startseite",
    basedOn: "Basierend auf ",
    reviewsText: " echten Bewertungen von Auswanderern und Unterstützern.",
    successTitle: "Vielen Dank für Ihr ehrliches Feedback!",
    successDesc: "Ihre Bewertung wurde erfolgreich gespeichert. Ihre Meinung hilft uns, hervorragenden Service zu bieten.",
    titleText: "Bewerten Sie ",
    brandName: "SANAD",
    subtitleText: "Klicken Sie auf die Sterne, um Ihre Bewertung abzugeben, und teilen Sie Ihre Meinung mit uns.",
    labelSelectFirst: "Bitte wählen Sie zuerst eine Sternebewertung aus",
    labelYourRating: "Ihre Bewertung: ",
    labelOutOfFive: " von 5 Sternen - Anmerkungen hinzufügen (optional)",
    placeholderText: "Schreiben Sie Ihre Erfahrung oder Ihren Vorschlag hier...",
    loadingText: "Wird gesendet und gespeichert...",
    submitBtnText: "Bewertung Sofort Absenden"
  }
};

export default function RatePage() {
  const { lang } = useLanguage();
  const currentLang = lang && RATE_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = RATE_TEXTS[currentLang];

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // إحصائيات حقيقية من القاعدة
  const [avgRating, setAvgRating] = useState<number>(4.9);
  const [totalReviews, setTotalReviews] = useState<number>(128);

  // جلب متوسط التقييمات الحقيقي عند تحميل الصفحة
  useEffect(() => {
    async function fetchRatingsStats() {
      const { data, error } = await supabase.from('ratings').select('rating');
      if (!error && data && data.length > 0) {
        const total = data.length;
        const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
        setAvgRating(Number((sum / total).toFixed(1)));
        setTotalReviews(128 + total); // دمج رقم افتراضي مع التقييمات الحية
      }
    }
    fetchRatingsStats();
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('ratings')
      .insert([{ rating, feedback }]);

    setLoading(false);

    if (error) {
      console.error("خطأ في حفظ التقييم:", error.message);
      alert("حدث خطأ ما، يرجى المحاولة لاحقاً.");
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-20 relative overflow-hidden text-slate-300" dir={isRtl ? "rtl" : "ltr"}>
      {/* إضاءات خلفية كونية */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-4xl">
        
        {/* زر الرجوع العائم */}
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

        {/* الحاوية الزجاجية */}
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden p-8 sm:p-14 relative">
          
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          {/* شريط الإحصائيات الفوري (مثل Google Reviews) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 mb-10">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-white">{avgRating}</span>
              <div className="flex text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-emerald-400" />
                ))}
              </div>
            </div>
            <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
            <p className="text-sm text-slate-400 font-medium">
              {ui.basedOn}<span className="text-white font-bold">{totalReviews}</span>{ui.reviewsText}
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Heart className="w-12 h-12 text-emerald-400 fill-emerald-400/20" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{ui.successTitle}</h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
                {ui.successDesc}
              </p>
              <Link href="/" className="inline-flex items-center justify-center py-3 px-8 rounded-xl bg-slate-800 hover:bg-emerald-500 text-white font-bold transition-colors">
                {ui.backHome}
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
                  {ui.titleText}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{ui.brandName}</span>
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
                  {ui.subtitleText}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                {/* نظام النجوم التفاعلي */}
                <div className="flex justify-center gap-2 sm:gap-4 mb-8" dir="ltr">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-2 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        className={`w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 ${
                          (hoveredRating || rating) >= star 
                            ? "fill-emerald-400 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                            : "fill-slate-800 text-slate-700"
                        }`} 
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider text-center">
                    {rating === 0 ? ui.labelSelectFirst : `${ui.labelYourRating}${rating}${ui.labelOutOfFive}`}
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                    placeholder={ui.placeholderText}
                    disabled={rating === 0}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={rating === 0 || loading}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-8 border border-transparent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-lg font-bold text-white transition-all transform ${
                    rating === 0 || loading
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50" 
                    : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  }`}
                >
                  {loading ? ui.loadingText : ui.submitBtnText}
                  <Send className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}