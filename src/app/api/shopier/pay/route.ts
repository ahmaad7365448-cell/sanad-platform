import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, amount, buyerName, buyerEmail, buyerPhone, address } = body;

    // استخدام المفتاح الذي استخرجته من شوبير
    const apiKey = process.env.SHOPIER_API_KEY!;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    const randomNr = Math.floor(100000 + Math.random() * 900000).toString();
    
    // إنشاء التوقيع الرقمي بالمفتاح المتاح
    const dataToHash = apiKey + randomNr + amount + orderId;
    const signature = crypto
      .createHmac('sha256', apiKey) // استخدام الـ API Key نفسه كقفل للتوقيع
      .update(dataToHash)
      .digest('base64');

    const html = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head><meta charset="UTF-8"><title>جاري التحويل...</title></head>
      <body onload="document.getElementById('shopier_form').submit();" style="display:flex; justify-content:center; align-items:center; height:100vh; background-color:#0f172a; color:#fff; font-family: system-ui;">
        <div style="text-align: center; padding: 2rem; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.1);">
          <h2 style="font-weight: 500;">جاري تحويلك لصفحة الدفع الآمنة...</h2>
        </div>
        <form id="shopier_form" method="post" action="https://www.shopier.com/ShowProduct/api_pay.php" style="display: none;">
          <input type="hidden" name="API_key" value="${apiKey}">
          <input type="hidden" name="website_index" value="1">
          <input type="hidden" name="platform_order_id" value="${orderId}">
          <input type="hidden" name="product_name" value="خدمة منصة سند">
          <input type="hidden" name="product_type" value="0">
          <input type="hidden" name="buyer_name" value="${buyerName}">
          <input type="hidden" name="buyer_email" value="${buyerEmail}">
          <input type="hidden" name="buyer_phone" value="${buyerPhone}">
          <input type="hidden" name="billing_address" value="${address}">
          <input type="hidden" name="shipping_address" value="${address}">
          <input type="hidden" name="total_order_value" value="${amount}">
          <input type="hidden" name="currency" value="0">
          <input type="hidden" name="random_nr" value="${randomNr}">
          <input type="hidden" name="signature" value="${signature}">
          <input type="hidden" name="return_url" value="${siteUrl}/api/shopier/callback">
        </form>
      </body>
      </html>
    `;

    return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}