import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, type, priority, description, lang } = body;

    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram Environment Variables");
      return NextResponse.json({ success: false, error: 'Env keys missing' }, { status: 500 });
    }

    const ticketId = `SND-${Math.floor(1000 + Math.random() * 9000)}`;

    const typeMap: Record<string, string> = {
      tech: "مشكلة تقنية",
      payment: "مشكلة بالدفع",
      account: "مشكلة بالحساب",
      other: "أخرى"
    };

    const priorityMap: Record<string, string> = {
      normal: "🟢 عادية",
      urgent: "🔴 عاجلة جداً"
    };

    // Fix: Removed Markdown asterisks and special characters that cause Telegram API 400 errors if not properly escaped
    const telegramMessage = `
🚨 بلاغ دعم فني (${ticketId})

👤 الاسم: ${name}
📧 البريد: ${email}
⚠️ النوع: ${typeMap[type] || type}
📊 الأهمية: ${priorityMap[priority] || priority}
🌍 لغة العميل: ${lang}

📝 الوصف:
${description}
    `;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error("Telegram Error Response:", telegramData);
      throw new Error(`Telegram API Error: ${telegramData.description || 'Unknown error'}`);
    }

    return NextResponse.json({ success: true, ticketId });
  } catch (error: any) {
    console.error("Server Route Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}