import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "user" | "admin" = "user"): { ctx: TrpcContext; clearedCookies: { name: string; options: Record<string, unknown> }[] } {
  const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-lamsah",
    email: "test@lamsah.com",
    name: "تاجر تجريبي",
    loginMethod: "google",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// ====== اختبارات المصادقة ======
describe("auth.logout", () => {
  it("يجب أن يمسح الكوكي ويُعيد نجاح", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
    });
  });
});

describe("auth.me", () => {
  it("يُعيد المستخدم المسجل", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user?.email).toBe("test@lamsah.com");
    expect(user?.name).toBe("تاجر تجريبي");
  });

  it("يُعيد null للمستخدم غير المسجل", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });
});

// ====== اختبارات التواصل ======
describe("contact.submit", () => {
  it("يرفض الرسالة الفارغة", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({ name: "", message: "رسالة اختبار" })
    ).rejects.toThrow();
  });

  it("يتحقق من صحة البريد الإلكتروني", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({ name: "أحمد", email: "invalid-email", message: "رسالة" })
    ).rejects.toThrow();
  });
});

// ====== اختبارات الروبوتات ======
describe("bot.chat validation", () => {
  it("يرفض الرسالة الفارغة", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.bot.chat({ botType: "seo", message: "", history: [] })
    ).rejects.toThrow();
  });

  it("يرفض نوع روبوت غير صحيح", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.bot.chat({ botType: "invalid" as any, message: "اختبار", history: [] })
    ).rejects.toThrow();
  });
});

// ====== اختبارات الاشتراكات ======
describe("subscription validation", () => {
  it("يرفض خطة اشتراك غير صحيحة", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.subscription.startTrial({
        planName: "invalid" as any,
        planPrice: 300,
      })
    ).rejects.toThrow();
  });
});

// ====== اختبارات لوحة الإدارة ======
describe("admin access control", () => {
  it("يمنع المستخدم العادي من الوصول للإدارة", async () => {
    const { ctx } = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.getAllSubscriptions()).rejects.toThrow("غير مصرح");
  });
});
