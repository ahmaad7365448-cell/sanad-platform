import Link from "next/link";
import { ArrowRight, FileText, Scale, AlertCircle } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden text-slate-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-4xl">
        
        {/* زر الرجوع الكبسولي الاحترافي متناسق مع لون الصفحة */}
        <div className="flex justify-start mb-10 md:mb-12">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-medium hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-cyan-500/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
            العودة للرئيسية
          </Link>
        </div>

        <div className="mb-16">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 shadow-lg shadow-cyan-500/5">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">شروط الاستخدام</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            استخدامك لمنصة <span className="text-cyan-400 font-bold">سَنَد</span> يعني موافقتك على هذه الشروط التي وُضعت لضمان حقوقك وحقوق المنصة في تقديم خدمة شفافة وموثوقة.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">1. طبيعة الخدمة والأسعار</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              تعمل منصة "سَنَد" كوكيل لوجستي لتمكين المغتربين من تأمين الاحتياجات لعائلاتهم في دمشق وريفها. 
              يتم تسعير كافة الطلبات بالدولار الأمريكي (USD) نظراً لكون الدفع يتم من خارج سوريا، ونضمن أن تكون الأسعار مطابقة لأسعار السوق المحلي الموازية لضمان العدالة وتجنب العمولات المخفية.
            </p>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">2. سياسة الإلغاء والاسترجاع</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              لأن معظم خدماتنا تعتمد على المنتجات الطازجة (كالأغذية واللحوم) أو تسديد الفواتير الفورية:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-2 marker:text-cyan-500">
              <li>يمكن إلغاء الطلب واسترداد المبلغ بالكامل إذا لم يدخل قيد التنفيذ (عادة خلال أول 3 ساعات من الطلب).</li>
              <li>بمجرد شراء المنتجات وبدء التوصيل، لا يمكن إلغاء الطلب.</li>
              <li>في حال وجود تلف أو خطأ في المنتجات المسلّمة للمستفيد في دمشق، نلتزم بالتعويض الكامل أو استبدال المنتج فوراً بناءً على إثبات من المستفيد.</li>
            </ul>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">3. مسؤولية المستخدم</h2>
            <p className="text-slate-400 leading-relaxed">
              المستخدم (المغترب) هو المسؤول الأول عن صحة بيانات المستلم (العنوان، أرقام الهواتف المتاحة في سوريا). المنصة لا تتحمل مسؤولية تأخير الطلبات الناتج عن عدم رد المستفيد على الهاتف أو كتابة عنوان خاطئ.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}