"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShoppingBag, HeartPulse, Monitor, Box, Wallet, 
  Check, Plus, X, ArrowRight, BookOpen, Gift, Heart, Sparkles 
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "جميع الخدمات", icon: ShoppingBag },
  { id: "food", label: "غذائيات ولحوم", icon: Box },
  { id: "medical", label: "رعاية طبية", icon: HeartPulse },
  { id: "electronics", label: "طاقة وكهربائيات", icon: Monitor },
  { id: "education", label: "تعليم وقرطاسية", icon: BookOpen },
  { id: "gifts", label: "ألبسة وهدايا", icon: Gift },
  { id: "charity", label: "تبرعات وأعمال خيرية", icon: Heart },
  { id: "services", label: "فواتير وخدمات", icon: Wallet },
];

const SERVICES_DB = [
  { 
    id: "1", category: "food", title: "سلة غذائية ومؤونة", desc: "اكتب المكونات التي تريدها بالضبط (رز، سمنة، معلبات...) وسنقوم بتجهيزها.", priceType: "مفتوح حسب الطلب", icon: Box, 
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أريد 5 كيلو رز قصير، 2 كيلو سمنة حيواني، 3 ليتر زيت زيتون، وكرتونة معجون طماطم."
  },
  { 
    id: "2", category: "food", title: "لحوم طازجة", desc: "حدد نوع اللحم (عجل، غنم) والكمية التي ترغب بها بدون أي قيود.", priceType: "مفتوح حسب الطلب", icon: Box, 
    image: "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أريد 3 كيلو لحم غنم مفروم ناعم، و 2 كيلو شرحات عجل، وتوصيلها مبردة."
  },
  { 
    id: "3", category: "medical", title: "أدوية وعلاجات مزمنة", desc: "اكتب أسماء الأدوية المطلوبة والكميات وسنقوم بتأمينها من أفضل الصيدليات.", priceType: "مفتوح حسب الطلب", icon: HeartPulse, 
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أحتاج 4 علب دواء ضغط (كونكور 5ملغ)، وعلبتين مسكن ألم (بانادول أدفانس)."
  },
  { 
    id: "4", category: "electronics", title: "منظومة طاقة شمسية وبطاريات", desc: "حدد حجم البطارية أو نوع الإنفرتر الذي تحتاجه لعائلتك.", priceType: "مفتوح حسب الطلب", icon: Monitor, 
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أحتاج بطارية جل أنبوبية 200 أمبير مكفولة، مع إنفرتر 3500 واط شمسي."
  },
  { 
    id: "5", category: "electronics", title: "أجهزة منزلية وكهربائيات", desc: "شاشات، برادات، غسالات. اذكر المواصفات التي تفضلها.", priceType: "مفتوح حسب الطلب", icon: Monitor, 
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أريد غسالة حوضين سعة 8 كيلو، أو شاشة ذكية 43 بوصة ماركة معروفة."
  },
  { 
    id: "6", category: "education", title: "مستلزمات مدرسية وجامعية", desc: "حقائب، قرطاسية، أو حتى أقساط مدرسية وجامعية للطلاب.", priceType: "مفتوح حسب الطلب", icon: BookOpen, 
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أحتاج تجهيز حقيبتين مدرسيتين لطلاب مرحلة ابتدائية (دفاتر، أقلام، ألوان)."
  },
  { 
    id: "7", category: "gifts", title: "ألبسة وتجهيز هدايا", desc: "ألبسة ولادية، رجالية، نسائية، أو هدايا مغلفة للمناسبات والأعياد.", priceType: "مفتوح حسب الطلب", icon: Gift, 
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أريد شراء طقم شتوي ولادي (عمر 10 سنوات)، وتغليفه كهدية بمناسبة النجاح."
  },
  { 
    id: "8", category: "charity", title: "تبرعات وأعمال خيرية", desc: "ساهم في دعم عائلات محتاجة، كفالة أيتام، أو توزيع وجبات في دمشق وريفها.", priceType: "مفتوح حسب الطلب", icon: Heart, 
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أريد إخراج زكاة بمبلغ 100$ لتجهيز وتوزيع وجبات طعام لعائلات محتاجة في ريف دمشق."
  },
  { 
    id: "9", category: "services", title: "تسديد فواتير (كهرباء، ماء، إنترنت)", desc: "أدخل رقم الاشتراك وقيمة الفاتورة لنقوم بتسديدها فوراً.", priceType: "مفتوح حسب الطلب", icon: Wallet, 
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    example: "مثال: أريد تسديد فاتورة الهاتف الأرضي وباقة الإنترنت للرقم 011XXXXXXX بقيمة 50 ألف ليرة."
  },
];

