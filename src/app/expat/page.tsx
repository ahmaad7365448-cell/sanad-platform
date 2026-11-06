"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShoppingBag, HeartPulse, Monitor, Box, Wallet, 
  Check, Plus, X, ArrowRight, ArrowLeft, BookOpen, Gift, Heart, Sparkles, ShoppingCart 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CATEGORIES_DICT: Record<string, Array<{ id: string; label: string; icon: any }>> = {
  AR: [
    { id: "all", label: "جميع الخدمات", icon: ShoppingBag },
    { id: "food", label: "غذائيات ولحوم", icon: Box },
    { id: "medical", label: "رعاية طبية", icon: HeartPulse },
    { id: "electronics", label: "طاقة وكهربائيات", icon: Monitor },
    { id: "education", label: "تعليم وقرطاسية", icon: BookOpen },
    { id: "gifts", label: "ألبسة وهدايا", icon: Gift },
    { id: "charity", label: "تبرعات وأعمال خيرية", icon: Heart },
    { id: "services", label: "فواتير وخدمات", icon: Wallet },
  ],
  EN: [
    { id: "all", label: "All Services", icon: ShoppingBag },
    { id: "food", label: "Food & Meat", icon: Box },
    { id: "medical", label: "Medical Care", icon: HeartPulse },
    { id: "electronics", label: "Solar & Electronics", icon: Monitor },
    { id: "education", label: "Education & Stationery", icon: BookOpen },
    { id: "gifts", label: "Clothing & Gifts", icon: Gift },
    { id: "charity", label: "Charity & Donations", icon: Heart },
    { id: "services", label: "Bills & Utilities", icon: Wallet },
  ],
  TR: [
    { id: "all", label: "Tüm Hizmetler", icon: ShoppingBag },
    { id: "food", label: "Gıda ve Et", icon: Box },
    { id: "medical", label: "Tıbbi Bakım", icon: HeartPulse },
    { id: "electronics", label: "Güneş Enerjisi ve Elektronik", icon: Monitor },
    { id: "education", label: "Eğitim ve Kırtasiye", icon: BookOpen },
    { id: "gifts", label: "Giyim ve Hediyeler", icon: Gift },
    { id: "charity", label: "Bağış ve Hayır İşleri", icon: Heart },
    { id: "services", label: "Faturalar ve Hizmetler", icon: Wallet },
  ],
  DE: [
    { id: "all", label: "Alle Dienstleistungen", icon: ShoppingBag },
    { id: "food", label: "Lebensmittel & Fleisch", icon: Box },
    { id: "medical", label: "Medizinische Versorgung", icon: HeartPulse },
    { id: "electronics", label: "Solar & Elektronik", icon: Monitor },
    { id: "education", label: "Bildung & Schreibwaren", icon: BookOpen },
    { id: "gifts", label: "Kleidung & Geschenke", icon: Gift },
    { id: "charity", label: "Spenden & Wohltätigkeit", icon: Heart },
    { id: "services", label: "Rechnungen & Dienste", icon: Wallet },
  ]
};

