import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Ctx = { supabase: any; userId: string };

async function assertAdmin(context: Ctx) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const supabase = (context as Ctx).supabase;

    const [orders, products, reviews] = await Promise.all([
      supabase
        .from("orders")
        .select(
          "id, order_number, status, customer_name, email, phone, address, city, subtotal_ngn, tracking_note, paid_at, created_at, order_items(name, variant, quantity, unit_price_ngn)",
        )
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("products")
        .select("id, name, slug, price_ngn, stock, published, image_url, detail")
        .order("sort_order"),
      supabase
        .from("reviews")
        .select("id, author_name, location, rating, body, approved")
        .order("created_at", { ascending: false }),
    ]);

    return {
      orders: orders.data ?? [],
      products: products.data ?? [],
      reviews: reviews.data ?? [],
    };
  });

export const updateOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z
          .enum([
            "pending",
            "paid",
            "packed",
            "dispatched",
            "delivered",
            "cancelled",
            "refunded",
          ])
          .optional(),
        tracking_note: z.string().max(400).nullable().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { id, ...patch } = data;
    const { error } = await (context as Ctx).supabase
      .from("orders")
      .update(patch)
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        price_ngn: z.number().int().min(0).max(10_000_000).optional(),
        stock: z.number().int().min(0).max(9999).optional(),
        published: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { id, ...patch } = data;
    const { error } = await (context as Ctx).supabase
      .from("products")
      .update(patch)
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const setReviewApproved = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), approved: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await (context as Ctx).supabase
      .from("reviews")
      .update({ approved: data.approved })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
