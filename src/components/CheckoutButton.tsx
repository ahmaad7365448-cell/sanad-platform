'use client';

import { useState } from 'react';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // إرسال بيانات الطلب التجريبي إلى الـ API الذي أنشأناه
      const response = await fetch('/api/shopier/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: `ORD-${Date.now()}`, // توليد رقم طلب فريد
          amount: 50.00, // المبلغ بالليرة التركية
          buyerName: 'Ahmed Haritha',
          buyerEmail: 'aborame5230200@icloud.com',
          buyerPhone: '05423456316',
          address: 'Bursa, Osmangazi, Yunuseli',
        }),
      });

      if (response.ok) {
        // استلام الـ HTML ووضعه في الصفحة ليتم التوجيه التلقائي
        const html = await response.text();
        document.open();
        document.write(html);
        document.close();
      } else {
        alert('فشل تهيئة الدفع، يرجى المحاولة لاحقاً');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="relative overflow-hidden px-8 py-3 rounded-xl font-medium text-white transition-all duration-300 bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    >
      {isLoading ? 'جاري التحويل...' : 'ادفع الآن بشكل آمن'}
    </button>
  );
}