const SERVICES_DB_DICT: Record<string, Array<any>> = {
  AR: [
    { id: "1", category: "food", title: "سلة غذائية ومؤونة", desc: "اكتب المكونات التي تريدها بالضبط وسنقوم بتجهيزها.", priceType: "مفتوح حسب الطلب", icon: Box, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", example: "مثال: أريد 5 كيلو رز قصير، 2 كيلو سمنة حيواني..." },
    { id: "2", category: "food", title: "لحوم طازجة", desc: "حدد نوع اللحم والكمية التي ترغب بها بدون قيود.", priceType: "مفتوح حسب الطلب", icon: Box, image: "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=800&q=80", example: "مثال: أريد 3 كيلو لحم غنم مفروم ناعم..." },
    { id: "3", category: "medical", title: "أدوية وعلاجات مزمنة", desc: "اكتب أسماء الأدوية المطلوبة لتأمينها من الصيدليات.", priceType: "مفتوح حسب الطلب", icon: HeartPulse, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80", example: "مثال: أحتاج 4 علب دواء ضغط، وعلبتين مسكن ألم..." },
    { id: "4", category: "electronics", title: "منظومة طاقة شمسية", desc: "حدد حجم البطارية أو الإنفرتر الذي تحتاجه لعائلتك.", priceType: "مفتوح حسب الطلب", icon: Monitor, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", example: "مثال: أحتاج بطارية جل 200 أمبير مكفولة..." },
    { id: "5", category: "education", title: "مستلزمات مدرسية", desc: "حقائب، قرطاسية، أو أقساط مدرسية للطلاب.", priceType: "مفتوح حسب الطلب", icon: BookOpen, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", example: "مثال: أحتاج تجهيز حقيبتين مدرسيتين..." },
    { id: "6", category: "services", title: "تسديد فواتير", desc: "أدخل رقم الاشتراك وقيمة الفاتورة لنقوم بتسديدها.", priceType: "مفتوح حسب الطلب", icon: Wallet, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", example: "مثال: أريد تسديد فاتورة الهاتف الأرضي..." }
  ],
  EN: [
    { id: "1", category: "food", title: "Food Basket & Provisions", desc: "Specify the exact ingredients you need and we will prepare them.", priceType: "Custom Price", icon: Box, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", example: "Example: 5kg short rice, 2kg ghee..." },
    { id: "2", category: "food", title: "Fresh Meat", desc: "Choose meat type and desired quantity without restriction.", priceType: "Custom Price", icon: Box, image: "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=800&q=80", example: "Example: 3kg minced lamb..." },
    { id: "3", category: "medical", title: "Chronic Illness Medications", desc: "Specify required medicines, sourced from verified pharmacies.", priceType: "Custom Price", icon: HeartPulse, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80", example: "Example: 4 boxes of blood pressure medication..." },
    { id: "4", category: "electronics", title: "Solar Power Systems", desc: "Select battery size or inverter type needed for your family.", priceType: "Custom Price", icon: Monitor, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", example: "Example: 200Ah Gel battery..." },
    { id: "5", category: "education", title: "School Supplies", desc: "Backpacks, stationery, or tuition fees for students.", priceType: "Custom Price", icon: BookOpen, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", example: "Example: Two school bags with notebooks..." },
    { id: "6", category: "services", title: "Utility Bill Payments", desc: "Enter subscription number and bill amount for instant payment.", priceType: "Custom Price", icon: Wallet, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", example: "Example: Pay landline bill..." }
  ],
  TR: [
    { id: "1", category: "food", title: "Gıda Sepeti ve Erzak", desc: "İhtiyacınız olan malzemeleri yazın, sizin için hazırlayalım.", priceType: "İsteğe Bağlı", icon: Box, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", example: "Örnek: 5kg pirinç, 2kg tereyağı..." },
    { id: "2", category: "food", title: "Taze Et", desc: "Et türünü ve miktarını kısıtlama olmadan belirleyin.", priceType: "İsteğe Bağlı", icon: Box, image: "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=800&q=80", example: "Örnek: 3kg kuzu kıyma..." },
    { id: "3", category: "medical", title: "Kronik Hastalık İlaçları", desc: "Gerekli ilaç isimlerini yazın, temin edelim.", priceType: "İsteğe Bağlı", icon: HeartPulse, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80", example: "Örnek: Tansiyon ilaçları..." },
    { id: "4", category: "electronics", title: "Güneş Enerjisi Sistemleri", desc: "Akü kapasitesini veya inverter tipini seçin.", priceType: "İsteğe Bağlı", icon: Monitor, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", example: "Örnek: 200Ah Gel akü..." },
    { id: "5", category: "education", title: "Okul Gereçleri", desc: "Çantalar, kırtasiye malzemeleri veya öğrenci harçları.", priceType: "İsteğe Bağlı", icon: BookOpen, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", example: "Örnek: Okul çantası ve defterler..." },
    { id: "6", category: "services", title: "Fatura Ödemeleri", desc: "Abonelik numaranızı girin, anında ödeyelim.", priceType: "İsteğe Bağlı", icon: Wallet, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", example: "Örnek: İnternet faturası ödemesi..." }
  ],
  DE: [
    { id: "1", category: "food", title: "Lebensmittelkorb & Vorräte", desc: "Geben Sie die genauen Zutaten an, wir bereiten sie vor.", priceType: "Auf Anfrage", icon: Box, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", example: "Beispiel: 5kg Reis, 2kg Butter..." },
    { id: "2", category: "food", title: "Frisches Fleisch", desc: "Wählen Sie Fleischart und Menge ohne Einschränkungen.", priceType: "Auf Anfrage", icon: Box, image: "https://images.unsplash.com/photo-1588347818036-558601350947?auto=format&fit=crop&w=800&q=80", example: "Beispiel: 3kg Hackfleisch..." },
    { id: "3", category: "medical", title: "Medikamente", desc: "Medikamentennamen angeben, wir beschaffen sie.", priceType: "Auf Anfrage", icon: HeartPulse, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80", example: "Beispiel: Blutdruckmedikamente..." },
    { id: "4", category: "electronics", title: "Solaranlagen", desc: "Wählen Sie Batteriegröße für Ihre Familie.", priceType: "Auf Anfrage", icon: Monitor, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", example: "Beispiel: 200Ah Gel-Batterie..." },
    { id: "5", category: "education", title: "Schulbedarf", desc: "Rucksäcke, Schreibwaren für Schüler.", priceType: "Auf Anfrage", icon: BookOpen, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", example: "Beispiel: Schulrucksäcke..." },
    { id: "6", category: "services", title: "Rechnungsbegleichung", desc: "Abonnementnummer eingeben für sofortige Zahlung.", priceType: "Auf Anfrage", icon: Wallet, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80", example: "Beispiel: Internetrechnung bezahlen..." }
  ]
};

const UI_TEXTS: Record<string, any> = {
  AR: {
    backHome: "العودة للرئيسية",
    title: "بوابة دعم العائلة في دمشق وريفها",
    subtitle: "اختر الخدمة، واكتب التفاصيل والكميات التي تريدها بحرية تامة. نحن نصل نبل عطائك بدفء واهتمام لأهلك.",
    searchPlaceholder: "ابحث عن خدمة (لحوم، بطاريات، أدوية، تبرع...)",
    currencyLabel: "العملة الافتراضية:",
    customizeBtn: "تخصيص وإضافة للطلب",
    modalLabel: "اكتب تفاصيل طلبك والكميات بدقة:",
    modalPriceLabel: "حدد مبلغ الطلب بالعملة المختارة:",
    modalNote: "سيتم تجهيز هذا الطلب خصيصاً لك بأفضل جودة وموثوقية عالية.",
    submitBtn: "إضافة إلى السلة",
    cartTitle: "سلة الطلبات",
    checkoutBtn: "إتمام الدفع",
    totalLabel: "الإجمالي"
  },
  EN: {
    backHome: "Back to Home",
    title: "Family Support Portal in Damascus",
    subtitle: "Choose a service and specify your exact quantities freely. We deliver your generosity with care.",
    searchPlaceholder: "Search service (meat, solar, medicine...)",
    currencyLabel: "Default Currency:",
    customizeBtn: "Customize Request",
    modalLabel: "Write your request details & quantities:",
    modalPriceLabel: "Set your custom budget:",
    modalNote: "This request will be prepared specifically for you with top quality.",
    submitBtn: "Add to Cart",
    cartTitle: "Your Cart",
    checkoutBtn: "Checkout Now",
    totalLabel: "Total"
  },
  TR: {
    backHome: "Ana Sayfaya Dön",
    title: "Şam'daki Aile Destek Portalı",
    subtitle: "Hizmeti seçin ve detayları özgürce yazın. Cömertliğinizi özenle ulaştırıyoruz.",
    searchPlaceholder: "Hizmet ara (et, akü, ilaç...)",
    currencyLabel: "Para Birimi:",
    customizeBtn: "Talebi Özelleştir",
    modalLabel: "Talep detaylarınızı yazın:",
    modalPriceLabel: "Özel bütçenizi belirleyin:",
    modalNote: "Bu talep sizin için en yüksek kalitede hazırlanacaktır.",
    submitBtn: "Sepete Ekle",
    cartTitle: "Sepetiniz",
    checkoutBtn: "Ödeme Yap",
    totalLabel: "Toplam"
  },
  DE: {
    backHome: "Zurück zur Startseite",
    title: "Familienunterstützungsportal",
    subtitle: "Wählen Sie den Dienst und geben Sie Ihre Wünsche ein. Wir überbringen Ihre Großzügigkeit.",
    searchPlaceholder: "Dienst suchen (Fleisch, Solar...)",
    currencyLabel: "Währung:",
    customizeBtn: "Anpassen & Hinzufügen",
    modalLabel: "Geben Sie Ihre Wünsche genau an:",
    modalPriceLabel: "Legen Sie Ihr Budget fest:",
    modalNote: "Diese Anfrage wird speziell für Sie ausgeführt.",
    submitBtn: "In den Warenkorb",
    cartTitle: "Warenkorb",
    checkoutBtn: "Zur Kasse",
    totalLabel: "Gesamt"
  }
};

export default function ExpatPortal() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = lang && UI_TEXTS[lang] ? lang : "AR";
  const isRtl = currentLang === "AR";
  const ui = UI_TEXTS[currentLang];

  const categories = CATEGORIES_DICT[currentLang] || CATEGORIES_DICT.AR;
  const servicesDB = SERVICES_DB_DICT[currentLang] || SERVICES_DB_DICT.AR;

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedService, setSelectedService] = useState<any>(null);
  
  const [cart, setCart] = useState<Array<any>>([]);
  
  const [customDetails, setCustomDetails] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  useEffect(() => {
    if (selectedService === null) {
      setCustomDetails("");
      setCustomPrice("");
    }
  }, [selectedService]);

  const filteredServices = servicesDB.filter((service) => {
    const matchesCat = activeCategory === "all" || service.category === activeCategory;
    const matchSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchSearch;
  });

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDetails.trim() || !customPrice.trim()) return;
    
    const newItem = {
      id: Date.now(),
      serviceTitle: selectedService.title,
      price: parseFloat(customPrice),
      currency: selectedCurrency,
      details: customDetails
    };

    setCart([...cart, newItem]);
    setSelectedService(null);
  };

  const getCurrencySymbol = () => {
    return selectedCurrency === 'TRY' ? '₺' : selectedCurrency === 'EUR' ? '€' : '$';
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanad_cart', JSON.stringify(cart));
      localStorage.setItem('sanad_cart_total', totalCartAmount.toString());
      localStorage.setItem('sanad_cart_currency', selectedCurrency);
    }
    router.push("/expat/checkout");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] pt-6 pb-40 relative overflow-hidden text-slate-100" dir={isRtl ? "rtl" : "ltr"}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-emerald-500/10 blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 font-medium hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md shadow-lg text-sm"
          >
            <div className="p-1.5 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 transition-colors">
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </div>
            <span>{ui.backHome}</span>
          </Link>

          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-lg">
            <span className="text-xs text-slate-400 font-bold">{ui.currencyLabel}</span>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-full border border-slate-800">
              {['USD', 'TRY', 'EUR'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCurrency === curr 
                    ? "bg-emerald-500 text-slate-950 shadow-md" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {curr === 'TRY' ? '₺ TRY' : curr === 'EUR' ? '€ EUR' : '$ USD'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Titles */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {ui.title}
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {ui.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <input 
            type="text" 
            placeholder={ui.searchPlaceholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-slate-900/90 border border-slate-700/80 text-white rounded-2xl py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm md:text-base placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xl`}
          />
          <Search className={`absolute ${isRtl ? "right-4" : "left-4"} top-4 w-5 h-5 text-slate-500 pointer-events-none`} />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-10 border-b border-slate-800/80 gap-3 scrollbar-hide justify-start lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={service.id}
                  className="bg-slate-900/50 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col h-full group backdrop-blur-md"
                >
                  <div className="relative aspect-video w-full bg-slate-800 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className={`absolute top-4 ${isRtl ? "right-4" : "left-4"} z-10`}>
                      <span className="text-[11px] font-bold px-3 py-1.5 bg-slate-950/80 backdrop-blur-md text-emerald-400 rounded-full border border-emerald-500/30">
                        {service.priceType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative p-6 pt-8 flex flex-col flex-grow bg-gradient-to-b from-slate-900 to-slate-950/80 z-10">
                    <div className={`absolute -top-8 ${isRtl ? "right-6" : "left-6"} w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-xl group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-emerald-400 transition-all duration-300 z-20`}>
                      <ServiceIcon className="w-6 h-6 shrink-0" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
                    
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="w-full py-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold text-sm hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-400 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{ui.customizeBtn}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Modal (Z-index strictly managed) */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir={isRtl ? "rtl" : "ltr"}>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              ></motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                className="relative bg-slate-900 border border-slate-700/80 rounded-[2rem] w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
              >
                <div className="relative h-32 w-full bg-slate-800 shrink-0 overflow-hidden">
                  <img src={selectedService.image} alt="Cover" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  
                  <button 
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} w-10 h-10 flex items-center justify-center rounded-full bg-slate-950/60 backdrop-blur-md text-slate-300 hover:text-white hover:bg-rose-500/80 transition-all border border-slate-700/50 z-50 cursor-pointer`}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className={`absolute bottom-4 ${isRtl ? "right-6" : "left-6"} flex items-center gap-3 z-20`}>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-xl shrink-0">
                      <selectedService.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-5 overflow-y-auto flex-grow relative z-10">
                  <div className="mb-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedService.title}</h3>
                      <p className="text-xs md:text-sm text-emerald-400 font-bold">{selectedService.priceType}</p>
                    </div>
                  </div>

                  <form onSubmit={handleAddToCart} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">{ui.modalPriceLabel}</label>
                      <div className="relative flex items-center">
                        {/* 
                          Fix: Added padding to ensure text doesn't hide behind the absolute select element in LTR 
                        */}
                        <input 
                          type="number"
                          min="1"
                          required
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                          placeholder="50"
                          dir="ltr"
                          className={`w-full bg-slate-950 border border-slate-700/80 rounded-xl py-3.5 ${isRtl ? 'pl-[110px] pr-4 text-right' : 'pr-[110px] pl-4 text-left'} text-white text-lg font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner`}
                        />
                        <div className={`absolute inset-y-1.5 ${isRtl ? 'left-1.5' : 'right-1.5'} flex items-center`}>
                          <select
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                            className="h-full bg-slate-800 border border-slate-600 hover:bg-slate-700 text-emerald-400 text-sm font-bold rounded-lg px-3 focus:outline-none focus:border-emerald-500 cursor-pointer outline-none transition-colors"
                          >
                            <option value="USD">$ USD</option>
                            <option value="TRY">₺ TRY</option>
                            <option value="EUR">€ EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">{ui.modalLabel}</label>
                      <textarea 
                        required
                        value={customDetails}
                        onChange={(e) => setCustomDetails(e.target.value)}
                        placeholder={selectedService.example}
                        className="w-full h-28 bg-slate-950 border border-slate-700/80 rounded-xl p-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none transition-all shadow-inner"
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                      <Check className="w-5 h-5 shrink-0" />
                      <span>{ui.modalNote}</span>
                    </div>

                    <button 
                      type="submit"
                      disabled={!customDetails.trim() || !customPrice.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:grayscale shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center cursor-pointer"
                    >
                      {ui.submitBtn}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Cart Bar (Fixed structural issue) */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div 
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 150, opacity: 0 }}
              className="fixed bottom-0 left-0 w-full z-50 p-4 sm:p-6 pointer-events-none"
            >
              <div className="container mx-auto max-w-4xl flex justify-center">
                <div className="w-full bg-slate-900/95 border border-emerald-500/40 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4 pointer-events-auto transform transition-transform hover:scale-[1.01]">
                  
                  <div className="flex items-center gap-3 sm:gap-4 pl-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative shrink-0">
                      <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                        {cart.length}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider">{ui.totalLabel}</span>
                      <span className="text-white text-lg sm:text-2xl font-black">
                        {totalCartAmount.toLocaleString()} <span className="text-emerald-400">{getCurrencySymbol()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Button uses explicit onClick and avoids z-index issues */}
                  <button
                    onClick={handleCheckout}
                    className="px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer group"
                  >
                    <span>{ui.checkoutBtn}</span>
                    <div className="bg-slate-950/10 p-1 rounded-full group-hover:bg-slate-950/20 transition-colors">
                      {isRtl ? <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                  </button>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}