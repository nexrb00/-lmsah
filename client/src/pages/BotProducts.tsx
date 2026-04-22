import BotPage from "@/components/BotPage";
import { ShoppingBag } from "lucide-react";

export default function BotProducts() {
  return (
    <BotPage
      botType="products"
      title="روبوت اقتراح المنتجات"
      subtitle="تسويق المنتجات بذكاء"
      description="روبوت ذكي يقترح منتجات مناسبة للسوق الخليجي ويكتب أوصاف تسويقية جذابة، ويساعدك في إنشاء محتوى تسويقي احترافي جاهز للنشر"
      icon={<ShoppingBag className="w-8 h-8" />}
      gradientClass="bg-gradient-to-br from-yellow-600 to-amber-600"
      placeholder="اطلب اقتراح منتجات أو وصف تسويقي..."
      suggestedPrompts={[
        "اقترح منتجات رائجة لمتجر إلكتروني",
        "اكتب وصف تسويقي جذاب لعطر رجالي",
        "ما هي المنتجات الأكثر مبيعاً في رمضان؟",
        "ساعدني في تسعير منتجاتي بشكل تنافسي",
        "أنشئ محتوى تسويقي لمنتج جديد",
      ]}
    />
  );
}
