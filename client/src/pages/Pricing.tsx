import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Star, Sparkles, Zap, Crown, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const plans = [
  {
    id: "basic",
    name: "الأساسية",
    nameEn: "basic",
    price: 300,
    icon: Zap,
    color: "border-blue-200 hover:border-blue-400",
    headerColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    iconColor: "text-blue-600",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
    popular: false,
    features: [
      "روبوت تحليل SEO",
      "تحليل أساسي للمتجر",
      "5 محادثات يومياً",
      "دعم عبر البريد الإلكتروني",
      "تقارير أسبوعية",
      "تجربة مجانية 15 يوم",
    ],
    notIncluded: ["روبوت الحملات الإعلانية", "المساعد الخليجي", "توليد الصور AI"]
  },
  {
    id: "pro",
    name: "الاحترافية",
    nameEn: "pro",
    price: 680,
    icon: Star,
    color: "border-purple-400 hover:border-purple-600",
    headerColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    iconColor: "text-purple-600",
    btnClass: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
    popular: true,
    features: [
      "جميع ميزات الأساسية",
      "روبوت الحملات الإعلانية",
      "روبوت استراتيجيات السوشل ميديا",
      "المساعد الخليجي 24/7",
      "20 محادثة يومياً",
      "دعم أولوية",
      "تجربة مجانية 15 يوم",
    ],
    notIncluded: ["توليد الصور AI", "أدوات الموشن فيديو المتقدمة"]
  },
  {
    id: "business",
    name: "الأعمال",
    nameEn: "business",
    price: 1500,
    icon: Crown,
    color: "border-amber-400 hover:border-amber-600",
    headerColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
    iconColor: "text-amber-600",
    btnClass: "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-900 font-bold",
    popular: false,
    features: [
      "جميع ميزات الاحترافية",
      "روبوت اقتراح المنتجات",
      "توليد الصور بالذكاء الاصطناعي",
      "50 صورة مولّدة شهرياً",
      "محادثات غير محدودة",
      "تقارير تفصيلية",
      "دعم هاتفي",
      "تجربة مجانية 15 يوم",
    ],
    notIncluded: []
  },
  {
    id: "enterprise",
    name: "المؤسسية",
    nameEn: "enterprise",
    price: 2666,
    icon: Building2,
    color: "border-yellow-500 hover:border-yellow-600",
    headerColor: "bg-gradient-to-br from-yellow-900 to-amber-900",
    iconColor: "text-yellow-400",
    btnClass: "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-bold",
    popular: false,
    dark: true,
    features: [
      "جميع الميزات بلا حدود",
      "صور مولّدة غير محدودة",
      "أدوات الموشن فيديو الكاملة",
      "خطط تسويقية مخصصة",
      "مدير حساب خاص",
      "تكامل مع Google Analytics",
      "تكامل مع Google Ads",
      "دعم VIP على مدار الساعة",
      "تجربة مجانية 15 يوم",
    ],
    notIncluded: []
  }
];

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [storeName, setStoreName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: currentSub } = trpc.subscription.getMySubscription.useQuery(undefined, {
    enabled: isAuthenticated
  });

  const startTrialMutation = trpc.subscription.startTrial.useMutation({
    onSuccess: () => {
      toast.success("تم تفعيل التجربة المجانية! مرحباً بك في لمسة 🎉");
      setDialogOpen(false);
      setStoreName("");
      setServiceType("");
    },
    onError: () => {
      toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
    }
  });

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handleStartTrial = () => {
    if (!selectedPlan) return;
    startTrialMutation.mutate({
      planName: selectedPlan.nameEn as any,
      planPrice: selectedPlan.price,
      storeName: storeName || undefined,
      serviceType: serviceType || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="gradient-hero py-16 px-4">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-amber-300 text-sm font-medium mb-6 border border-amber-400/20">
              <Star className="w-4 h-4" />
              خطط الاشتراك
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              اختر خطتك
              <span className="text-gradient-gold"> المثالية</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              جميع الخطط تشمل تجربة مجانية كاملة لمدة 15 يوم بدون أي التزام
            </p>
          </div>
        </div>
      </div>

      {/* Current Subscription Banner */}
      {currentSub && (
        <div className="container mt-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-green-800">اشتراكك الحالي: {currentSub.planName} - {currentSub.planPrice} ر.س</p>
              <p className="text-green-700 text-sm">الحالة: {currentSub.status === 'trial' ? 'تجربة مجانية' : currentSub.status === 'active' ? 'نشط' : 'منتهي'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card rounded-2xl border-2 ${plan.color} transition-all duration-300 overflow-hidden ${plan.popular ? 'shadow-2xl' : 'hover:shadow-lg'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 text-center py-2 gradient-purple text-white text-xs font-bold">
                  ⭐ الأكثر طلباً
                </div>
              )}

              <div className={`${plan.headerColor} ${plan.popular ? 'pt-10' : 'pt-6'} px-6 pb-6`}>
                <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4`}>
                  <plan.icon className={`w-6 h-6 ${plan.iconColor}`} />
                </div>
                <h3 className={`text-xl font-black mb-1 ${plan.dark ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-black ${plan.dark ? 'text-white' : 'text-foreground'}`}>
                    {plan.price.toLocaleString()}
                  </span>
                  <span className={`mb-1 text-sm ${plan.dark ? 'text-white/60' : 'text-muted-foreground'}`}>
                    ر.س / شهر
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-green-600 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  تجربة مجانية 15 يوم
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded?.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground/50 line-through">
                      <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center">✗</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full ${plan.btnClass} border-0 font-bold py-5`}
                >
                  <Rocket className="w-4 h-4 ml-2" />
                  ابدأ التجربة المجانية
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-foreground text-center mb-8">الأسئلة الشائعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "هل التجربة المجانية تشمل جميع الميزات؟", a: "نعم، التجربة المجانية لمدة 15 يوم تتيح لك الوصول الكامل لجميع ميزات الخطة التي اخترتها." },
              { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "بالطبع، يمكنك إلغاء اشتراكك في أي وقت دون أي رسوم إضافية." },
              { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل جميع بطاقات الائتمان والخصم عبر Stripe، بالإضافة لخيارات دفع محلية." },
              { q: "هل يمكنني الترقية لخطة أعلى؟", a: "نعم، يمكنك الترقية في أي وقت وستُحتسب الفارق بشكل تناسبي." },
            ].map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5">
                <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog for starting trial */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">
              ابدأ تجربتك المجانية - {selectedPlan?.name}
            </DialogTitle>
            <DialogDescription>
              أكمل بياناتك لتفعيل التجربة المجانية لمدة 15 يوم
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="storeName">اسم متجرك (اختياري)</Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="مثال: متجر النور"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="serviceType">نوع الخدمة المطلوبة (اختياري)</Label>
              <Input
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="مثال: تسويق إلكتروني، SEO، سوشل ميديا"
                className="mt-1"
              />
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                <CheckCircle className="w-4 h-4" />
                تجربة مجانية 15 يوم
              </div>
              <p className="text-green-600 text-sm">
                الخطة: {selectedPlan?.name} - {selectedPlan?.price?.toLocaleString()} ر.س / شهر
              </p>
            </div>
            <Button
              onClick={handleStartTrial}
              disabled={startTrialMutation.isPending}
              className="w-full gradient-purple text-white border-0 font-bold py-5"
            >
              {startTrialMutation.isPending ? (
                <>جاري التفعيل...</>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 ml-2" />
                  فعّل التجربة المجانية الآن
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
