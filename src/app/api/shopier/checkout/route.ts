import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// تهيئة الاتصال بـ Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      adId,
      productTitle,
      amount,
      currency = "USD",
      buyerName,
      buyerEmail = "customer@sanad-platform.com",
      buyerPhone,
      receiverName,
      receiverPhone,
    } = body;

    // 1. توليد الرقم السري المشفر للاستلام من المتجر (مثال: SND-4829)
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    const secretCode = `SND-${randomOtp}`;

    // 2. حفظ الطلب المبدئي في قاعدة البيانات بحالة (pending)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          ad_id: adId || null,
          buyer_name: buyerName,
          buyer_phone: buyerPhone,
          receiver_name: receiverName,
          receiver_phone: receiverPhone,
          secret_code: secretCode,
          amount: Number(amount),
          currency,
          payment_status: "pending",
          delivery_status: "waiting_pickup",
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error("Supabase Order Error:", orderError);
      return NextResponse.json({ error: "فشل إنشاء الطلب في قاعدة البيانات" }, { status: 500 });
    }

    // 3. تجهيز بيانات وتوقيع بوابة Shopier الحقيقية
    const apiKey = process.env.SHOPIER_API_KEY!;
    const apiSecret = process.env.SHOPIER_API_SECRET!;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const randomNr = Math.floor(100000 + Math.random() * 900000).toString();
    const orderId = order.id;
    const totalOrderValue = Number(amount).toFixed(2);
    // العملة في شوبر: 0 = TRY, 1 = USD, 2 = EUR
    const shopierCurrency = currency === "TRY" ? 0 : currency === "EUR" ? 2 : 1;

    // سلسلة التوقيع المطلوبة من Shopier
    const signatureData = `${randomNr}${orderId}${totalOrderValue}${shopierCurrency}`;
    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(signatureData)
      .digest("base64");

    // 4. إرجاع حقول الدفع لتوجيه المستخدم تلقائياً لبوابة Shopier
    const shopierPayload = {
      API_key: apiKey,
      website_index: 1,
      platform_order_id: orderId,
      product_name: productTitle || "طلب من منصة سَنَد",
      product_type: 1, // منتج رقمي/خدمي بدون شحن تقليدي
      buyer_name: buyerName.split(" ")[0] || buyerName,
      buyer_surname: buyerName.split(" ").slice(1).join(" ") || "Sanad",
      buyer_email: buyerEmail,
      buyer_account_age: 0,
      buyer_id_nr: orderId,
      buyer_phone: buyerPhone,
      billing_address: "Syria - Store Pickup",
      billing_city: "Damascus",
      billing_country: "Syria",
      billing_postcode: "00000",
      shipping_address: `Receiver: ${receiverName} (${receiverPhone})`,
      shipping_city: "Damascus",
      shipping_country: "Syria",
      shipping_postcode: "00000",
      total_order_value: totalOrderValue,
      currency: shopierCurrency,
      platform: 0,
      is_in_frame: 0,
      current_language: 1, // 0 = TR, 1 = EN
      modul_version: "1.0.4",
      random_nr: randomNr,
      signature: signature,
      callback: `${siteUrl}/api/shopier/callback`,
    };

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl: "https://www.shopier.com/ShowProduct/api_pay4.php",
      payload: shopierPayload,
    });
  } catch (err: any) {
    console.error("Shopier Checkout Error:", err);
    return NextResponse.json({ error: "حدث خطأ أثناء تهيئة الدفع" }, { status: 500 });
  }
}