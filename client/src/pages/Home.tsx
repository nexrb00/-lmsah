import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Bot, Sparkles, TrendingUp, Megaphone, Users, ShoppingBag,
  Palette, Video, Star, CheckCircle, ArrowLeft, MessageCircle,
  Mail, Phone, Zap, Shield, Clock, Globe
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "تحليل المتاجر والـ SEO",
    desc: "روبوت ذكي يحلل متجرك ويقدم حلول SEO احترافية لتحسين ظهورك في محركات البحث",
    color: "from-blue-500 to-cyan-500",
    href: "/bot/seo",
    badge: "SEO"
  },
  {
    icon: Megaphone,
    title: "الحملات الإعلانية الذكية",
    desc: "أنشئ حملات إعلانية جذابة ومؤثرة باستخدام أحدث تقنيات الذكاء الاصطناعي",
    color: "from-orange-500 to-red-500",
    href: "/bot/ads",
    badge: "ADS"
  },
  {
    icon: Users,
    title: "استراتيجيات السوشل ميديا",
    desc: "فريق متخصص افتراضي يضع لك خطط تسويق يومية احترافية عبر جميع المنصات",
    color: "from-purple-500 to-pink-500",
    href: "/bot/social",
    badge: "SOCIAL"
  },
  {
    icon: Bot,
    title: "المساعد الخليجي 24/7",
    desc: "مساعد ذكي يتحدث اللهجة الخليجية الأصيلة، جاهز لمساعدتك على مدار الساعة",
    color: "from-green-500 to-emerald-500",
    href: "/bot/assistant",
    badge: "24/7"
  },
  {
    icon: ShoppingBag,
    title: "اقتراح المنتجات والصور",
    desc: "روبوت يقترح منتجات ويولّد صور تصميمية احترافية جاهزة للنشر الفوري",
    color: "from-yellow-500 to-amber-500",
    href: "/bot/products",
    badge: "AI"
  },
  {
    icon: Palette,
    title: "التصميم الجرافيك",
    desc: "وصول مباشر لأقوى أدوات التصميم: Canva، Adobe Firefly، Midjourney وغيرها",
    color: "from-pink-500 to-rose-500",
    href: "/design",
    badge: "DESIGN"
  },
];

const plans = [
  {
    name: "الأساسية",
    price: "300",
    period: "شهرياً",
    color: "border-blue-200",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    features: ["روبوت SEO", "تحليل أساسي", "دعم بريد إلكتروني", "تجربة 15 يوم مجانية"],
    popular: false
  },
  {
    name: "الاحترافية",
    price: "680",
    period: "شهرياً",
    color: "border-purple-400",
    btnColor: "bg-purple-600 hover:bg-purple-700",
    features: ["جميع روبوتات SEO والإعلانات", "استراتيجيات السوشل ميديا", "المساعد الخليجي", "تجربة 15 يوم مجانية"],
    popular: true
  },
  {
    name: "الأعمال",
    price: "1500",
    period: "شهرياً",
    color: "border-amber-400",
    btnColor: "gradient-gold text-white",
    features: ["جميع الروبوتات", "توليد الصور AI", "أدوات التصميم الكاملة", "دعم أولوية", "تجربة 15 يوم مجانية"],
    popular: false
  },
  {
    name: "المؤسسية",
    price: "2666",
    period: "شهرياً",
    color: "border-yellow-500",
    btnColor: "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white",
    features: ["كل الميزات بلا حدود", "موشن فيديو", "خطط تسويقية مخصصة", "مدير حساب خاص", "تجربة 15 يوم مجانية"],
    popular: false
  }
];

