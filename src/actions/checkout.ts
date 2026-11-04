// src/actions/checkout.ts
"use server";

export async function createCheckoutSession(serviceId: string, title: string, priceUsd: number) {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
  const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;

  if (!apiKey || !storeId || !variantId) {
    throw new Error("Missing Lemon Squeezy Environment Variables");
  }

  // تحويل الدولار إلى سنتات (متطلب إجباري لبوابات الدفع)
  const priceInCents = Math.round(priceUsd * 100);

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            custom_price: priceInCents,
            product_options: {
              name: `باقة: ${title}`,
              description: "دفع آمن عبر منصة سَنَد لخدمة الداخل السوري",
            },
            checkout_options: {
              button_color: "#10B981", // لون المنصة (Emerald)
            },
            checkout_data: {
              custom: {
                // سنحتاج هذا المعرف في n8n لمعرفة أي باقة تم بيعها
                service_id: serviceId, 
              }
            }
          },
          relationships: {
            store: { data: { type: "stores", id: storeId } },
            variant: { data: { type: "variants", id: variantId } }
          }
        }
      })
    });

    const result = await response.json();
    return { url: result.data.attributes.url };
  } catch (error) {
    console.error("Checkout Error:", error);
    return { error: "فشل في توليد رابط الدفع" };
  }
}