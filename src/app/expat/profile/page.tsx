"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserIcon, Mail, Phone, MapPin, Settings, Package, ShieldCheck, LogOut, ArrowRight, ArrowLeft, Loader2, Camera, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

const PROFILE_TEXTS: Record<string, any> = {
  AR: {
    back: "العودة لبوابة السَّنَد",
    pageTitle: "حساب الداعم",
    pageSub: "إدارة بياناتك، متابعة طلباتك، وإعدادات الأمان.",
    trusted: "عضو موثوق",
    tabProfile: "البيانات الشخصية",
    tabOrders: "سجل الطلبات",
    tabSecurity: "الأمان وكلمة المرور",
    logout: "تسجيل الخروج",
    personalInfoTitle: "البيانات الشخصية",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "رقم الهاتف (واتساب)",
    countryLabel: "بلد الإقامة",
    saveBtn: "حفظ التعديلات",
    loading: "جاري التحميل...",
    logoutLoading: "جاري الخروج...",
  },
  EN: {
    back: "Back to Portal",
    pageTitle: "Supporter Account",
    pageSub: "Manage your data, track orders, and security.",
    trusted: "Trusted Member",
    tabProfile: "Personal Info",
    tabOrders: "Order History",
    tabSecurity: "Security & Password",
    logout: "Log Out",
    personalInfoTitle: "Personal Information",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone (WhatsApp)",
    countryLabel: "Country of Residence",
    saveBtn: "Save Changes",
    loading: "Loading...",
    logoutLoading: "Logging out...",
  }
};

export default function ProfilePage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false); // حالة جديدة لاكتشاف الصور المكسورة
  const fileInputRef = useRef<HTMLInputElement>(null); // مرجع لفتح نافذة اختيار الملفات

  useEffect(() => {
    setMounted(true);
    
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          router.push("/auth/login");
          return;
        }

        const currentUser = session.user;
        const metadata = currentUser.user_metadata || {};
        
        setEmail(currentUser.email || "");
        setFullName(metadata.full_name || metadata.name || "");
        setAvatarUrl(metadata.avatar_url || metadata.picture || null);
        
      } catch (err) {
        console.error("Session Error:", err);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const currentLang = lang && PROFILE_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = PROFILE_TEXTS[currentLang];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم حفظ التعديلات بنجاح!");
  };

  // دالة رفع وتغيير الصورة
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // إنشاء رابط مؤقت لعرض الصورة للمستخدم فوراً
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
      setImageError(false); // تصفير الخطأ إن وجد لتظهر الصورة الجديدة
      
      // ملاحظة: لرفع الصورة فعلياً لقاعدة البيانات لاحقاً يتم استخدام Supabase Storage هنا
    }
  };

  const initialLetter = fullName ? fullName.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : "S");

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-10 pb-20 text-slate-300 relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-emerald-500/5 blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl relative z-10">
        
        <div className="flex justify-between items-center mb-12">
          <Link href="/expat" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all backdrop-blur-md text-sm font-medium">
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{ui.back}</span>
          </Link>
        </div>

        <div className={`mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{ui.pageTitle}</h1>
          <p className="text-slate-400">{ui.pageSub}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-1/3">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] p-6 shadow-xl sticky top-8">
              
              <div className="flex items-center gap-4 mb-8 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                <div className="relative">
                  {/* إدخال الملفات المخفي لتغيير الصورة */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  {avatarUrl && !imageError ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      onError={() => setImageError(true)} // في حال كسر الرابط، يتم تفعيل الحماية
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-emerald-500/30" 
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {initialLetter}
                    </div>
                  )}
                  
                  {/* زر الكاميرا التفاعلي */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-7 h-7 bg-slate-800 rounded-full border-2 border-slate-950 flex items-center justify-center cursor-pointer hover:bg-emerald-500 hover:text-slate-900 transition-colors z-10"
                    title="تغيير الصورة الشخصية"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-300 hover:text-inherit" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 truncate w-40">{fullName || "مستخدم سَنَد"}</h3>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">{ui.trusted}</span>
                  </div>
                </div>
              </div>

              <nav className="space-y-2 mb-8">
                <button className="w-full flex items-center gap-3 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold transition-all">
                  <Settings className="w-5 h-5" />
                  <span>{ui.tabProfile}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/80 text-slate-400 hover:text-white rounded-xl font-medium transition-all">
                  <Package className="w-5 h-5" />
                  <span>{ui.tabOrders}</span>
                </button>
              </nav>

              <div className="pt-6 border-t border-slate-800">
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> {ui.logoutLoading}</>
                  ) : (
                    <><LogOut className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} /> {ui.logout}</>
                  )}
                </button>
              </div>

            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] p-8 md:p-10 shadow-xl">
              
              <h2 className="text-2xl font-bold text-white mb-8">{ui.personalInfoTitle}</h2>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.nameLabel}</label>
                    <div className="relative group">
                      <UserCheck className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto w-5 h-5 text-slate-500 group-focus-within:text-emerald-400`} />
                      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} 
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:border-emerald-500 focus:ring-1 outline-none`} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.emailLabel}</label>
                    <div className="relative group">
                      <Mail className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto w-5 h-5 text-slate-500`} />
                      <input type="email" value={email} disabled dir="ltr"
                        className={`w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-slate-400 cursor-not-allowed outline-none`} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.phoneLabel}</label>
                    <div className="relative group">
                      <Phone className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto w-5 h-5 text-slate-500 group-focus-within:text-emerald-400`} />
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" placeholder="+90 5XX XXX XX XX"
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:border-emerald-500 focus:ring-1 outline-none`} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">{ui.countryLabel}</label>
                    <div className="relative group">
                      <MapPin className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto w-5 h-5 text-slate-500 group-focus-within:text-emerald-400`} />
                      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="مثال: تركيا، بورصا"
                        className={`w-full bg-slate-950/50 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} text-white focus:border-emerald-500 focus:ring-1 outline-none`} />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    {ui.saveBtn}
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