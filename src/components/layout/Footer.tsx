import Link from "next/link";
import { MapPin, Phone, Mail, Package, ArrowLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-slate-800/60 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* العمود الأول: عن المنصة */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide text-white">سَنَد</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              منظومة SaaS المؤسسية الأولى لتمكين المغتربين السوريين من دعم عائلاتهم في الداخل بأمان وسرعة.
            </p>
          </div>

          {/* العمود الثاني: المنصة */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">المنصة</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/expat" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm group">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  باقات المغتربين
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm group">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  الخدمات المتاحة
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: السياسات والدعم */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">السياسات والدعم</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm group">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm group">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: تواصل معنا */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>تركيا، بورصا، عثمان غازي<br/>16165</span>
              </li>
              <li>
                <a href="https://wa.me/905423456316" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-sm" dir="ltr">
                  <span className="text-right w-full">+90 542 345 63 16</span>
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                </a>
              </li>
              <li>
                <a href="mailto:aborame5230200@icloud.com" className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-sm break-all">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  aborame5230200@icloud.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* الحقوق السفلية */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} منصة سَنَد المؤسسية. كافة الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <a href="mailto:aborame5230200@icloud.com" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://wa.me/905423456316" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}