const stats = [
  { value: "+500", label: "تاجر يثق بنا" },
  { value: "8", label: "روبوت ذكي" },
  { value: "24/7", label: "دعم متواصل" },
  { value: "15", label: "يوم تجربة مجانية" },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gradient-purple">لمسة</span>
            <span className="text-xs text-muted-foreground font-medium">Lamsah</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors">الخدمات</Link>
            <Link href="/design" className="text-foreground/70 hover:text-primary transition-colors">التصميم</Link>
            <Link href="/motion" className="text-foreground/70 hover:text-primary transition-colors">الموشن فيديو</Link>
            <Link href="/pricing" className="text-foreground/70 hover:text-primary transition-colors">الأسعار</Link>
            <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">تواصل معنا</Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button size="sm" className="gradient-purple text-white border-0">
                    لوحة التحكم
                  </Button>
                </Link>
              </div>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="sm" className="gradient-purple text-white border-0 shadow-md">
                  <Sparkles className="w-4 h-4 ml-1" />
                  ابدأ مجاناً
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden gradient-hero min-h-[90vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{background: 'oklch(0.78 0.18 75)'}} />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'oklch(0.52 0.20 290)'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl" style={{background: 'oklch(0.78 0.18 75)'}} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-amber-300 text-sm font-medium mb-8 border border-amber-400/20">
              <Sparkles className="w-4 h-4" />
              منصة التسويق الذكي الأولى في الخليج
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              سوّق بذكاء مع
              <span className="block text-gradient-gold mt-2">لمسة</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              منصة تسويقية متكاملة مدعومة بالذكاء الاصطناعي، تجمع بين روبوتات ذكية متخصصة وأدوات تصميم احترافية لتنمية متجرك وزيادة مبيعاتك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href={getLoginUrl()}>
                <Button size="lg" className="gradient-gold text-gray-900 font-bold text-base px-8 py-6 rounded-xl shadow-lg glow-gold hover:scale-105 transition-transform border-0">
                  <Zap className="w-5 h-5 ml-2" />
                  ابدأ تجربتك المجانية 15 يوم
                </Button>
              </a>
              <Link href="/services">
                <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/10 hover:bg-white/20 text-base px-8 py-6 rounded-xl">
                  استكشف الخدمات
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-gradient-gold mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background" id="services">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Bot className="w-4 h-4" />
              روبوتاتنا الذكية
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              خدمات تسويقية
              <span className="text-gradient-purple"> متكاملة</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              كل روبوت متخصص في مجاله، يعمل بالذكاء الاصطناعي لتقديم أفضل النتائج لمتجرك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={i} href={service.href}>
                <div className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">{service.badge}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    <span>جرّب الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Extra tools */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/motion">
              <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-amber-400/40 hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">أدوات الموشن فيديو</h3>
                    <p className="text-slate-400 text-sm">CapCut، Runway ML، Figma وأكثر</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-amber-400 mr-auto group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </div>
            </Link>
            <Link href="/image-gen">
              <div className="group bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 border border-purple-700 hover:border-purple-400/60 hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">توليد الصور بالذكاء الاصطناعي</h3>
                    <p className="text-purple-300 text-sm">أنشئ صور منتجاتك بوصف نصي فقط</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-purple-400 mr-auto group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground mb-4">
              لماذا <span className="text-gradient-gold">لمسة؟</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "سرعة فائقة", desc: "نتائج فورية مع روبوتات تعمل بأحدث نماذج الذكاء الاصطناعي", color: "text-amber-500" },
              { icon: Shield, title: "موثوقية عالية", desc: "منصة آمنة ومستقرة تضمن استمرارية خدماتك التسويقية", color: "text-green-500" },
              { icon: Clock, title: "24/7 بلا انقطاع", desc: "روبوتاتنا لا تنام، متاحة لك في أي وقت من اليوم أو الليل", color: "text-blue-500" },
              { icon: Globe, title: "تغطية شاملة", desc: "من SEO إلى السوشل ميديا، نغطي كل جوانب التسويق الرقمي", color: "text-purple-500" },
              { icon: Star, title: "جودة احترافية", desc: "محتوى تسويقي بمستوى وكالات إعلانية كبرى بسعر منافس", color: "text-amber-500" },
              { icon: MessageCircle, title: "دعم خليجي أصيل", desc: "مساعد يفهم ثقافتك ويتحدث لهجتك الخليجية بشكل طبيعي", color: "text-rose-500" },
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card rounded-2xl border border-border">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background" id="pricing">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-4 border border-amber-200">
              <Star className="w-4 h-4" />
              خطط الاشتراك
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              اختر خطتك
              <span className="text-gradient-gold"> المناسبة</span>
            </h2>
            <p className="text-muted-foreground text-lg">جميع الخطط تشمل تجربة مجانية لمدة 15 يوم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`relative bg-card rounded-2xl p-6 border-2 ${plan.color} ${plan.popular ? 'shadow-2xl scale-105' : 'hover:shadow-lg'} transition-all`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-purple text-white text-xs font-bold rounded-full">
                    الأكثر طلباً
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground mb-1">ر.س / {plan.period}</span>
                  </div>
                  <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    تجربة مجانية 15 يوم
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing">
                  <Button className={`w-full ${plan.btnColor} border-0 font-bold`}>
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            جاهز لتنمية متجرك؟
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            انضم لأكثر من 500 تاجر يستخدمون لمسة لتحقيق نتائج تسويقية مذهلة
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="gradient-gold text-gray-900 font-bold text-base px-10 py-6 rounded-xl shadow-lg glow-gold hover:scale-105 transition-transform border-0">
              <Sparkles className="w-5 h-5 ml-2" />
              ابدأ تجربتك المجانية الآن
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-gradient-gold">لمسة</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                منصة التسويق الذكي الأولى في الخليج، مدعومة بأحدث تقنيات الذكاء الاصطناعي
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-amber-400">الخدمات</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/bot/seo" className="hover:text-white transition-colors">تحليل SEO</Link></li>
                <li><Link href="/bot/ads" className="hover:text-white transition-colors">الحملات الإعلانية</Link></li>
                <li><Link href="/bot/social" className="hover:text-white transition-colors">السوشل ميديا</Link></li>
                <li><Link href="/bot/assistant" className="hover:text-white transition-colors">المساعد الخليجي</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-amber-400">الأدوات</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/design" className="hover:text-white transition-colors">التصميم الجرافيك</Link></li>
                <li><Link href="/motion" className="hover:text-white transition-colors">الموشن فيديو</Link></li>
                <li><Link href="/image-gen" className="hover:text-white transition-colors">توليد الصور</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">الأسعار</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-amber-400">تواصل معنا</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <a href="https://wa.me/966508047159" className="hover:text-white transition-colors">0508047159</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:zoooz2426@gmail.com" className="hover:text-white transition-colors">zoooz2426@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 لمسة - Lamsah. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
