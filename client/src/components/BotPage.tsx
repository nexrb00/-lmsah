import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIChatBox, type Message } from "./AIChatBox";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

type BotType = "seo" | "ads" | "social" | "assistant" | "products";

interface BotPageProps {
  botType: BotType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradientClass: string;
  suggestedPrompts: string[];
  placeholder: string;
}

export default function BotPage({
  botType,
  title,
  subtitle,
  description,
  icon,
  gradientClass,
  suggestedPrompts,
  placeholder,
}: BotPageProps) {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  const chatMutation = trpc.bot.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى."
      }]);
    }
  });

  const handleSendMessage = (content: string) => {
    const newMsg: Message = { role: "user", content };
    setMessages(prev => [...prev, newMsg]);

    const history = messages.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content
    }));

    chatMutation.mutate({ botType, message: content, history });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className={`${gradientClass} py-12 px-4`}>
        <div className="container">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
              {icon}
            </div>
            <div>
              <div className="text-white/70 text-sm font-medium mb-1">{subtitle}</div>
              <h1 className="text-3xl md:text-4xl font-black text-white">{title}</h1>
            </div>
          </div>
          <p className="text-white/70 text-base max-w-2xl">{description}</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container py-8">
        {!isAuthenticated ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">سجّل دخولك للبدء</h2>
            <p className="text-muted-foreground mb-8">
              يجب تسجيل الدخول للوصول إلى هذا الروبوت الذكي والاستفادة من جميع خدمات منصة لمسة
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
            <AIChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={chatMutation.isPending}
              placeholder={placeholder}
              height="calc(100vh - 320px)"
              emptyStateMessage="ابدأ محادثتك مع الروبوت الذكي"
              suggestedPrompts={suggestedPrompts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
