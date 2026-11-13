import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const status = formData.get("status") as string;
    const orderId = formData.get("platform_order_id") as string;
    const paymentId = formData.get("payment_id") as string;
    const randomNr = formData.get("random_nr") as string;
    const signature = formData.get("signature") as string;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const apiSecret = process.env.SHOPIER_API_SECRET!;

    // 1. التحقق من صحة التوقيع الأمني القادم من Shopier لمنع التزوير
    const expectedSignature = crypto
      .createHmac("sha256", apiSecret)
      .update(`${randomNr}${orderId}`)
      .digest("base64");

    if (signature !== expectedSignature || status !== "success") {
      await supabase
        .from("orders")
        .update({ payment_status: "failed" })
        .eq("id", orderId);

      return NextResponse.redirect(`${siteUrl}/checkout/failed?orderId=${orderId}`, 303);
    }

    // 2. تحديث حالة الطلب في Supabase إلى (مدفوع) وجلب بيانات الطلب والـ OTP
    const { data: order, error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        shopier_payment_id: paymentId,
      })
      .eq("id", orderId)
      .select()
      .single();

    if (error || !order) {
      console.error("Order update error:", error);
      return NextResponse.redirect(`${siteUrl}/checkout/failed`, 303);
    }

    // 3. إرسال إشعار فوري لبوت تيليجرام الإداري بالطلب والرقم السري
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = `
✅ *عملية دفع جديدة ناجحة - منصة سَنَد*
━━━━━━━━━━━━━━━━━━
🆔 *رقم الطلب:* \`${order.id.slice(0, 8)}\`
🔐 *كود الاستلام السري (OTP):* \`${order.secret_code}\`
💰 *المبلغ المدفوع:* ${order.amount} ${order.currency}
💳 *رقم عملية Shopier:* ${paymentId}
━━━━━━━━━━━━━━━━━━
👤 *المشتري:* ${order.buyer_name} (${order.buyer_phone})
📦 *المستلم في سوريا:* ${order.receiver_name} (${order.receiver_phone})
      `;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }).catch((e) => console.error("Telegram Error:", e));
    }

    // 4. توجيه المشتري إلى صفحة نجاح الدفع وعرض الإيصال والكود السري
    return NextResponse.redirect(`${siteUrl}/checkout/success?orderId=${order.id}`, 303);
  } catch (err) {
    console.error("Callback Error:", err);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${siteUrl}/checkout/failed`, 303);
  }
}