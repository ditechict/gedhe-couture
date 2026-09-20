import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  customer: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(7).max(30),
    address: z.string().min(5).max(400),
    city: z.string().min(2).max(120),
    note: z.string().max(500).optional(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        variant: z.string().max(120).nullable(),
        quantity: z.number().int().min(1).max(10),
      }),
    )
    .min(1)
    .max(30),
  origin: z.string().url(),
});

function orderNumber() {
  return `3KB-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;
}

export const createCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const secret = process.env["PAYSTACK_SECRET_KEY"];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ids = data.items.map((i) => i.productId);
    const { data: products, error } = await supabaseAdmin
      .from("products")
      .select("id, name, slug, price_ngn, image_url, stock, published")
      .in("id", ids);
    if (error) throw new Error("Could not load the items in your basket.");

    const lines = data.items.map((item) => {
      const product = products?.find((p) => p.id === item.productId);
      if (!product || !product.published) {
        throw new Error("One of the items is no longer available.");
      }
      if (product.stock < item.quantity) {
        throw new Error(`${product.name} is out of stock.`);
      }
      return {
        product_id: product.id,
        name: product.name,
        variant: item.variant,
        unit_price_ngn: product.price_ngn,
        quantity: item.quantity,
        image_url: product.image_url,
      };
    });

    const subtotal = lines.reduce(
      (sum, l) => sum + l.unit_price_ngn * l.quantity,
      0,
    );
    const reference = orderNumber();

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: reference,
        customer_name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
        address: data.customer.address,
        city: data.customer.city,
        note: data.customer.note ?? null,
        currency: "NGN",
        subtotal_ngn: subtotal,
        amount_minor: subtotal * 100,
        provider: "paystack",
        payment_reference: reference,
      })
      .select("id, order_number")
      .single();
    if (orderError || !order) throw new Error("Could not start your order.");

    await supabaseAdmin
      .from("order_items")
      .insert(lines.map((l) => ({ ...l, order_id: order.id })));

    if (!secret) {
      return {
        orderNumber: order.order_number,
        paymentUrl: null as string | null,
        pending: true,
      };
    }

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.customer.email,
        amount: subtotal * 100,
        currency: "NGN",
        reference,
        callback_url: `${data.origin}/order/success?ref=${reference}`,
        metadata: {
          order_id: order.id,
          customer_name: data.customer.name,
          phone: data.customer.phone,
        },
      }),
    });

    const json = (await res.json()) as {
      status?: boolean;
      message?: string;
      data?: { authorization_url?: string };
    };

    if (!res.ok || !json.status || !json.data?.authorization_url) {
      console.error("[paystack] initialize failed", json.message);
      throw new Error("Payment could not be started. Please try again.");
    }

    return {
      orderNumber: order.order_number,
      paymentUrl: json.data.authorization_url,
      pending: false,
    };
  });

export const getOrderSummary = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ reference: z.string().min(4).max(60) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("order_number, status, subtotal_ngn, customer_name")
      .eq("order_number", data.reference)
      .maybeSingle();
    return order ?? null;
  });
