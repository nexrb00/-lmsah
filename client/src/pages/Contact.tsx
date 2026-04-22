import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, Mail, Phone, Send, CheckCircle, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", requestType: "general" });
  const [submitted, setSubmitted] = useState(false);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    },
    onError: () => {
      toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("يرجى ملء الاسم والرسالة على الأقل");
      return;
    }
    contactMutation.mutate(form);
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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              تواصل <span className="text-gradient-gold">معنا</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              فريق لمسة جاهز لمساعدتك في أي وقت، تواصل معنا عبر أي قناة تفضلها
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">طرق التواصل</h2>

            {/* WhatsApp */}
            <a
              href="https://wa.me/966508047159"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-green-800">واتساب</p>
                <p className="text-green-700 text-sm">0508047159</p>
                <p className="text-green-600 text-xs">متاح 24/7</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:zoooz2426@gmail.com"
              className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-blue-800">البريد الإلكتروني</p>
                <p className="text-blue-700 text-sm">zoooz2426@gmail.com</p>
                <p className="text-blue-600 text-xs">رد خلال 24 ساعة</p>
              </div>
            </a>

            {/* Working Hours */}
            <div className="flex items-center gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-amber-800">ساعات العمل</p>
                <p className="text-amber-700 text-sm">السبت - الخميس</p>
                <p className="text-amber-600 text-xs">9 صباحاً - 11 مساءً</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-5 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-purple-800">الموقع</p>
                <p className="text-purple-700 text-sm">المملكة العربية السعودية</p>
                <p className="text-purple-600 text-xs">نخدم جميع دول الخليج</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-green-800 mb-3">تم إرسال رسالتك!</h3>
                <p className="text-green-700 mb-6">شكراً لتواصلك معنا. سيرد عليك فريق لمسة في أقرب وقت ممكن.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-400 text-green-700">
                  إرسال رسالة أخرى
                </Button>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">أرسل لنا رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm(p => ({...p, name: e.target.value}))}
                        placeholder="اسمك الكريم"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm(p => ({...p, phone: e.target.value}))}
                        placeholder="05xxxxxxxx"
                        className="mt-1"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(p => ({...p, email: e.target.value}))}
                      placeholder="email@example.com"
                      className="mt-1"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label htmlFor="requestType">نوع الطلب</Label>
                    <select
                      id="requestType"
                      value={form.requestType}
                      onChange={(e) => setForm(p => ({...p, requestType: e.target.value}))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="general">استفسار عام</option>
                      <option value="subscription">طلب اشتراك</option>
                      <option value="complaint">شكوى</option>
                      <option value="technical">دعم تقني</option>
                      <option value="partnership">شراكة</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm(p => ({...p, message: e.target.value}))}
                      placeholder="اكتب رسالتك هنا..."
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    size="lg"
                    className="w-full gradient-purple text-white border-0 font-bold py-5"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 ml-2" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
