import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Loader2, CheckCircle, AlertCircle, Store, Unlink } from "lucide-react";
import { toast } from "sonner";

export default function SallaIntegration() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  // جلب بيانات الربط
  const { data: connection, isLoading: isLoadingConnection } =
    trpc.salla.getConnection.useQuery(undefined, {
      enabled: isAuthenticated,
    });

  // جلب رابط التوثيق
  const { data: authUrl } = trpc.salla.getAuthUrl.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // جلب الإحصائيات
  const { data: stats } = trpc.salla.getStats.useQuery(undefined, {
    enabled: isAuthenticated && connection?.isConnected,
  });

  // جلب المنتجات
  const { data: products } = trpc.salla.getProducts.useQuery(undefined, {
    enabled: isAuthenticated && connection?.isConnected,
  });

  // جلب الطلبات
  const { data: orders } = trpc.salla.getOrders.useQuery(undefined, {
    enabled: isAuthenticated && connection?.isConnected,
  });

  // المزامنة
  const syncMutation = trpc.salla.syncData.useMutation({
    onSuccess: () => {
      toast.success("تمت المزامنة بنجاح!");
    },
    onError: (error) => {
      toast.error(error.message || "فشلت المزامنة");
    },
  });

  // قطع الاتصال
  const disconnectMutation = trpc.salla.disconnect.useMutation({
    onSuccess: () => {
      toast.success("تم قطع الاتصال");
    },
    onError: (error) => {
      toast.error(error.message || "فشل قطع الاتصال");
    },
  });

  // معالجة رابط التوثيق من URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && isAuthenticated) {
      setLoading(true);
      // هنا يتم استدعاء mutation الربط
      window.location.href = "/salla";
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">يرجى تسجيل الدخول</h1>
          <p className="text-muted-foreground mb-6">
            لربط متجر سلة الخاص بك، يجب تسجيل الدخول أولاً
          </p>
          <Link href="/">
            <Button className="w-full">العودة للرئيسية</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12" dir="rtl">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Store className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-black text-foreground">ربط متجر سلة</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            ربط متجرك من سلة لعرض منتجاتك وطلباتك وإحصائياتك مباشرة في لمسة
          </p>
        </div>

        {/* Connection Status */}
        {isLoadingConnection ? (
          <Card className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p>جاري التحقق من حالة الاتصال...</p>
          </Card>
        ) : connection?.isConnected ? (
          <Card className="p-8 mb-8 border-green-200 bg-green-50">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-green-900 mb-2">
                  متصل بنجاح ✓
                </h2>
                <p className="text-green-800 mb-4">
                  متجرك <strong>{connection.storeName}</strong> متصل الآن
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => syncMutation.mutate()}
                    disabled={syncMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {syncMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        جاري المزامنة...
                      </>
                    ) : (
                      "مزامنة الآن"
                    )}
                  </Button>
                  <Button
                    onClick={() => disconnectMutation.mutate()}
                    disabled={disconnectMutation.isPending}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    {disconnectMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        جاري القطع...
                      </>
                    ) : (
                      <>
                        <Unlink className="w-4 h-4 ml-2" />
                        قطع الاتصال
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8 mb-8 border-amber-200 bg-amber-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-amber-900 mb-2">
                  غير متصل
                </h2>
                <p className="text-amber-800 mb-4">
                  لم يتم ربط متجر سلة بعد. انقر على الزر أدناه لبدء عملية الربط
                </p>
                {authUrl && (
                  <a href={authUrl.authUrl}>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Store className="w-4 h-4 ml-2" />
                      ربط متجر سلة الآن
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Stats */}
        {connection?.isConnected && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-black text-purple-600 mb-2">
                {stats.totalRevenue}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الإيرادات</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">
                {stats.totalOrders}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-black text-green-600 mb-2">
                {stats.totalProducts}
              </div>
              <div className="text-sm text-muted-foreground">المنتجات</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-black text-orange-600 mb-2">
                {stats.productsInStock}
              </div>
              <div className="text-sm text-muted-foreground">المنتجات المتاحة</div>
            </Card>
          </div>
        )}

        {/* Products */}
        {connection?.isConnected && products && products.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">المنتجات ({products.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products.slice(0, 10).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      السعر: {product.price} ريال | الكمية: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {products.length > 10 && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  و {products.length - 10} منتجات أخرى...
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Orders */}
        {connection?.isConnected && orders && orders.length > 0 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">الطلبات الأخيرة ({orders.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {orders.slice(0, 10).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.itemsCount} منتج | {order.totalAmount} ريال
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
