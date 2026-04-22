import BotPage from "@/components/BotPage";
import { Megaphone } from "lucide-react";

export default function BotAds() {
  return (
    <BotPage
      botType="ads"
      title="روبوت الحملات الإعلانية الذكية"
      subtitle="إعلانات رقمية احترافية"
      description="أنشئ حملات إعلانية جذابة ومؤثرة عبر Google Ads وMeta Ads باستخدام أحدث تقنيات الذكاء الاصطناعي لتحقيق أعلى عائد على الاستثمار"
      icon={<Megaphone className="w-8 h-8" />}
      gradientClass="bg-gradient-to-br from-orange-600 to-red-600"
      placeholder="اطلب إنشاء حملة إعلانية أو تحسين إعلاناتك الحالية..."
      suggestedPrompts={[
        "أنشئ لي حملة إعلانية لمتجر عطور",
        "اكتب نص إعلاني جذاب لعرض تخفيضات",
        "كيف أستهدف الجمهور المناسب في إنستغرام؟",
        "ما هي أفضل أوقات نشر الإعلانات في الخليج؟",
        "ساعدني في تحسين معدل النقر على إعلاناتي",
      ]}
    />
  );
}
