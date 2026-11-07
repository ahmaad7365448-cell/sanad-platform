import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram Environment Variables");
      return NextResponse.json({ success: false, error: 'Env keys missing' }, { status: 500 });
    }

    const ticketId = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;

    const subjectMap: Record<string, string> = {
      inquiry: "استفسار عام",
      support: "دعم فني",
      partnership: "اقتراح شراكة",
      other: "أخرى"
    };

    // Removed Markdown to prevent parsing errors
    const telegramMessage = `
📬 رسالة تواصل جديدة (${ticketId})

👤 الاسم: ${name}
📧 البريد: ${email}
🏷️ الموضوع: ${subjectMap[subject] || subject}

📝 نص الرسالة:
${message}
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