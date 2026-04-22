import { Link } from "wouter";
import { ArrowRight, Users, MessageCircle, Crown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminPanel() {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";

  const { data: subscriptions } = trpc.admin.getAllSubscriptions.useQuery(undefined, {
    enabled: isAdmin
  });

  const { data: contacts } = trpc.admin.getAllContacts.useQuery(undefined, {
    enabled: isAdmin
  });

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">غير مصرح بالوصول</h2>
          <Link href="/">
            <Button className="gradient-purple text-white border-0">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusLabel = (s: string) => {
    if (s === 'trial') return { text: 'تجربة مجانية', color: 'bg-amber-100 text-amber-800' };
    if (s === 'active') return { text: 'نشط', color: 'bg-green-100 text-green-800' };
    if (s === 'cancelled') return { text: 'ملغي', color: 'bg-red-100 text-red-800' };
    return { text: 'منتهي', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="gradient-hero py-10 px-4">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 mb-4">
              <ArrowRight className="w-4 h-4 ml-1" />
              الرئيسية
            </Button>
          </Link>
          <h1 className="text-3xl font-black text-white">لوحة الإدارة</h1>
          <p className="text-white/70 mt-1">إدارة العملاء والاشتراكات والطلبات</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "إجمالي الاشتراكات", value: subscriptions?.length || 0, color: "text-blue-600" },
            { icon: Crown, label: "اشتراكات نشطة", value: subscriptions?.filter(s => s.status === 'active').length || 0, color: "text-green-600" },
            { icon: Clock, label: "تجارب مجانية", value: subscriptions?.filter(s => s.status === 'trial').length || 0, color: "text-amber-600" },
            { icon: MessageCircle, label: "طلبات التواصل", value: contacts?.length || 0, color: "text-purple-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-5 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Subscriptions Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">الاشتراكات</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">المعرف</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">الخطة</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">السعر</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">المتجر</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">الحالة</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((sub) => {
                  const status = statusLabel(sub.status);
                  return (
                    <tr key={sub.id} className="border-t border-border hover:bg-muted/30">
                      <td className="py-3 px-4 text-muted-foreground">#{sub.userId}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{sub.planName}</td>
                      <td className="py-3 px-4 text-foreground">{sub.planPrice.toLocaleString()} ر.س</td>
                      <td className="py-3 px-4 text-muted-foreground">{sub.storeName || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(sub.createdAt).toLocaleDateString("ar-SA")}
                      </td>
                    </tr>
                  );
                })}
                {(!subscriptions || subscriptions.length === 0) && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">لا توجد اشتراكات بعد</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Requests */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">طلبات التواصل</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">الاسم</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">البريد</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">الهاتف</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">النوع</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">الرسالة</th>
                  <th className="text-right py-3 px-4 font-bold text-muted-foreground">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((c) => (
                  <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium text-foreground">{c.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{c.email || "-"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{c.phone || "-"}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 font-bold">
                        {c.requestType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">{c.message}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString("ar-SA")}
                    </td>
                  </tr>
                ))}
                {(!contacts || contacts.length === 0) && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">لا توجد طلبات بعد</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
