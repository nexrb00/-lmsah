import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { sallaClient } from "./_core/sallaClient";
import {
  upsertSallaIntegration,
  getSallaIntegration,
  saveSallaProducts,
  getSallaProducts,
  getSallaOrders,
  getSallaStats,
} from "./db-salla";
import { notifyOwner } from "./_core/notification";

export const sallaRouter = router({
  /**
   * الحصول على رابط التوثيق من سلة
   */
  getAuthUrl: protectedProcedure.query(() => {
    const clientId = process.env.SALLA_CLIENT_ID || "";
    const redirectUri = `${process.env.VITE_FRONTEND_URL || "http://localhost:3000"}/auth/salla/callback`;

    const authUrl = new URL("https://accounts.salla.sa/oauth/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "store:read store:manage");

    return { authUrl: authUrl.toString() };
  }),

  /**
   * ربط حساب سلة
   */
  connectStore: protectedProcedure
    .input(z.object({ authCode: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        // الحصول على رمز الوصول
        const tokenResponse = await sallaClient.getAccessToken(input.authCode);

        // جلب بيانات المتجر
        const storeInfo = await sallaClient.getStore(tokenResponse.access_token);

        // حفظ البيانات في قاعدة البيانات
        await upsertSallaIntegration(ctx.user.id, {
          userId: ctx.user.id,
          sallaStoreId: storeInfo.id.toString(),
          sallaAccessToken: tokenResponse.access_token,
          sallaRefreshToken: tokenResponse.refresh_token || undefined,
          storeName: storeInfo.name,
          storeEmail: storeInfo.email,
          storePhone: storeInfo.phone,
          isConnected: true,
        } as any);

        // إشعار صاحب المنصة
        await notifyOwner({
          title: "متجر سلة جديد متصل بلمسة!",
          content: `المتجر: ${storeInfo.name}\nالبريد: ${storeInfo.email}\nالعميل: ${ctx.user.name || ctx.user.email}`,
        });

        // مزامنة المنتجات والطلبات
        await syncStoreData(ctx.user.id, tokenResponse.access_token);

        return { success: true, storeName: storeInfo.name };
      } catch (error) {
        console.error("[Salla] Connection failed:", error);
        throw new Error("فشل ربط متجر سلة. يرجى المحاولة مرة أخرى.");
      }
    }),

  /**
   * جلب بيانات الربط الحالية
   */
  getConnection: protectedProcedure.query(async ({ ctx }) => {
    const integration = await getSallaIntegration(ctx.user.id);
    if (!integration) return null;

    return {
      storeName: integration.storeName,
      storeEmail: integration.storeEmail,
      isConnected: integration.isConnected,
      lastSyncAt: integration.lastSyncAt,
    };
  }),

  /**
   * مزامنة بيانات المتجر يدويًا
   */
  syncData: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const integration = await getSallaIntegration(ctx.user.id);
      if (!integration || !integration.isConnected) {
        throw new Error("المتجر غير متصل");
      }

      await syncStoreData(ctx.user.id, integration.sallaAccessToken);

      return { success: true, message: "تمت المزامنة بنجاح" };
    } catch (error) {
      console.error("[Salla] Sync failed:", error);
      throw new Error("فشلت المزامنة. يرجى المحاولة مرة أخرى.");
    }
  }),

  /**
   * جلب المنتجات المخزنة
   */
  getProducts: protectedProcedure.query(async ({ ctx }) => {
    return await getSallaProducts(ctx.user.id);
  }),

  /**
   * جلب الطلبات المخزنة
   */
  getOrders: protectedProcedure.query(async ({ ctx }) => {
    return await getSallaOrders(ctx.user.id);
  }),

  /**
   * جلب إحصائيات المتجر
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    return await getSallaStats(ctx.user.id);
  }),

  /**
   * قطع الاتصال
   */
  disconnect: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await upsertSallaIntegration(ctx.user.id, {
        userId: ctx.user.id,
        sallaStoreId: "",
        sallaAccessToken: "",
        isConnected: false,
        storeName: undefined,
        storeEmail: undefined,
        storePhone: undefined,
      } as any);

      return { success: true };
    } catch (error) {
      console.error("[Salla] Disconnect failed:", error);
      throw new Error("فشل قطع الاتصال");
    }
  }),
});

/**
 * دالة مساعدة لمزامنة بيانات المتجر
 */
export async function syncStoreData(userId: number, accessToken: string) {
  try {
    // جلب المنتجات
    const products = await sallaClient.getProducts(accessToken);
    const formattedProducts = products.map((p: any) => ({
      sallaProductId: p.id,
      productName: p.name,
      productDescription: p.description || undefined,
      price: p.price,
      quantity: p.quantity || 0,
      imageUrl: p.image || undefined,
      sallaUrl: p.url || undefined,
      userId,
    }));
    await saveSallaProducts(userId, formattedProducts as any);

    // جلب الطلبات
    const orders = await sallaClient.getOrders(accessToken);
    const formattedOrders = orders.map((o: any) => ({
      sallaOrderId: o.id,
      customerName: o.customer_name,
      customerEmail: o.customer_email || undefined,
      totalAmount: o.total,
      status: o.status,
      itemsCount: o.items_count || 0,
      orderDate: o.created_at ? new Date(o.created_at) : undefined,
      userId,
    })) as any;
    
    console.log("[Salla] Sync completed successfully");
  } catch (error) {
    console.error("[Salla] Sync error:", error);
  }
}