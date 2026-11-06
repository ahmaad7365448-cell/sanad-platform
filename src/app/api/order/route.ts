import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// تهيئة اتصال Supabase من جهة الخادم
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      serviceTitle, 
      price, 
      currency, 
      details, 
      recipientName, 
      recipientPhone, 
      address, 
      notes,
      userId 
    } = body;

    // 1. حفظ الطلب في قاعدة بيانات Supabase (جدول orders)
    const { data: orderData, error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId || null,
          service_title: serviceTitle,
          price: price,
          currency: currency,
          details: details,
          recipient_name: recipientName,
          recipient_phone: recipientPhone,
          address: address,
          notes: notes,
          status: 'pending' // حالة الطلب المبدئية
        }
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      throw new Error('فشل حفظ الطلب في قاعدة البيانات');
    }

    // 2. إرسال إشعار فوري عبر بوت Telegram
   const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "9111227045:AAGbOnmWsCXxTMDBY1ACHZXuIgtqt1JUkaM";
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "1834151868";

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `
🚨 *طلب جديد من منصة سَنَد* 🚨
━━━━━━━━━━━━━━━━━
📦 *الخدمة:* ${serviceTitle}
💰 *المبلغ:* ${price} ${currency}
📝 *التفاصيل:* ${details}
━━━━━━━━━━━━━━━━━
👤 *المستلم:* ${recipientName}
📞 *الهاتف:* ${recipientPhone}
📍 *العنوان:* ${address}
📌 *ملاحظات:* ${notes || 'لا يوجد'}
      `;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });
    }

    return NextResponse.json({ success: true, message: 'تم استلام الطلب وإرسال الإشعار بنجاح' });
    
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'حدث خطأ داخلي' }, { status: 500 });
  }
}