export default function ExpatPortal() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [customDetails, setCustomDetails] = useState("");

  const filteredServices = SERVICES_DB.filter((service) => {
    const matchCategory = activeCategory === "all" || service.category === service.category && service.category === service.category; // handled securely
    const matchesCat = activeCategory === "all" || service.category === activeCategory;
    const matchSearch = service.title.includes(searchQuery) || service.desc.includes(searchQuery);
    return matchesCat && matchSearch;
  });

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDetails.trim()) return;
    alert(`تمت إضافة الطلب: ${selectedService.title}\nالتفاصيل: ${customDetails}`);
    setSelectedService(null);
    setCustomDetails("");
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-6 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* زر الرجوع الكبسولي الاحترافي */}
        <div className="flex justify-start mb-8">
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

        {/* الترويسة المؤثرة مع الآية القرآنية */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* بادج الآية القرآنية */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm md:text-base font-medium mb-6 shadow-lg shadow-emerald-500/5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span dir="rtl">﴿مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ﴾</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            بوابة دعم العائلة في <span className="text-emerald-400">دمشق وريفها</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            اختر الخدمة، واكتب التفاصيل والكميات التي تريدها بحرية تامة. نحن نصل نبل عطائك بدفء واهتمام لأهلك.
          </p>
        </div>

        {/* شريط البحث */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="ابحث عن خدمة (لحوم، بطاريات، أدوية، تبرع...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-emerald-500 transition-colors shadow-xl"
            />
            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* تصنيفات الخدمات (Tabs) */}
        <div className="flex overflow-x-auto pb-4 mb-10 border-b border-slate-800 gap-3 scrollbar-hide snap-x justify-start lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={service.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all hover:-translate-y-1 flex flex-col h-full group"
                >
                  <div className="relative aspect-video w-full bg-slate-800">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent"></div>
                    
                    <div className="absolute top-3 right-3 z-20">
                      <span className="text-[11px] font-bold px-3 py-1.5 bg-slate-900/80 backdrop-blur-md text-emerald-400 rounded-full border border-emerald-500/20 shadow-lg">
                        {service.priceType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative p-6 pt-10 flex flex-col flex-grow bg-slate-900/50 z-10">
                    <div className="absolute -top-7 right-6 w-14 h-14 rounded-2xl bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-emerald-400 shadow-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 z-20">
                      <ServiceIcon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
                    
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="w-full py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium hover:bg-emerald-500 hover:border-emerald-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      تخصيص وإضافة للطلب
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              ></motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="relative bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="relative h-32 w-full bg-slate-800 shrink-0">
                  <img src={selectedService.image} alt="Cover" className="w-full h-full object-cover object-center opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 right-6 translate-y-1/2 flex items-end gap-4 z-20">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-xl">
                      <selectedService.icon className="w-7 h-7" />
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 flex-grow relative z-10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{selectedService.title}</h3>
                    <p className="text-sm text-emerald-400 font-medium">التسعير يتم فورياً بعد تحديد طلبك بدقة</p>
                  </div>

                  <form onSubmit={handleAddToCart}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        اكتب تفاصيل طلبك والكميات بدقة (بدون أي قيود):
                      </label>
                      <textarea 
                        required
                        value={customDetails}
                        onChange={(e) => setCustomDetails(e.target.value)}
                        placeholder={selectedService.example}
                        className="w-full h-32 md:h-40 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none transition-colors text-sm md:text-base leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="flex items-center gap-3 mb-6 text-sm md:text-base text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                      <Check className="w-5 h-5 shrink-0" />
                      <span>سيقوم فريق دمشق بتجهيز هذا الطلب خصيصاً لك بأفضل جودة وموثوقية عالية.</span>
                    </div>

                    <button 
                      type="submit"
                      disabled={!customDetails.trim()}
                      className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none"
                    >
                      حفظ الطلب للمتابعة
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}