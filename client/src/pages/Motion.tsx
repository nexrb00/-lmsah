import { Link } from "wouter";
import { ArrowRight, ExternalLink, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const motionTools = [
  {
    name: "CapCut",
    nameAr: "كاب كات",
    desc: "أشهر أداة تحرير فيديو للسوشل ميديا، مجانية وسهلة الاستخدام مع قوالب جاهزة",
    url: "https://www.capcut.com",
    color: "from-black to-gray-800",
    badge: "مجاني",
    logo: "✂️",
    features: ["تحرير فيديو", "قوالب ترندي", "تأثيرات AI", "ترجمة تلقائية", "موسيقى مجانية"]
  },
  {
    name: "Runway ML",
    nameAr: "رانواي",
    desc: "منصة الذكاء الاصطناعي الأقوى لتوليد وتحرير الفيديو بتقنيات Gen-2",
    url: "https://runwayml.com",
    color: "from-violet-600 to-purple-700",
    badge: "AI",
    logo: "🚀",
    features: ["توليد فيديو AI", "إزالة الخلفية", "تحريك الصور", "تأثيرات سينمائية", "Gen-2 Video"]
  },
  {
    name: "Figma",
    nameAr: "فيغما",
    desc: "أداة التصميم والنمذجة الأولى للمحترفين، مع إمكانيات موشن وتصميم تفاعلي",
    url: "https://www.figma.com",
    color: "from-pink-500 to-orange-500",
    badge: "احترافي",
    logo: "🎯",
    features: ["تصميم UI/UX", "نمذجة تفاعلية", "موشن جرافيك", "تعاون فوري", "مكتبات تصميم"]
  },
];

export default function Motion() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-12 px-4">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 backdrop-blur flex items-center justify-center">
              <Video className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <div className="text-amber-400/80 text-sm font-medium mb-1">أدوات الفيديو</div>
              <h1 className="text-3xl md:text-4xl font-black text-white">الموشن فيديو</h1>
            </div>
          </div>
          <p className="text-white/60 text-base max-w-2xl">
            أقوى أدوات إنشاء وتحرير الفيديو التسويقي، من التحرير السريع إلى توليد الفيديو بالذكاء الاصطناعي
          </p>
        </div>
      </div>

      {/* Tools */}
      <div className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">أدوات الموشن فيديو</h2>
            <p className="text-muted-foreground text-sm">اضغط على أي أداة للانتقال إليها مباشرة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {motionTools.map((tool, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all group">
              <div className={`bg-gradient-to-br ${tool.color} p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{tool.logo}</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{tool.nameAr}</h3>
                <p className="text-white/70 text-xs">{tool.name}</p>
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
                  <Button className={`w-full bg-gradient-to-r ${tool.color} text-white border-0 font-bold`}>
                    <ExternalLink className="w-4 h-4 ml-2" />
                    فتح {tool.nameAr}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-amber-900 mb-4">💡 نصائح لفيديو تسويقي ناجح</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "اجعل الفيديو قصيراً (15-30 ثانية) للسوشل ميديا",
              "أضف نصوصاً وعناوين واضحة لمن يشاهد بدون صوت",
              "استخدم موسيقى ترندي لزيادة التفاعل",
              "ابدأ بمشهد جذاب في أول 3 ثوانٍ",
              "أضف Call-to-Action واضح في نهاية الفيديو",
              "صمّم بنسبة 9:16 للريلز والتيك توك",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-amber-800 text-sm">
                <span className="text-amber-500 mt-0.5">✓</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
