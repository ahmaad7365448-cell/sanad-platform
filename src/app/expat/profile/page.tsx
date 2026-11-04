"use client";

import Link from "next/link";
import { ArrowRight, User, Package, Settings, LogOut, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-24 relative overflow-hidden text-slate-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-emerald-500/10 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* زر الرجوع */}
        <div className="flex justify-start mb-8">
          <Link 
            href="/expat" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <div className="p-1 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
            العودة لبوابة السَّنَد
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">حساب الداعم</h1>
          <p className="text-slate-400">إدارة بياناتك، متابعة طلباتك، وإعدادات الأمان.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* القائمة الجانبية (Sidebar) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">أحمد حارثة</h3>
                  <p className="text-sm text-emerald-400 font-medium">عضو موثوق</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 transition-colors">
                  <Settings className="w-5 h-5" />
                  البيانات الشخصية
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                  سجل الطلبات
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                  الأمان وكلمة المرور
                </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-slate-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors font-medium">
                  <LogOut className="w-5 h-5" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>

          {/* محتوى الإعدادات (Main Content) */}
          <div className="lg:w-2/3">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">البيانات الشخصية</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">الاسم الكامل</label>
                    <div className="relative">
                      <User className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input type="text" defaultValue="أحمد حارثة" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input type="email" defaultValue="aborame5230200@icloud.com" dir="ltr" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-right" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">رقم الهاتف (واتساب)</label>
                    <div className="relative">
                      <Phone className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input type="text" defaultValue="+90 542 345 63 16" dir="ltr" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-right" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">بلد الإقامة</label>
                    <div className="relative">
                      <MapPin className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
                      <input type="text" defaultValue="تركيا، بورصا" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pr-12 pl-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
                  <button type="button" className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/20">
                    حفظ التعديلات
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}