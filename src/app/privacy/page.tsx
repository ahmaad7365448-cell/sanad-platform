import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden text-slate-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-4xl">
        
        {/* زر الرجوع الكبسولي الاحترافي */}
        <div className="flex justify-start mb-10 md:mb-12">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
            العودة للرئيسية
          </Link>
        </div>

        <div className="mb-16">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/5">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">سياسة الخصوصية</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            في منصة <span className="text-emerald-400 font-bold">سَنَد</span>، ندرك تماماً حساسية البيانات الشخصية والمالية للمغتربين وعائلاتهم. وثيقتنا هذه تشرح بشفافية مطلقة كيف نحمي بياناتك.
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">1. البيانات التي نجمعها</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">نحن نجمع فقط البيانات الضرورية لتنفيذ الخدمات وإيصالها بسلامة:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-2 marker:text-emerald-500">
              <li>معلومات حساب المغترب (الاسم، البريد الإلكتروني، رقم الهاتف).</li>
              <li>تفاصيل المستفيد في دمشق وريفها (الاسم، العنوان الدقيق، رقم التواصل اللوجستي).</li>
              <li>ملاحظة: <strong className="text-emerald-400">لا نحتفظ إطلاقاً</strong> ببيانات بطاقتك الائتمانية، حيث تتم معالجتها بالكامل عبر بوابات دفع عالمية مشفرة (Lemon Squeezy/Stripe).</li>
            </ul>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">2. حماية البيانات ومشاركتها</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              تُحفظ بياناتك في قواعد بيانات سحابية مشفرة (Supabase). نحن لا نبيع ولا نؤجر بياناتك لأي طرف ثالث. تتم مشاركة اسم ورقم المستفيد وعنوانه حصرياً مع فريقنا الميداني في دمشق الموثوق والمعتمد، وذلك لغرض إيصال الطلبات فقط.
            </p>
          </section>

          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">3. التحديثات وحقوقك</h2>
            <p className="text-slate-400 leading-relaxed">
              يحق لك في أي وقت طلب حذف حسابك وكافة بياناتك وسجلات طلباتك عبر مراسلة الدعم الفني. قد نقوم بتحديث هذه السياسة، وسنعلمك بأي تغييرات جوهرية عبر البريد الإلكتروني.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}