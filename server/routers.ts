import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { getDb } from "./db";
import { chatMessages, subscriptions, imageGenerations, contactRequests } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { sallaRouter } from "./routers-salla";

export const appRouter = router({
  system: systemRouter,
  salla: sallaRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // روبوتات الذكاء الاصطناعي
  bot: router({
    // إرسال رسالة لأي روبوت
    chat: protectedProcedure
      .input(z.object({
        botType: z.enum(["seo", "ads", "social", "assistant", "products"]),
        message: z.string().min(1).max(2000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string()
        })).optional().default([])
      }))
      .mutation(async ({ input, ctx }) => {
        const systemPrompts: Record<string, string> = {
          seo: `أنت خبير SEO متخصص ومستشار احترافي للمتاجر الإلكترونية العربية.
طريقة عملك:
1. ابدأ بفهم متجر العميل ونوع منتجاته
2. اسأل أسئلة مفصلة عن وضعه الحالي، منافسيه، وأهدافه
3. قدم خطة SEO مفصلة وعملية مع خطوات واضحة
4. اشرح كل خطوة بالتفصيل والأمثلة العملية
5. اعرض نتائج متوقعة ومعايير قياس النجاح
كن مستشاراً مثل خبير حقيقي له سنوات خبرة في السوق الخليجي.`,

          ads: `أنت مستشار إعلانات رقمية متخصص واحترافي.
طريقة عملك:
1. افهم منتجات العميل والجمهور المستهدف
2. اسأل عن ميزانية الإعلانات والأهداف المطلوبة
3. اقترح استراتيجية إعلانية مفصلة مع نصوص وصور مقترحة
4. اشرح كيف سيتم استهداف الجمهور بدقة
5. عرض معايير قياس النجاح (ROI, CPC, CTR)
كن مستشاراً مثل وكالة إعلانات متطورة لها سجل نجاحات مثبتة.`,

          social: `أنت مدير استراتيجية السوشل ميديا المتقدم للأسواق الخليجية.
طريقة عملك:
1. افهم عمل العميل والجمهور على كل منصة
2. اسأل عن المنصات المستخدمة والأهداف
3. ضع خطة محتوى شاملة لمدة شهر مع أفكار محددة
4. اقترح أوقات النشر المبنية على بيانات الجمهور
5. عرض معايير قياس الأداء والنمو المتوقع
كن مديراً مثل مدير ماركتينغ متقدم بسنوات خبرة في السوق الخليجي.`,

          assistant: `أنت مساعد ذكي خليجي واثق ودود تتحدث اللهجة الخليجية الأصيلة بطبيعيتها.
طريقة عملك:
1. رحب بالعميل بدفائية والطبيعية الخليجية
2. اسأل عن متجره ومنتجاته باهتمام
3. افهم التحديات التي يواجهها
4. قدم حلول عملية بساطة ووضوح
5. اشرح كل شيء بالتفصيل والأمثلة العملية
6. كن دائماً مستعداً للإجابة على استفساراتهم
استخدم عبارات خليجية طبيعية مثل "والله"، "زين"، "ما شاء الله"، "يعطيك العافية" بطريقة طبيعية لا متكلفة.`,

          products: `أنت مستشار منتجات متقدم ومتخصص في السوق الخليجي.
طريقة عملك:
1. افهم نوع متجر العميل والجمهور المستهدف
2. اسأل عن المنتجات الحالية والمبيعات
3. اقترح منتجات جديدة مع أسباب الاختيار
4. اكتب أوصاف مقنعة ومفصلة لكل منتج
5. اقترح استراتيجية تسعير منافسة
6. عرض معايير النجاح والمبيعات المتوقعة
كن مستشاراً مثل خبير منتجات له سنوات في التجارة الإلكترونية.`
        };

        const messages = [
          { role: "system" as const, content: systemPrompts[input.botType] },
          ...input.history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user" as const, content: input.message }
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices[0]?.message?.content;
        const assistantMessage = typeof rawContent === 'string' ? rawContent : "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.";

        // حفظ المحادثة في قاعدة البيانات
        const db = await getDb();
        if (db) {
          await db.insert(chatMessages).values([
            { userId: ctx.user.id, botType: input.botType, role: "user" as const, content: input.message },
            { userId: ctx.user.id, botType: input.botType, role: "assistant" as const, content: assistantMessage }
          ]);
        }

        return { message: assistantMessage };
      }),

    // جلب تاريخ المحادثات
    history: protectedProcedure
      .input(z.object({ botType: z.string() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        return await db.select()
          .from(chatMessages)
          .where(and(eq(chatMessages.userId, ctx.user.id), eq(chatMessages.botType, input.botType)))
          .orderBy(chatMessages.createdAt)
          .limit(50);
      }),
  }),

  // توليد الصور
  imageGen: router({
    generate: protectedProcedure
      .input(z.object({ prompt: z.string().min(1).max(500) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        let genId: number | null = null;

        if (db) {
          const result = await db.insert(imageGenerations).values({
            userId: ctx.user.id,
            prompt: input.prompt,
            status: "pending"
          });
          genId = Number((result as any).insertId);
        }

        try {
          const enhancedPrompt = `${input.prompt}, professional product photography, high quality, Arabic market style, clean background, commercial photography`;
          const { url } = await generateImage({ prompt: enhancedPrompt });

          if (db && genId) {
            await db.update(imageGenerations)
              .set({ imageUrl: url, status: "completed" })
              .where(eq(imageGenerations.id, genId));
          }

          return { url, success: true };
        } catch (error) {
          if (db && genId) {
            await db.update(imageGenerations)
              .set({ status: "failed" })
              .where(eq(imageGenerations.id, genId));
          }
          throw error;
        }
      }),

    history: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return await db.select()
        .from(imageGenerations)
        .where(eq(imageGenerations.userId, ctx.user.id))
        .orderBy(desc(imageGenerations.createdAt))
        .limit(20);
    }),
  }),

  // الاشتراكات
  subscription: router({
    getMySubscription: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db.select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .orderBy(desc(subscriptions.createdAt))
        .limit(1);
      return result[0] || null;
    }),

    startTrial: protectedProcedure
      .input(z.object({
        planName: z.enum(["basic", "pro", "business", "enterprise"]),
        planPrice: z.number(),
        storeName: z.string().optional(),
        serviceType: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 15);

        await db.insert(subscriptions).values({
          userId: ctx.user.id,
          planName: input.planName,
          planPrice: input.planPrice,
          status: "trial",
          trialEndsAt: trialEnd,
          storeName: input.storeName,
          serviceType: input.serviceType,
        });

        // إشعار صاحب المنصة
        await notifyOwner({
          title: "عميل جديد انضم لمنصة لمسة!",
          content: `العميل: ${ctx.user.name || ctx.user.email}\nالخطة: ${input.planName} - ${input.planPrice} ر.س\nالمتجر: ${input.storeName || "غير محدد"}\nبدأت التجربة المجانية حتى: ${trialEnd.toLocaleDateString("ar-SA")}`
        });

        return { success: true, trialEndsAt: trialEnd };
      }),

    cancel: protectedProcedure
      .input(z.object({ subscriptionId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(subscriptions)
          .set({ status: "cancelled", cancelledAt: new Date() })
          .where(and(eq(subscriptions.id, input.subscriptionId), eq(subscriptions.userId, ctx.user.id)));
        return { success: true };
      }),
  }),

  // التواصل
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        message: z.string().min(1),
        requestType: z.string().optional().default("general"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (db) {
          await db.insert(contactRequests).values({
            name: input.name,
            email: input.email,
            phone: input.phone,
            message: input.message,
            requestType: input.requestType,
          });
        }

        await notifyOwner({
          title: `طلب تواصل جديد - ${input.requestType}`,
          content: `الاسم: ${input.name}\nالبريد: ${input.email || "غير محدد"}\nالهاتف: ${input.phone || "غير محدد"}\nالرسالة: ${input.message}`
        });

        return { success: true };
      }),
  }),

  // لوحة الإدارة
  admin: router({
    getAllSubscriptions: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("غير مصرح");
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(subscriptions).orderBy(desc(subscriptions.createdAt)).limit(100);
    }),

    getAllContacts: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("غير مصرح");
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt)).limit(100);
    }),
  }),
});

export type AppRouter = typeof appRouter;
