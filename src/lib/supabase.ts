import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("المفاتيح الخاصة بـ Supabase غير معرفة في ملف .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);