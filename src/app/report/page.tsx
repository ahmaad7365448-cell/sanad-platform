"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, AlertTriangle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const REPORT_TEXTS: Record<string, any> = {
  AR: { backHome: "العودة للرئيسية", title: "واجهت مشكلة؟", desc: "فريق الدعم الفني متواجد لحلها فوراً.", success: "تم استلام بلاغك بنجاح", submitAnother: "إرسال بلاغ آخر", fullName: "الاسم", email: "البريد", issueType: "نوع المشكلة", priority: "الأهمية", descLabel: "وصف المشكلة", submitBtn: "إرسال البلاغ", loadingBtn: "جاري الإرسال...", optTech: "مشكلة تقنية", optPayment: "مشكلة بالدفع", optAccount: "مشكلة بالحساب", optOther: "أخرى", optNormal: "عادية", optUrgent: "عاجلة" },
  EN: { backHome: "Back Home", title: "Facing an issue?", desc: "Our support team is here to solve it.", success: "Report Received", submitAnother: "Submit Another", fullName: "Name", email: "Email", issueType: "Issue Type", priority: "Priority", descLabel: "Description", submitBtn: "Submit Report", loadingBtn: "Sending...", optTech: "Tech Issue", optPayment: "Payment Issue", optAccount: "Account Issue", optOther: "Other", optNormal: "Normal", optUrgent: "Urgent" },
  TR: { backHome: "Ana Sayfa", title: "Bir sorun mu var?", desc: "Destek ekibimiz çözmek için burada.", success: "Rapor Alındı", submitAnother: "Başka Gönder", fullName: "Ad", email: "E-posta", issueType: "Sorun Türü", priority: "Öncelik", descLabel: "Açıklama", submitBtn: "Gönder", loadingBtn: "Gönderiliyor...", optTech: "Teknik Sorun", optPayment: "Ödeme Sorunu", optAccount: "Hesap Sorunu", optOther: "Diğer", optNormal: "Normal", optUrgent: "Acil" },
  DE: { backHome: "Zurück", title: "Ein Problem?", desc: "Unser Support-Team ist für Sie da.", success: "Bericht erhalten", submitAnother: "Noch einen senden", fullName: "Name", email: "E-Mail", issueType: "Problemtyp", priority: "Priorität", descLabel: "Beschreibung", submitBtn: "Senden", loadingBtn: "Wird gesendet...", optTech: "Technisches Problem", optPayment: "Zahlungsproblem", optAccount: "Kontoproblem", optOther: "Andere", optNormal: "Normal", optUrgent: "Dringend" }
};

export default function ReportPage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentLang = lang && REPORT_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = REPORT_TEXTS[currentLang];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", type: "", priority: "normal", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang: currentLang })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTicketId(data.ticketId);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", type: "", priority: "normal", description: "" });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert("Error submitting report.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-20 text-slate-300" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 lg:px-12 max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 mb-10 hover:bg-rose-500/10">
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{ui.backHome}</span>
        </Link>

        <div className="bg-slate-900/40 border border-white/5 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-5/12 bg-gradient-to-br from-rose-950/40 to-slate-950 p-10 flex flex-col justify-center">
            <AlertTriangle className="w-12 h-12 text-rose-400 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">{ui.title}</h2>
            <p className="text-slate-400">{ui.desc}</p>
          </div>

          <div className="lg:w-7/12 p-10 bg-slate-950/50">
            {isSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">{ui.success}</h3>
                <p className="text-slate-400 mb-8">Ticket: <span className="text-emerald-400">#{ticketId}</span></p>
                <button onClick={() => setIsSubmitted(false)} className="px-6 py-2.5 bg-slate-800 text-white rounded-xl">{ui.submitAnother}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={ui.fullName} className="bg-slate-900/80 border border-slate-700/80 rounded-xl py-3 px-4 text-white focus:border-rose-500 outline-none" />
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={ui.email} className="bg-slate-900/80 border border-slate-700/80 rounded-xl py-3 px-4 text-white focus:border-rose-500 outline-none" dir="ltr" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="bg-slate-900/80 border border-slate-700/80 rounded-xl py-3 px-4 text-white focus:border-rose-500 outline-none">
                    <option value="" disabled>{ui.issueType}</option>
                    <option value="tech">{ui.optTech}</option>
                    <option value="payment">{ui.optPayment}</option>
                    <option value="account">{ui.optAccount}</option>
                    <option value="other">{ui.optOther}</option>
                  </select>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="bg-slate-900/80 border border-slate-700/80 rounded-xl py-3 px-4 text-white focus:border-rose-500 outline-none">
                    <option value="normal">{ui.optNormal}</option>
                    <option value="urgent">{ui.optUrgent}</option>
                  </select>
                </div>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder={ui.descLabel} className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-3 px-4 text-white focus:border-rose-500 resize-none outline-none"></textarea>
                <button type="submit" disabled={isLoading} className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex gap-2 items-center w-full sm:w-auto justify-center">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                  {isLoading ? ui.loadingBtn : ui.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}