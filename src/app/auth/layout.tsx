import type { Metadata } from "react";

export const metadata: Metadata = {
  title: "بوابة السَّنَد - تسجيل الدخول",
  description: "تسجيل الدخول لمنصة سَنَد المؤسسية",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#020617] text-white overflow-x-hidden">
      {children}
    </div>
  );
}