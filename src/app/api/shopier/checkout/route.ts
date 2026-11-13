import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productTitle,
      amount,
      currency = "TRY",
      buyerName,
      buyerEmail,
      buyerPhone,
      receiverName,
      receiverPhone,
    } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: "مفاتيح Supabase غير مضافة في Vercel" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const orderNumber = `SND-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const pickupOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const { error: dbError } = await supabase.from("orders").insert([
      {
        order_number: orderNumber,
        product_title: productTitle,
        amount: Number(amount),
        currency,
        buyer_name: buyerName,
        buyer_email: buyerEmail || "customer@sanad-platform.com",
        buyer_phone: buyerPhone,
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        pickup_otp: pickupOtp,
        status: "pending_payment",
      },
    ]);

    if (dbError) {
      console.error("Supabase Insert Error:", dbError);
      return NextResponse.json(
        { success: false, error: `خطأ قاعدة البيانات: ${dbError.message}` },
        { status: 500 }
      );
    }

    const apiKey = process.env.SHOPIER_API_KEY;
    const apiSecret = process.env.SHOPIER_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, error: "مفاتيح Shopier غير مضافة في Vercel" },
        { status: 500 }
      );
    }

    const randomNr = Math.floor(100000 + Math.random() * 900000).toString();
    const currencyCode = currency === "USD" ? 1 : currency === "EUR" ? 2 : 0;
    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://sanad-platform-rouge.vercel.app"
    ).replace(/\/$/, "");

    const nameParts = (buyerName || "Sanad Customer").trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "Sanad";

    const dataToSign = `${randomNr}${orderNumber}${amount}${currencyCode}`;
    const signature = crypto
      .createHmac("sha256", apiSecret)
      .update(dataToSign)
      .digest("base64");

    const payload = {
      API_key: apiKey,
      website_index: 1,
      platform_order_id: orderNumber,
      product_name: productTitle,
      product_type: 1,
      buyer_name: firstName,
      buyer_surname: lastName,
      buyer_email: buyerEmail || "customer@sanad-platform.com",
      buyer_account_age: 0,
      buyer_id_nr: 0,
      buyer_phone: buyerPhone || "+905000000000",
      billing_address: "Bursa, Turkey",
      billing_city: "Bursa",
      billing_country: "Turkey",
      billing_postcode: "16000",
      shipping_address: receiverPhone || "Syria",
      shipping_city: "Damascus",
      shipping_country: "Syria",
      shipping_postcode: "00000",
      total_order_value: amount,
      currency: currencyCode,
      platform: 0,
      is_in_frame: 0,
      current_language: 0,
      modul_version: "1.0.4",
      random_nr: randomNr,
      signature,
      callback: `${siteUrl}/api/shopier/callback`,
    };

    return NextResponse.json({
      success: true,
      paymentUrl: "https://www.shopier.com/ShowProduct/api_pay4.php",
      payload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "خطأ غير متوقع في السيرفر" },
      { status: 500 }
    );
  }
}