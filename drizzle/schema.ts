import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, bigint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// جدول الاشتراكات
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  planName: varchar("planName", { length: 64 }).notNull(), // basic, pro, business, enterprise
  planPrice: int("planPrice").notNull(), // 300, 680, 1500, 2666
  status: mysqlEnum("status", ["trial", "active", "cancelled", "expired"]).default("trial").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  trialEndsAt: timestamp("trialEndsAt"),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelledAt: timestamp("cancelledAt"),
  storeName: varchar("storeName", { length: 256 }),
  serviceType: varchar("serviceType", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// جدول المحادثات مع الروبوتات
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  botType: varchar("botType", { length: 64 }).notNull(), // seo, ads, social, gulf_assistant, products
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// جدول توليد الصور
export const imageGenerations = mysqlTable("image_generations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  prompt: text("prompt").notNull(),
  imageUrl: text("imageUrl"),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ImageGeneration = typeof imageGenerations.$inferSelect;
export type InsertImageGeneration = typeof imageGenerations.$inferInsert;

// جدول طلبات التواصل
export const contactRequests = mysqlTable("contact_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  message: text("message").notNull(),
  requestType: varchar("requestType", { length: 64 }).default("general"), // general, complaint, subscription
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = typeof contactRequests.$inferInsert;

// جدول ربط سلة
export const sallaIntegrations = mysqlTable("salla_integrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  sallaStoreId: varchar("sallaStoreId", { length: 128 }).notNull().unique(),
  sallaAccessToken: text("sallaAccessToken").notNull(),
  sallaRefreshToken: text("sallaRefreshToken"),
  storeName: varchar("storeName", { length: 256 }),
  storeEmail: varchar("storeEmail", { length: 320 }),
  storePhone: varchar("storePhone", { length: 32 }),
  isConnected: boolean("isConnected").default(false).notNull(),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SallaIntegration = typeof sallaIntegrations.$inferSelect;
export type InsertSallaIntegration = typeof sallaIntegrations.$inferInsert;

// جدول منتجات سلة المخزنة
export const sallaProducts = mysqlTable("salla_products", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sallaProductId: bigint("sallaProductId", { mode: "number" }).notNull(),
  productName: varchar("productName", { length: 256 }).notNull(),
  productDescription: text("productDescription"),
  price: int("price").notNull(),
  quantity: int("quantity").default(0),
  imageUrl: text("imageUrl"),
  sallaUrl: text("sallaUrl"),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SallaProduct = typeof sallaProducts.$inferSelect;
export type InsertSallaProduct = typeof sallaProducts.$inferInsert;

// جدول طلبات سلة المخزنة
export const sallaOrders = mysqlTable("salla_orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sallaOrderId: bigint("sallaOrderId", { mode: "number" }).notNull(),
  customerName: varchar("customerName", { length: 256 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  totalAmount: int("totalAmount").notNull(),
  status: varchar("status", { length: 64 }).notNull(),
  itemsCount: int("itemsCount").default(0),
  orderDate: timestamp("orderDate"),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SallaOrder = typeof sallaOrders.$inferSelect;
export type InsertSallaOrder = typeof sallaOrders.$inferInsert;
