import BotPage from "@/components/BotPage";
import { Users } from "lucide-react";

export default function BotSocial() {
  return (
    <BotPage
      botType="social"
      title="روبوت استراتيجيات السوشل ميديا"
      subtitle="تسويق رقمي متكامل"
      description="فريق تسويق رقمي افتراضي متكامل يضع لك خطط محتوى يومية واستراتيجيات نمو احترافية عبر إنستغرام وتويتر وتيك توك وسناب وجميع المنصات"
      icon={<Users className="w-8 h-8" />}
      gradientClass="bg-gradient-to-br from-purple-600 to-pink-600"
      placeholder="اطلب خطة محتوى أو استراتيجية للسوشل ميديا..."
      suggestedPrompts={[
        "ضع لي خطة محتوى أسبوعية لمتجر عبايات",
        "أفكار محتوى لإنستغرام في رمضان",
        "كيف أزيد متابعيني في تيك توك؟",
        "اقترح هاشتاقات مناسبة لمتجر إلكتروني",
        "ما هي أفضل أوقات النشر في السعودية؟",
      ]}
    />
  );
}
