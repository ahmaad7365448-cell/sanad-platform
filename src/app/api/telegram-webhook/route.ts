import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // التحقق من وجود رسالة واردة من المستخدم
    if (body && body.message) {
      const chatId = body.message.chat.id;
      const messageText = body.message.text || '';
      const userName = body.message.from.first_name || 'مستخدم';

      console.لتسجيل("📩 رسالة واردة للبوت من:", userName, "النص:", messageText);

      let replyText = "أهلاً بك في منصة سَنَد (SANAD Platform). كيف يمكننا مساعدتك اليوم في دعم عائلتك بدمشق؟";

      // الرد الذكي بناءً على الكلمات المفتاحية
      if (messageText.includes('/start') || messageText.includes('مرحبا')) {
        replyText = `مرحباً بك يا ${userName} في منظومة سَنَد المؤسسية. يمكنك طلب الخدمات، السلال الغذائية، أو الأدوية عبر بوابة المغتربين بكل أمان.`;
      } else if (messageText.includes('خدمات') || messageText.includes('أسعار')) {
        replyText = "نحن نقدم خدمات متكاملة تشمل: السلال الغذائية، اللحوم الطازجة، الأدوية المزمنة، منظومات الطاقة الشمسية، وتسديد الفواتير في دمشق وريفها.";
      }

      const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

      if (TELEGRAM_BOT_TOKEN) {
        // إرسال الرد التلقائي للمستخدم
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyText,
          }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}