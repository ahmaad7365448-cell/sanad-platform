"use client";

import React, { createContext, useContext, useState } from "react";

const translations: Record<string, any> = {
  AR: {
    brand: { name: "سَنَد", subtitle: "SANAD PLATFORM" },
    nav: { home: "الرئيسية", services: "خدماتنا", howItWorks: "آلية العمل", about: "عن سَنَد", contact: "تواصل معنا", login: "كُن سَنَداً", portal: "بوابة الطلبات" },
    footer: { 
      desc: "منظومة SaaS المؤسسية الأولى لتمكين المغتربين السوريين من دعم عائلاتهم في الداخل بأمان، سرعة، وموثوقية عالية.", 
      platform: "المنصة", 
      policies: "السياسات والدعم", 
      privacy: "سياسة الخصوصية", 
      terms: "شروط الاستخدام", 
      rateUs: "قيّم المنصة", 
      reportIssue: "إبلاغ عن مشكلة", 
      donateBtn: "ادعمنا (تبرع)",
      address: "تركيا، بورصا، عثمان غازي",
      rights: "© 2026 منصة سَنَد المؤسسية. كافة الحقوق محفوظة." 
    },
    home: {
      topBadge: "« أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ »",
      subBadge: "المنظومة الأولى لخدمة المغتربين السوريين",
      titleWhite: "منصة",
      titleColored: "سَنَد",
      subtitle: "الجسر المالي واللوجستي الفوري. اختر ما تحتاجه عائلتك في دمشق وما حولها، ادفع بدقة وأمان بالدولار، وتابع التنفيذ لحظة بلحظة.",
      ctaBtn: "بدء التسوق للعائلة",
      stat1Title: "0%", stat1Desc: "عمولات خفية",
      stat2Title: "حصرياً", stat2Desc: "دمشق وريفها",
      stat3Title: "آمنة 100%", stat3Desc: "حماية المدفوعات",
      stat4Title: "< 24 ساعة", stat4Desc: "سرعة التوصيل"
    }
  },
  EN: {
    brand: { name: "SANAD", subtitle: "PLATFORM" },
    nav: { home: "Home", services: "Services", howItWorks: "How it Works", about: "About Us", contact: "Contact Us", login: "Be a Sanad", portal: "Portal" },
    footer: { 
      desc: "The premier institutional SaaS system empowering Syrian expats to support their families back home safely and reliably.", 
      platform: "Platform", 
      policies: "Policies & Support", 
      privacy: "Privacy Policy", 
      terms: "Terms of Use", 
      rateUs: "Rate Platform", 
      reportIssue: "Report Issue", 
      donateBtn: "Support Us (Donate)",
      address: "Türkiye, Bursa, Osmangazi",
      rights: "© 2026 Sanad Institutional Platform. All rights reserved." 
    },
    home: {
      topBadge: "« The most beloved to Allah are those most beneficial to people »",
      subBadge: "The First Platform for Syrian Expatriates",
      titleWhite: "Platform",
      titleColored: "Sanad",
      subtitle: "The instant financial and logistical bridge. Choose what your family needs in Damascus, pay securely in USD, and track delivery instantly.",
      ctaBtn: "Start Shopping for Family",
      stat1Title: "0%", stat1Desc: "Hidden Fees",
      stat2Title: "Exclusive", stat2Desc: "Damascus & Suburbs",
      stat3Title: "100% Secure", stat3Desc: "Payment Protection",
      stat4Title: "< 24 Hours", stat4Desc: "Delivery Speed"
    }
  },
  TR: {
    brand: { name: "SANAD", subtitle: "PLATFORMU" },
    nav: { home: "Ana Sayfa", services: "Hizmetlerimiz", howItWorks: "Nasıl Çalışır", about: "Hakkımızda", contact: "İletişim", login: "Sanad Ol", portal: "Portal" },
    footer: { 
      desc: "Suriyeli gurbetçilerin ailelerini güvenle desteklemesini sağlayan öncü kurumsal SaaS sistemi.", 
      platform: "Platform", 
      policies: "Politikalar ve Destek", 
      privacy: "Gizlilik Politikası", 
      terms: "Kullanım Şartları", 
      rateUs: "Değerlendir", 
      reportIssue: "Sorun Bildir", 
      donateBtn: "Bağış Yap",
      address: "Türkiye, Bursa, Osmangazi",
      rights: "© 2026 Sanad Kurumsal Platformu. Tüm hakları saklıdır." 
    },
    home: {
      topBadge: "« Allah'a en sevimli olan, insanlara en faydalı olandır »",
      subBadge: "Suriyeli Gurbetçiler İçin İlk Platform",
      titleWhite: "Platformu",
      titleColored: "Sanad",
      subtitle: "Anında finansal ve lojistik köprü. Şam'daki ailenizin ihtiyaçlarını seçin, güvenle ödeyin ve teslimatı anında takip edin.",
      ctaBtn: "Aileniz İçin Alışverişe Başlayın",
      stat1Title: "%0", stat1Desc: "Gizli Ücret Yok",
      stat2Title: "Özel", stat2Desc: "Şam ve Kırsalı",
      stat3Title: "%100 Güvenli", stat3Desc: "Ödeme Koruması",
      stat4Title: "< 24 Saat", stat4Desc: "Teslimat Hızı"
    }
  },
  DE: {
    brand: { name: "SANAD", subtitle: "PLATTFORM" },
    nav: { home: "Startseite", services: "Dienstleistungen", howItWorks: "Wie es funktioniert", about: "Über uns", contact: "Kontakt", login: "Sanad Werden", portal: "Portal" },
    footer: { 
      desc: "Das führende institutionelle SaaS-System, das syrischen Auswanderern hilft, ihre Familien sicher zu unterstützen.", 
      platform: "Plattform", 
      policies: "Richtlinien & Support", 
      privacy: "Datenschutz", 
      terms: "Nutzungsbedingungen", 
      rateUs: "Bewerten", 
      reportIssue: "Problem melden", 
      donateBtn: "Spenden",
      address: "Türkei, Bursa, Osmangazi",
      rights: "© 2026 Sanad Institutionelle Plattform. Alle Rechte vorbehalten." 
    },
    home: {
      topBadge: "« Die Allah am liebsten sind die, die den Menschen am nützlichsten sind »",
      subBadge: "Die erste Plattform für syrische Auswanderer",
      titleWhite: "Plattform",
      titleColored: "Sanad",
      subtitle: "Die sofortige logistische Brücke. Wählen Sie, was Ihre Familie in Damaskus braucht, zahlen Sie sicher in USD und verfolgen Sie die Lieferung.",
      ctaBtn: "Einkauf für die Familie starten",
      stat1Title: "0%", stat1Desc: "Versteckte Gebühren",
      stat2Title: "Exklusiv", stat2Desc: "Damaskus & Umgebung",
      stat3Title: "100% Sicher", stat3Desc: "Zahlungsschutz",
      stat4Title: "< 24 Std", stat4Desc: "Liefergeschwindigkeit"
    }
  }
};

const LanguageContext = createContext({
  lang: "AR",
  setLang: (lang: string) => {},
  t: translations.AR
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState("AR");

  const setLang = (newLang: string) => {
    setLangState(newLang);
    if (newLang === 'AR') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = newLang.toLowerCase();
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] || translations.AR }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}