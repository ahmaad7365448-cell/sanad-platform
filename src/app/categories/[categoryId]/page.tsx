"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// قاعدة بيانات واقعية ومفصلة جداً لجميع الأقسام
const CATEGORIES_DATA: Record<string, any> = {
  // ---------------------------------------------------------
  // 1. قسم العقارات (تفصيل شامل)
  // ---------------------------------------------------------
  'real-estate': {
    title: "العقارات والأراضي",
    desc: "تصفح الشقق، الفلل، الأراضي الزراعية، والمحلات التجارية المتاحة للبيع أو الإيجار.",
    filters: ["جميع العقارات", "شقق داخل أبنية", "فلل وبيوت مستقلة", "أراضي زراعية", "أراضي معدة للبناء", "محلات تجارية", "مستودعات ومصانع"],
    products: [
      { 
        id: 101, category: "شقق داخل أبنية", title: "شقة سكنية إكساء سوبر ديلوكس", desc: "مساحة 150م، 3 غرف نوم وصالة، طابق ثالث، إطلالة مفتوحة. الإكساء ممتاز مع تدفئة مركزية.", 
        price: "85,000", tag: "للبيع", location: "دمشق - المزة" 
      },
      { 
        id: 102, category: "فلل وبيوت مستقلة", title: "فيلا مستقلة مع مسبح", desc: "مساحة الأرض 1000م، البناء 400م طابقين. مسبح خاص، حديقة مشجرة، وكراج يتسع لـ 3 سيارات.", 
        price: "350,000", tag: "للبيع", location: "ريف دمشق - يعفور" 
      },
      { 
        id: 103, category: "شقق داخل أبنية", title: "شقة مفروشة للإيجار", desc: "فرش جديد بالكامل، مساحة 90م، غرفتين وصالة، مكيفة ومخدمة بالكهرباء (طاقة شمسية).", 
        price: "400", tag: "إيجار شهري", location: "دمشق - المالكي" 
      },
      { 
        id: 104, category: "أراضي زراعية", title: "أرض زراعية خصبة", desc: "مساحة 10 دونم، مزروعة بأشجار الزيتون المثمرة، تحتوي على بئر ماء مرخص وسور كامل.", 
        price: "120,000", tag: "للبيع", location: "ريف حمص" 
      },
      { 
        id: 105, category: "أراضي معدة للبناء", title: "محضر بناء تجاري/سكني", desc: "مساحة 600م، واجهة على الشارع العام، مرخص لبناء 5 طوابق.", 
        price: "200,000", tag: "للبيع", location: "حلب - الفرقان" 
      },
      { 
        id: 106, category: "محلات تجارية", title: "محل تجاري في سوق حيوي", desc: "مساحة 45م، واجهة زجاجية، ديكور جاهز، يصلح لكافة المهن.", 
        price: "60,000", tag: "للبيع", location: "دمشق - الشعلان" 
      },
      { 
        id: 107, category: "مستودعات ومصانع", title: "مستودع تخزين كبير", desc: "مساحة 500م، ارتفاع السقف 6 أمتار، مدخل واسع لدخول الشاحنات.", 
        price: "1,500", tag: "إيجار شهري", location: "المدينة الصناعية - عدرا" 
      },
    ]
  },

  // ---------------------------------------------------------
  // 2. قسم السيارات والمحركات
  // ---------------------------------------------------------
  'vehicles': {
    title: "السيارات والمحركات",
    desc: "أحدث العروض للسيارات السياحية، الشاحنات، والدراجات النارية بضمان فحص شامل.",
    filters: ["الجميع", "سيارات سياحية", "سيارات عائلية (فان)", "دفع رباعي (جيب)", "شاحنات وبيك أب", "دراجات نارية", "قطع غيار"],
    products: [
      { id: 201, category: "سيارات سياحية", title: "كيا سيراتو 2020", desc: "أوتوماتيك، خالية العلام تماماً، عداد 40 ألف كم، صيانة دورية بالوكالة.", price: "18,500", tag: "مستعمل - كالجديد", location: "معرض دمشق" },
      { id: 202, category: "دفع رباعي (جيب)", title: "هيونداي سنتافي 2018", desc: "دفع رباعي 4x4، فرش جلد، فتحة سقف بانوراما، 7 مقاعد.", price: "28,000", tag: "مستعمل", location: "معرض حلب" },
      { id: 203, category: "شاحنات وبيك أب", title: "تويوتا هايلوكس دبل كابين", desc: "موديل 2015، محرك ديزل ممتاز، جاهز للعمل الشاق.", price: "15,000", tag: "مستعمل", location: "حمص" },
      { id: 204, category: "سيارات عائلية (فان)", title: "هيونداي H1", desc: "موديل 2012، يتسع لـ 11 راكب، تكييف مركزي ممتاز.", price: "11,000", tag: "مستعمل", location: "اللاذقية" },
      { id: 205, category: "دراجات نارية", title: "دراجة نارية (بارت) 150cc", desc: "محرك جديد بالكرتونة، أوراق جمركية كاملة لتسجيلها أصولاً.", price: "850", tag: "جديد", location: "دمشق" },
      { id: 206, category: "قطع غيار", title: "طقم إطارات ميشلان (4 قطع)", desc: "قياس 16، جديد إنتاج العام الحالي، مع خدمة التركيب والترصيص.", price: "320", tag: "جديد", location: "مركز الصيانة" },
    ]
  },

  // ---------------------------------------------------------
  // 3. قسم الإلكترونيات
  // ---------------------------------------------------------
  'electronics': {
    title: "الإلكترونيات والأجهزة الذكية",
    desc: "أفضل الهواتف، الشاشات، وأجهزة الكمبيوتر مع كفالة حقيقية.",
    filters: ["الكل", "هواتف محمولة", "حواسيب ولابتوب", "شاشات وتلفزيونات", "أجهزة منزلية كهربائية", "إكسسوارات"],
    products: [
      { id: 301, category: "هواتف محمولة", title: "Apple iPhone 15 Pro Max", desc: "ذاكرة 256GB، تيتانيوم طبيعي، نسخة الشرق الأوسط مكفولة.", price: "1,250", tag: "جديد", location: "متجر التقنية" },
      { id: 302, category: "هواتف محمولة", title: "Samsung Galaxy S24 Ultra", desc: "رام 12GB، ذاكرة 512GB، مع قلم S-Pen الذكي.", price: "1,150", tag: "جديد", location: "متجر التقنية" },
      { id: 303, category: "حواسيب ولابتوب", title: "لابتوب HP Victus Gaming", desc: "معالج Core i7 جيل 13، كرت شاشة RTX 4060، رام 16GB.", price: "950", tag: "جديد", location: "شركة الحواسيب" },
      { id: 304, category: "شاشات وتلفزيونات", title: "شاشة LG 65 بوصة OLED", desc: "دقة 4K Smart TV مع ريموت سحري وكفالة سنة.", price: "1,100", tag: "جديد", location: "صالة العرض" },
      { id: 305, category: "أجهزة منزلية كهربائية", title: "غسالة بيكو 9 كيلو", desc: "محرك انفرتر موفر للطاقة، برامج متعددة، كفالة 3 سنوات.", price: "380", tag: "جديد", location: "قسم الأدوات المنزلية" },
      { id: 306, category: "أجهزة منزلية كهربائية", title: "براد الحافظ 24 قدم", desc: "تبريد بخار، تصميم عصري، لون فضي.", price: "450", tag: "جديد", location: "قسم الأدوات المنزلية" },
    ]
  },

  // ---------------------------------------------------------
  // 4. قسم الأثاث المنزلي
  // ---------------------------------------------------------
  'home': {
    title: "الأثاث والمفروشات",
    desc: "أرقى موديلات الأثاث والمفروشات لتجهيز منزلك بالكامل.",
    filters: ["الكل", "غرف نوم", "أطقم جلوس وصالون", "غرف سفرة", "سجاد وفرش", "ديكور وإضاءة"],
    products: [
      { id: 401, category: "أطقم جلوس وصالون", title: "طقم كنب زاوية حديث", desc: "قماش كتان ضد البقع، إسفنج ضغط عالي، مع طاولة وسط هدية.", price: "450", tag: "جديد", location: "معرض المفروشات" },
      { id: 402, category: "غرف نوم", title: "غرفة نوم مجوز طراز ملكي", desc: "خشب زان محفور يدوياً، تتضمن خزانة 6 درف، تخت، تسريحة، و2 كومودينو.", price: "1,200", tag: "جديد", location: "ورشة النجارة - حلب" },
      { id: 403, category: "غرف نوم", title: "غرفة نوم شبابية (سريرين)", desc: "سريرين مفردين، خزانة 3 درف، ومكتب دراسي. خشب MDF تركي.", price: "350", tag: "جديد", location: "معرض المفروشات" },
      { id: 404, category: "غرف سفرة", title: "طاولة سفرة خشب بلوط", desc: "طاولة تتسع لـ 8 أشخاص مع كراسي منجدة بقماش مخمل.", price: "600", tag: "جديد", location: "معرض المفروشات" },
      { id: 405, category: "سجاد وفرش", title: "سجادة صوف نساجون", desc: "قياس 3×4 متر، نقشة كلاسيكية ألوان ثابتة، سماكة عالية.", price: "120", tag: "جديد", location: "قسم السجاد" },
    ]
  },

  // ---------------------------------------------------------
  // 5. قسم الأزياء والملابس
  // ---------------------------------------------------------
  'fashion': {
    title: "الأزياء والملابس",
    desc: "أحدث صيحات الموضة من الملابس العائلية والأحذية بجودة ممتازة.",
    filters: ["الكل", "ألبسة رجالية", "ألبسة نسائية", "ألبسة أطفال", "أحذية وحقائب", "ملابس شتوية"],
    products: [
      { id: 501, category: "ملابس شتوية", title: "جاكيت رجالي مبطن", desc: "مقاوم للماء، مبطن بالفرو من الداخل، متوفر بكافة المقاسات.", price: "45", tag: "جديد", location: "قسم الألبسة" },
      { id: 502, category: "ألبسة نسائية", title: "فستان سهرة طويل", desc: "تصميم تركي أنيق، قماش ساتان مع تطريز ناعم.", price: "85", tag: "جديد", location: "قسم الألبسة" },
      { id: 503, category: "ألبسة أطفال", title: "طقم ولادي 3 قطع", desc: "بنطال، قميص، وجيليه. قطن 100% مناسب لعمر 5-10 سنوات.", price: "25", tag: "جديد", location: "قسم الألبسة" },
      { id: 504, category: "أحذية وحقائب", title: "حذاء رياضي طبي", desc: "نعل مريح جداً للمشي الطويل، متوفر ألوان (أسود، أبيض، كحلي).", price: "30", tag: "جديد", location: "قسم الأحذية" },
    ]
  },

  // ---------------------------------------------------------
  // الأقسام الخدمية (دعم العائلة - حسب الطلب)
  // ---------------------------------------------------------
  'food': {
    title: "سلة غذائية ومؤونة",
    desc: "حدد المواد بدقة لشرائها وتوصيلها لعائلتك.",
    filters: ["جميع الخدمات", "غذائيات", "مونة الشتاء"],
    products: [
      { id: 601, category: "غذائيات", title: "تجهيز سلة غذائية مخصصة", desc: "اكتب (مثال: 5 كيلو سكر، تنكة زيت، 10 كيلو رز...).", price: "مفتوح", tag: "حسب الطلب", location: "سوبر ماركت معتمد" },
    ]
  },
  'meat': {
    title: "لحوم طازجة",
    desc: "تأمين لحوم العجل والخروف الطازجة يومياً.",
    filters: ["الكل"],
    products: [
      { id: 701, category: "الكل", title: "طلب لحوم مخصص", desc: "حدد نوع اللحم (عجل، خروف) والكمية ونوع الفرم.", price: "مفتوح", tag: "حسب الطلب", location: "ملحمة معتمدة" },
    ]
  },
  'medicine': {
    title: "أدوية وعلاجات",
    desc: "تأمين الأدوية المطلوبة من الصيدليات.",
    filters: ["الكل"],
    products: [
      { id: 801, category: "الكل", title: "تأمين وصفة طبية", desc: "اكتب أسماء الأدوية المطلوبة بدقة لتأمينها.", price: "مفتوح", tag: "حسب الطلب", location: "صيدلية معتمدة" },
    ]
  },
  'solar': {
    title: "منظومة طاقة شمسية",
    desc: "ألواح، بطاريات، وإنفرترات.",
    filters: ["الكل", "بطاريات", "ألواح"],
    products: [
      { id: 901, category: "بطاريات", title: "بطارية طاقة شمسية", desc: "حدد حجم ونوع البطارية (أنبوبية، جل، ليثيوم).", price: "مفتوح", tag: "حسب الطلب", location: "شركة الطاقة" },
    ]
  },
  'school': {
    title: "مستلزمات مدرسية",
    desc: "تجهيز الطلاب بالمدارس.",
    filters: ["الكل"],
    products: [
      { id: 1001, category: "الكل", title: "تجهيز حقيبة مدرسية", desc: "حقيبة مع كامل القرطاسية واللباس المدرسي.", price: "مفتوح", tag: "حسب الطلب", location: "مكتبة معتمدة" },
    ]
  },
  'bills': {
    title: "تسديد فواتير",
    desc: "دفع الفواتير إلكترونياً.",
    filters: ["الكل"],
    products: [
      { id: 1101, category: "الكل", title: "دفع فاتورة (كهرباء/ماء/اتصالات)", desc: "أدخل رقم الاشتراك وقيمة الفاتورة.", price: "مفتوح", tag: "حسب الطلب", location: "مركز الدفع" },
    ]
  }
};

