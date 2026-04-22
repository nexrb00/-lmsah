import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Download, Loader2, Lock, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const promptExamples = [
  "صورة منتج عطر فاخر على خلفية سوداء أنيقة",
  "تصميم بنر إعلاني لمتجر ملابس نسائية",
  "صورة احترافية لمنتج قهوة عربية",
  "تصميم شعار لمتجر إلكتروني خليجي",
  "صورة منتج عباية فاخرة بإضاءة استوديو",
];

export default function ImageGen() {
  const { isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const generateMutation = trpc.imageGen.generate.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        setGeneratedImages(prev => [data.url!, ...prev]);
        toast.success("تم توليد الصورة بنجاح!");
      }
    },
    onError: (err) => {
      toast.error("حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى.");
    }
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("يرجى كتابة وصف للصورة أولاً");
      return;
    }
    generateMutation.mutate({ prompt });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-800 py-12 px-4">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-purple-300 text-sm font-medium mb-1">توليد الصور</div>
              <h1 className="text-3xl md:text-4xl font-black text-white">صور بالذكاء الاصطناعي</h1>
            </div>
          </div>
          <p className="text-white/70 text-base max-w-2xl">
            ولّد صور منتجاتك وتصاميمك الإعلانية بمجرد كتابة وصف نصي بسيط، جاهزة للنشر الفوري
          </p>
        </div>
      </div>

      <div className="container py-10">
        {!isAuthenticated ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">سجّل دخولك للبدء</h2>
            <p className="text-muted-foreground mb-8">
              يجب تسجيل الدخول للوصول إلى خاصية توليد الصور بالذكاء الاصطناعي
            </p>
            <a href={getLoginUrl()}>
              <Button size="lg" className="gradient-purple text-white border-0 px-8">
                <Sparkles className="w-5 h-5 ml-2" />
                سجّل دخولك مجاناً
              </Button>
            </a>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Input Section */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">صف الصورة التي تريدها</h2>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: صورة منتج عطر فاخر على خلفية بيضاء نظيفة مع إضاءة احترافية..."
                className="min-h-[100px] mb-4 text-base"
                dir="rtl"
              />

              {/* Example prompts */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">أمثلة سريعة:</p>
                <div className="flex flex-wrap gap-2">
                  {promptExamples.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(ex)}
                      className="text-xs px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-muted-foreground border border-border"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generateMutation.isPending || !prompt.trim()}
                size="lg"
                className="gradient-purple text-white border-0 font-bold w-full md:w-auto px-10"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 ml-2" />
                    ولّد الصورة
                  </>
                )}
              </Button>
            </div>

            {/* Generated Images */}
            {generatedImages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">الصور المولّدة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedImages.map((url, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden group">
                      <div className="relative">
                        <img
                          src={url}
                          alt={`صورة مولّدة ${i + 1}`}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <a href={url} download={`lamsah-image-${i + 1}.png`} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                              <Download className="w-4 h-4 ml-1" />
                              تحميل
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedImages.length === 0 && !generateMutation.isPending && (
              <div className="text-center py-16 text-muted-foreground">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>ستظهر صورك المولّدة هنا</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
