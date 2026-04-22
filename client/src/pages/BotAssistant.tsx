import BotPage from "@/components/BotPage";
import { Bot } from "lucide-react";

export default function BotAssistant() {
  return (
    <BotPage
      botType="assistant"
      title="المساعد الخليجي الذكي"
      subtitle="مساعد 24/7 بلهجة خليجية"
      description="مساعدك الذكي الخليجي الأصيل، يتحدث لهجتك ويفهم ثقافتك، متاح على مدار الساعة 24/7 لمساعدتك في كل ما يخص متجرك وتسويقك"
      icon={<Bot className="w-8 h-8" />}
      gradientClass="bg-gradient-to-br from-green-600 to-emerald-600"
      placeholder="تكلّم معي بلهجتك الخليجية..."
      suggestedPrompts={[
        "وش أسوي عشان أزيد مبيعاتي؟",
        "كيف أبدأ متجر إلكتروني ناجح؟",
        "ساعدني أفهم كيف أستخدم منصة لمسة",
        "وش الخطة المناسبة لمتجري؟",
        "أبي أفكار للمحتوى التسويقي",
      ]}
    />
  );
}
