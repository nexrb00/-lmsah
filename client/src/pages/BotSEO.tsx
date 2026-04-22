import BotPage from "@/components/BotPage";
import { TrendingUp } from "lucide-react";

export default function BotSEO() {
  return (
    <BotPage
      botType="seo"
      title="روبوت تحليل المتاجر والـ SEO"
      subtitle="تحسين محركات البحث"
      description="روبوت ذكي متخصص في تحليل متجرك وتقديم حلول SEO احترافية لتحسين ظهورك في نتائج البحث وزيادة الزيارات العضوية"
      icon={<TrendingUp className="w-8 h-8" />}
      gradientClass="bg-gradient-to-br from-blue-600 to-cyan-600"
      placeholder="اسأل عن تحسين ظهور متجرك في محركات البحث..."
      suggestedPrompts={[
        "كيف أحسّن ظهور متجري في Google؟",
        "ما هي أفضل الكلمات المفتاحية لمتجر ملابس خليجي؟",
        "حلّل موقعي وأعطني توصيات SEO",
        "كيف أكتب وصف منتج يظهر في البحث؟",
        "ما هي أخطاء SEO الشائعة في المتاجر الإلكترونية؟",
      ]}
    />
  );
}
