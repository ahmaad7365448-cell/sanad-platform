import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ success: false, error: 'Telegram keys missing in env' }, { status: 500 });
    }

    const subjectMap: Record<string, string> = {
      inquiry: "استفسار عام",
      support: "دعم فني",
      partnership: "اقتراح شراكة",
      other: "أخرى"
    };

    const telegramMessage = `
📩 *رسالة تواصل جديدة من سَنَد*

👤 *الاسم:* ${name}
📧 *البريد:* ${email}
🏷 *الموضوع:* ${subjectMap[subject] || subject}

💬 *الرسالة:*
${message}
    `;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) throw new Error("Failed to reach Telegram API");

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}