import { NextResponse } from 'next/server';
import crypto from 'crypto';
// import { createClient } from '@supabase/supabase-js'; // قم بتفعيل هذا عندما تريد تحديث Supabase

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // استخراج البيانات القادمة من شوبير
    const status = formData.get('status') as string;
    const orderId = formData.get('platform_order_id') as string;
    const signature = formData.get('signature') as string;
    const randomNr = formData.get('random_nr') as string;

    const apiSecret = process.env.SHOPIER_API_SECRET!;
    
    // إعادة إنشاء التوقيع للتحقق من أن الطلب قادم فعلاً من شوبير ولم يتم التلاعب به
    const expectedSignature = crypto
      .createHmac('sha256', apiSecret)
      .update(randomNr + orderId)
      .digest('base64');

    if (status === 'success' && signature === expectedSignature) {
      
      // الدفع ناجح! هنا تضع كود Supabase لتحديث حالة الطلب إلى "مدفوع"
      /*
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
      await supabase.from('orders').update({ payment_status: 'paid' }).eq('id', orderId);
      */

      // توجيه الزبون لصفحة النجاح
      return NextResponse.redirect(new URL('/payment-success', req.url));
    } else {
      // الدفع فشل أو التوقيع غير متطابق
      return NextResponse.redirect(new URL('/payment-failed', req.url));
    }
  } catch (error) {
    console.error("Shopier Callback Error:", error);
    return NextResponse.redirect(new URL('/payment-failed', req.url));
  }
}