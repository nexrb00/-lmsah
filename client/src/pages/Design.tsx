import { Link } from "wouter";
import { ArrowRight, ExternalLink, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const designTools = [
  {
    name: "Canva",
    nameAr: "كانفا",
    desc: "أسهل أداة تصميم للمبتدئين والمحترفين، قوالب جاهزة بالعربية",
    url: "https://www.canva.com",
    color: "from-cyan-500 to-blue-500",
    badge: "مجاني",
    logo: "🎨",
    features: ["قوالب جاهزة", "تصميم سوشل ميديا", "شعارات", "بنرات إعلانية"]
  },
  {
    name: "Adobe Firefly",
    nameAr: "أدوبي فايرفلاي",
    desc: "توليد صور احترافية بالذكاء الاصطناعي من أدوبي",
    url: "https://firefly.adobe.com",
    color: "from-orange-500 to-red-500",
    badge: "AI",
    logo: "🔥",
    features: ["توليد صور AI", "تعديل الصور", "تأثيرات نصية", "خلفيات ذكية"]
  },
  {
    name: "Midjourney",
    nameAr: "ميدجورني",
    desc: "أقوى نموذج لتوليد الصور الفنية الاحترافية بالذكاء الاصطناعي",
    url: "https://www.midjourney.com",
    color: "from-purple-500 to-indigo-500",
    badge: "AI",
    logo: "🌟",
    features: ["صور فنية عالية الجودة", "أساليب متنوعة", "تصاميم إبداعية", "صور منتجات"]
  },
  {
    name: "DALL-E",
    nameAr: "دال-إي",
    desc: "نموذج OpenAI لتوليد الصور من النصوص بدقة عالية",
    url: "https://openai.com/dall-e-3",
    color: "from-green-500 to-teal-500",
    badge: "AI",
    logo: "🤖",
    features: ["توليد من نص", "تعديل الصور", "تنويعات", "دقة عالية"]
  },
  {
    name: "Adobe Express",
    nameAr: "أدوبي إكسبريس",
    desc: "تصميم سريع واحترافي لمحتوى السوشل ميديا والإعلانات",
    url: "https://www.adobe.com/express",
    color: "from-red-500 to-pink-500",
    badge: "مجاني",
    logo: "✨",
    features: ["قوالب سوشل ميديا", "تحرير سريع", "تصاميم إعلانية", "فيديو قصير"]
  },
];

export default function Design() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-600 to-rose-600 py-12 px-4">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white/70 text-sm font-medium mb-1">أدوات التصميم</div>
              <h1 className="text-3xl md:text-4xl font-black text-white">التصميم الجرافيك</h1>
            </div>
          </div>
          <p className="text-white/70 text-base max-w-2xl">
            أقوى أدوات التصميم الجرافيك في مكان واحد، من الأدوات التقليدية إلى أحدث تقنيات الذكاء الاصطناعي
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">أدوات التصميم المتاحة</h2>
            <p className="text-muted-foreground text-sm">اضغط على أي أداة للانتقال إليها مباشرة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designTools.map((tool, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all group">
              <div className={`bg-gradient-to-br ${tool.color} p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{tool.logo}</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{tool.nameAr}</h3>
                <p className="text-white/80 text-xs">{tool.name}</p>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{tool.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {tool.features.map((f, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-muted rounded-lg text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full bg-gradient-to-r ${tool.color} text-white border-0 font-bold group-hover:scale-[1.02] transition-transform`}>
                    <ExternalLink className="w-4 h-4 ml-2" />
                    فتح {tool.nameAr}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* AI Image Gen CTA */}
        <div className="mt-10 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 border border-purple-700 text-center">
          <div className="text-5xl mb-4">🎨</div>
          <h3 className="text-2xl font-black text-white mb-3">توليد الصور بالذكاء الاصطناعي داخل لمسة</h3>
          <p className="text-purple-300 mb-6 max-w-xl mx-auto">
            لا تحتاج لأي أداة خارجية! ولّد صور منتجاتك وتصاميمك مباشرة داخل منصة لمسة بوصف نصي بسيط
          </p>
          <Link href="/image-gen">
            <Button size="lg" className="gradient-gold text-gray-900 font-bold border-0 px-8">
              <Sparkles className="w-5 h-5 ml-2" />
              جرّب توليد الصور الآن
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
