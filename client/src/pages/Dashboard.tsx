import { Link } from "wouter";
import {
  Bot, TrendingUp, Megaphone, Users, ShoppingBag, Palette,
  Video, Sparkles, Star, CheckCircle, Clock, ArrowLeft,
  MessageCircle, Settings, LogOut, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const quickLinks = [
  { icon: TrendingUp, title: "روبوت SEO", href: "/bot/seo", color: "from-blue-500 to-cyan-500" },
  { icon: Megaphone, title: "الحملات الإعلانية", href: "/bot/ads", color: "from-orange-500 to-red-500" },
  { icon: Users, title: "السوشل ميديا", href: "/bot/social", color: "from-purple-500 to-pink-500" },
  { icon: Bot, title: "المساعد الخليجي", href: "/bot/assistant", color: "from-green-500 to-emerald-500" },
  { icon: ShoppingBag, title: "اقتراح المنتجات", href: "/bot/products", color: "from-yellow-500 to-amber-500" },
  { icon: Sparkles, title: "توليد الصور", href: "/image-gen", color: "from-purple-600 to-indigo-600" },
  { icon: Palette, title: "التصميم الجرافيك", href: "/design", color: "from-pink-500 to-rose-500" },
  { icon: Video, title: "الموشن فيديو", href: "/motion", color: "from-slate-600 to-slate-800" },
];

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();

  const { data: subscription } = trpc.subscription.getMySubscription.useQuery(undefined, {
    enabled: isAuthenticated
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">سجّل دخولك</h2>
          <p className="text-muted-foreground mb-8">يجب تسجيل الدخول للوصول للوحة التحكم</p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="gradient-purple text-white border-0">
              تسجيل الدخول
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="gradient-hero py-10 px-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-2xl font-black text-white">
                  {user?.name?.charAt(0) || "م"}
                </span>
              </div>
              <div>
                <p className="text-white/70 text-sm">مرحباً بك في لمسة</p>
                <h1 className="text-2xl font-black text-white">{user?.name || "المستخدم"}</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 ml-1" />
              خروج
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Subscription Status */}
        <div className="mb-8">
          {subscription ? (
            <div className={`rounded-2xl p-6 border-2 ${
              subscription.status === 'trial' ? 'bg-amber-50 border-amber-200' :
              subscription.status === 'active' ? 'bg-green-50 border-green-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Crown className={`w-8 h-8 ${subscription.status === 'active' ? 'text-green-600' : 'text-amber-600'}`} />
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      خطة {subscription.planName} - {subscription.planPrice.toLocaleString()} ر.س / شهر
                    </p>
                    <p className={`text-sm font-medium ${
                      subscription.status === 'trial' ? 'text-amber-700' :
                      subscription.status === 'active' ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {subscription.status === 'trial' ? '🎁 تجربة مجانية نشطة' :
                       subscription.status === 'active' ? '✅ اشتراك نشط' : '⚠️ الاشتراك منتهي'}
                    </p>
                  </div>
                </div>
                <Link href="/pricing">
                  <Button size="sm" className="gradient-gold text-gray-900 border-0 font-bold">
                    <Star className="w-4 h-4 ml-1" />
                    ترقية الخطة
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">لا يوجد اشتراك نشط</h3>
                  <p className="text-muted-foreground text-sm">ابدأ تجربتك المجانية لمدة 15 يوم الآن</p>
                </div>
                <Link href="/pricing">
                  <Button className="gradient-purple text-white border-0 font-bold">
                    <Sparkles className="w-4 h-4 ml-1" />
                    ابدأ مجاناً
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <h2 className="text-xl font-bold text-foreground mb-5">الوصول السريع للخدمات</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {quickLinks.map((link, i) => (
            <Link key={i} href={link.href}>
              <div className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-bold text-foreground">{link.title}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>فتح</span>
                  <ArrowLeft className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/pricing">
            <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500" />
              <div>
                <p className="font-bold text-foreground text-sm">خطط الاشتراك</p>
                <p className="text-muted-foreground text-xs">عرض وإدارة اشتراكك</p>
              </div>
            </div>
          </Link>
          <Link href="/contact">
            <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-bold text-foreground text-sm">تواصل معنا</p>
                <p className="text-muted-foreground text-xs">دعم وخدمة العملاء</p>
              </div>
            </div>
          </Link>
          <Link href="/">
            <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-bold text-foreground text-sm">الرئيسية</p>
                <p className="text-muted-foreground text-xs">العودة للصفحة الرئيسية</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
