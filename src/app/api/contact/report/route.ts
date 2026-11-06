import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ success: false, error: 'Telegram keys missing' }, { status: 500 });
    }

    const subjectMap: Record<string, string> = {
      inquiry: "استفسار عام",
      support: "دعم فني",
      partnership: "اقتراح شراكة",
      other: "أخرى"
    };
    const translatedSubject = subjectMap[subject] || subject;

    const telegramMessage = `
📩 *رسالة تواصل جديدة من سَنَد*

👤 *الاسم:* ${name}
📧 *البريد:* ${email}
🏷 *الموضوع:* ${translatedSubject}

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

    if (!telegramResponse.ok) {
      throw new Error("Failed to send to Telegram");
    }

    return NextResponse.json({ success: true, message: 'تم إرسال الرسالة بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}