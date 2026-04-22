import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import {
  sallaIntegrations,
  sallaProducts,
  sallaOrders,
  InsertSallaIntegration,
  InsertSallaProduct,
  InsertSallaOrder,
} from "../drizzle/schema";

/**
 * حفظ أو تحديث بيانات ربط سلة
 */
export async function upsertSallaIntegration(
  userId: number,
  data: InsertSallaIntegration
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(sallaIntegrations)
    .where(eq(sallaIntegrations.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return await db
      .update(sallaIntegrations)
      .set({
        sallaStoreId: data.sallaStoreId,
        sallaAccessToken: data.sallaAccessToken,
        sallaRefreshToken: data.sallaRefreshToken,
        storeName: data.storeName,
        storeEmail: data.storeEmail,
        storePhone: data.storePhone,
        isConnected: data.isConnected,
        updatedAt: new Date(),
      })
      .where(eq(sallaIntegrations.userId, userId));
  } else {
    return await db.insert(sallaIntegrations).values({
      userId,
      sallaStoreId: data.sallaStoreId,
      sallaAccessToken: data.sallaAccessToken,
      sallaRefreshToken: data.sallaRefreshToken,
      storeName: data.storeName,
      storeEmail: data.storeEmail,
      storePhone: data.storePhone,
      isConnected: data.isConnected,
    });
  }
}

/**
 * جلب بيانات ربط سلة للمستخدم
 */
export async function getSallaIntegration(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(sallaIntegrations)
    .where(eq(sallaIntegrations.userId, userId))
    .limit(1);

  return result[0] || null;
}

/**
 * حفظ منتجات سلة
 */
export async function saveSallaProducts(
  userId: number,
  products: InsertSallaProduct[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // حذف المنتجات القديمة
  await db.delete(sallaProducts).where(eq(sallaProducts.userId, userId));

  // إدراج المنتجات الجديدة
  if (products.length > 0) {
    const productsWithUserId = products.map((p) => ({
      sallaProductId: p.sallaProductId,
      productName: p.productName,
      productDescription: p.productDescription,
      price: p.price,
      quantity: p.quantity,
      imageUrl: p.imageUrl,
      sallaUrl: p.sallaUrl,
      userId,
    }));
    return await db.insert(sallaProducts).values(productsWithUserId);
  }
}

/**
 * جلب منتجات سلة المخزنة
 */
export async function getSallaProducts(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(sallaProducts)
    .where(eq(sallaProducts.userId, userId));
}

/**
 * حفظ طلبات سلة
 */
export async function saveSallaOrders(
  userId: number,
  orders: InsertSallaOrder[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (orders.length > 0) {
    const ordersWithUserId = orders.map((o) => ({
      sallaOrderId: o.sallaOrderId,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      totalAmount: o.totalAmount,
      status: o.status,
      itemsCount: o.itemsCount,
      orderDate: o.orderDate,
      userId,
    }));
    return await db.insert(sallaOrders).values(ordersWithUserId);
  }
}

/**
 * جلب طلبات سلة المخزنة
 */
export async function getSallaOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(sallaOrders)
    .where(eq(sallaOrders.userId, userId))
    .orderBy(sallaOrders.createdAt);
}

/**
 * جلب إحصائيات سلة
 */
export async function getSallaStats(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const products = await db
    .select()
    .from(sallaProducts)
    .where(eq(sallaProducts.userId, userId));

  const orders = await db
    .select()
    .from(sallaOrders)
    .where(eq(sallaOrders.userId, userId));

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    productsInStock: products.filter((p) => (p.quantity ?? 0) > 0).length,
  };
}