// بيانات افتراضية
const DEFAULT_DATA = {
  title: "قسم المنتجات",
  desc: "تصفح منتجات هذا القسم وأضفها لطلبك بنظام الاستلام الآمن.",
  filters: ["جميع المنتجات", "الأحدث"],
  products: [
    { id: 999, category: "جميع المنتجات", title: "منتج تجريبي", desc: "وصف المنتج سيظهر هنا لاحقاً.", price: "00", tag: "متاح", location: "متجر سَنَد" }
  ]
};

export default function CategoryProductsPage({ params }: { params: { categoryId: string } }) {
  const { lang } = useLanguage();
  const isRtl = lang === "AR" || !lang;
  
  const currentCategory = CATEGORIES_DATA[params.categoryId] || DEFAULT_DATA;
  const [activeFilter, setActiveFilter] = useState(currentCategory.filters[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = currentCategory.products.filter((product: any) => {
    const matchesFilter = activeFilter === currentCategory.filters[0] || product.category === activeFilter;
    const matchesSearch = product.title.includes(searchQuery) || product.desc.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-20 relative" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 p-4 shadow-lg">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center bg-slate-900 rounded-full border border-slate-700/50 p-1">
                <span className="text-xs px-3 text-slate-400">العملة الافتراضية:</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">USD $</span>
                <span className="px-3 text-sm text-slate-400 hidden sm:inline-block">TRY ₺</span>
                <span className="px-3 text-sm text-slate-400 hidden sm:inline-block">EUR €</span>
              </div>
           </div>
           
           <Link href="/categories" className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900/50 px-4 py-2 rounded-xl transition-colors border border-slate-800">
             {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
             <span className="text-sm font-medium">العودة للأقسام</span>
           </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-12">
        {/* Header section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{currentCategory.title}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">{currentCategory.desc}</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12 space-y-6">
           <div className="relative max-w-2xl mx-auto">
             <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
               <Search className="w-5 h-5 text-slate-500" />
             </div>
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-slate-900/80 border border-slate-700 text-white text-base rounded-2xl focus:ring-emerald-500 focus:border-emerald-500 block p-4 pr-12 outline-none transition-all shadow-lg" 
               placeholder="ابحث عن طلبك (مثال: شقة للبيع، كيا سيراتو، شاشة LG...)" 
             />
           </div>

           <div className="flex flex-wrap justify-center gap-3">
             {currentCategory.filters.map((filter: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === filter 
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
             ))}
           </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {filteredProducts.map((product: any) => (
             <div key={product.id} className="bg-slate-900/60 border border-slate-800 rounded-[2rem] overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                
                <div className="h-56 bg-slate-800 relative overflow-hidden shrink-0 flex items-center justify-center">
                   {/* خلفية تجريدية بدل الصور ريثما يتم رفع صور حقيقية */}
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-transparent"></div>
                   
                   <span className="relative z-20 text-slate-500 font-bold text-lg opacity-30">صورة المنتج</span>
                   
                   <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700 text-xs font-bold text-emerald-400 shadow-lg">
                     {product.tag}
                   </div>
                   <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5">
                     <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                     {product.location}
                   </div>
                </div>
                
                <div className="p-6 pt-6 relative z-20 flex flex-col flex-grow">
                   <div className="text-xs text-emerald-500 font-bold mb-2">{product.category}</div>
                   <h3 className="text-xl font-bold text-white mb-3 leading-snug">{product.title}</h3>
                   <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{product.desc}</p>
                   
                   <div className="flex items-center justify-between mb-5 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                      <span className="text-slate-400 text-sm font-medium">السعر المطلوب:</span>
                      <span className="text-emerald-400 font-black text-xl">
                        {product.price === "مفتوح" ? "حسب الطلب" : `$${product.price}`}
                      </span>
                   </div>

                   <button className="w-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-bold py-4 rounded-xl transition-all border border-slate-700 hover:border-emerald-400 flex justify-center items-center gap-2 mt-auto">
                     <span>إضافة للطلب أو التواصل</span>
                     <span className="text-xl leading-none mb-1">+</span>
                   </button>
                </div>
             </div>
           ))}

           {filteredProducts.length === 0 && (
             <div className="col-span-full py-20 text-center">
               <p className="text-slate-400 text-lg">لم يتم العثور على نتائج تطابق بحثك في هذا القسم.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}