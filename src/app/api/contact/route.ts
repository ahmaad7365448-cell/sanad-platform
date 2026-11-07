import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. حماية ضد الطلبات الفارغة
    const bodyText = await request.text();
    if (!bodyText) {
      return NextResponse.json({ success: false, error: 'Empty request body' }, { status: 400 });
    }
    const body = JSON.parse(bodyText);
    const { name, email, subject, message } = body;

    // 2. استخدام المفاتيح المحمية أولاً، مع دعم المتغيرات العامة كبديل، وتنظيفها من أي مسافات منسوخة بالخطأ (.trim)
    const botToken = (process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '').trim();
    const chatId = (process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '').trim();

    if (!botToken || !chatId) {
      console.error("CRITICAL ERROR: Telegram keys are entirely missing from Vercel environment.");
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    const ticketId = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;

    const subjectMap: Record<string, string> = {
      inquiry: "استفسار عام",
      support: "دعم فني",
      partnership: "اقتراح شراكة",
      other: "أخرى"
    };

    // 3. بناء نص الرسالة النظيف
    const telegramMessage = `📬 رسالة تواصل جديدة (${ticketId})\n\n👤 الاسم: ${name}\n📧 البريد: ${email}\n🏷️ الموضوع: ${subjectMap[subject] || subject || 'غير محدد'}\n\n📝 نص الرسالة:\n${message}`;

    // 4. إرسال الطلب لتيليجرام مع منع الكاش نهائياً (cache: no-store)
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
      cache: 'no-store' // هذه الخطوة تمنع Vercel من تجميد الطلب
    });

    if (!telegramResponse.ok) {
      const errData = await telegramResponse.text();
      console.error("Telegram API Rejected the request:", errData);
      return NextResponse.json({ success: false, error: 'Telegram rejected the message' }, { status: 502 });
    }

    return NextResponse.json({ success: true, ticketId });

  } catch (error: any) {
    console.error("FATAL SERVER ERROR:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}