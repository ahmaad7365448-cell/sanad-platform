"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Copy, Check, Share2, ArrowRight, ShieldCheck } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()
      .then(({ data }) => {
        if (data) setOrder(data);
      });
  }, [orderId]);

  const copyCode = () => {
    if (!order?.secret_code) return;
    navigator.clipboard.writeText(order.secret_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    if (!order) return;
    const text = `مرحباً ${order.receiver_name}، تم حجز طلبك عبر منصة سَنَد بنجاح.\nرمز الاستلام السري الخاص بك هو: *${order.secret_code}*\nيرجى إبراز هذا الرمز للبائع عند الاستلام (لا تشاركه مع أحد قبل المعاينة).`;
    window.open(`https://wa.me/${order.receiver_phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-lg w-full bg-slate-900/80 border border-emerald-500/30 rounded-[2rem] p-8 shadow-2xl backdrop-blur-xl text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>

        <h1 className="text-3xl font-black text-white mb-2">تم الدفع بنجاح!</h1>
        <p className="text-slate-400 text-sm mb-8">
          أموالك محمية بنظام الضمان الآمن في منصة سَنَد ولن تُحرر للبائع إلا بعد تسليم الطلب بالرمز السري.
        </p>

        {order ? (
          <div className="space-y-6 text-right">
            {/* بطاقة الرقم السري OTP */}
            <div className="bg-slate-950 border-2 border-dashed border-emerald-500/50 rounded-2xl p-6 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-2">رمز الاستلام السري (OTP)</span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-black tracking-widest text-emerald-400" dir="ltr">
                  {order.secret_code}
                </span>
                <button
                  onClick={copyCode}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
                  title="نسخ الرمز"
                >
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* تفاصيل الإيصال */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">المستلم في سوريا:</span>
                <span className="text-white font-bold">{order.receiver_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">رقم هاتف المستلم:</span>
                <span className="text-white font-bold" dir="ltr">{order.receiver_phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">المبلغ المدفوع:</span>
                <span className="text-emerald-400 font-black">{order.amount} {order.currency}</span>
              </div>
            </div>

            {/* زر الإرسال عبر واتساب */}
            <button
              onClick={shareWhatsApp}
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Share2 className="w-5 h-5" />
              <span>إرسال رمز الاستلام للمستلم عبر واتساب</span>
            </button>
          </div>
        ) : (
          <div className="py-8 text-slate-400 text-sm">جاري تحميل بيانات الإيصال...</div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>حماية سَنَد المضمونة</span>
          </div>
          <Link href="/" className="text-sm text-emerald-400 hover:underline flex items-center gap-1 font-bold">
            <span>العودة للرئيسية</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
      <SuccessContent />
    </Suspense>
  );
}