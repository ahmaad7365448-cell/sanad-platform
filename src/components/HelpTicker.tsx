"use client";

import { HeartHandshake, Megaphone } from "lucide-react";

export default function HelpTicker() {
  // بيانات تجريبية (سنقوم لاحقاً بربطها بجدول help_requests في Supabase)
  const tickerItems = [
    { id: 1, type: 'help', text: 'طلب مساعدة عاجلة: تأمين أدوية لعائلة في دمشق', action: 'تواصل للمساعدة' },
    { id: 2, type: 'alert', text: 'إعلان: انطلاق قسم "السيارات والعقارات" قريباً على سَنَد', action: 'تصفح الأقسام' },
    { id: 3, type: 'help', text: 'طلب مساعدة: كفالة طالب جامعي في حلب', action: 'تقديم الدعم' },
    { id: 4, type: 'alert', text: 'تنبيه: يمكنك الآن الشراء لعائلتك بنظام الاستلام الآمن (الرقم السري)', action: 'آلية العمل' },
  ];

  return (
    <div className="bg-emerald-950/90 border-b border-emerald-500/30 text-white overflow-hidden py-2.5 relative z-50 flex items-center backdrop-blur-md" dir="rtl">
      
      {/* ستايل الحركة والتمرير (CSS) */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 35s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused; /* إيقاف الشريط عند وضع الماوس عليه */
        }
      `}</style>

      <div className="animate-scroll whitespace-nowrap gap-12 px-4">
        {/* تكرار العناصر مرتين لضمان استمرارية التمرير بسلاسة */}
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div 
            key={`${item.id}-${index}`} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            {item.type === 'help' ? (
              <HeartHandshake className="w-5 h-5 text-rose-400 group-hover:text-rose-300 transition-colors" />
            ) : (
              <Megaphone className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            )}
            
            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
              {item.text}
            </span>
            
            <span className="text-xs bg-slate-800/80 px-3 py-1 rounded-full text-emerald-300 border border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-all">
              {item.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}