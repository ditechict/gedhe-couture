import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/webhooks/paystack")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["PAYSTACK_SECRET_KEY"];
        if (!secret) return new Response("Not configured", { status: 503 });

        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature") ?? "";
        const expected = createHmac("sha512", secret).update(body).digest("hex");
        const sig = Buffer.from(signature);
        const exp = Buffer.from(expected);
        if (sig.length !== exp.length || !timingSafeEqual(sig, exp)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(body) as {
          event?: string;
          data?: { reference?: string; amount?: number };
        };
        const reference = event.data?.reference;
        if (event.event !== "charge.success" || !reference) {
          return new Response("ignored");
        }

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );

        const { data: order } = await supabaseAdmin
          .from("orders")
          .select("id, status")
          .eq("order_number", reference)
          .maybeSingle();
        if (!order || order.status !== "pending") return new Response("ok");

        await supabaseAdmin
          .from("orders")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", order.id);

        const { data: items } = await supabaseAdmin
          .from("order_items")
          .select("product_id, quantity")
          .eq("order_id", order.id);

        for (const item of items ?? []) {
          if (!item.product_id) continue;
          const { data: product } = await supabaseAdmin
            .from("products")
            .select("stock")
            .eq("id", item.product_id)
            .maybeSingle();
          if (!product) continue;
          const stock = Math.max(0, product.stock - item.quantity);
          await supabaseAdmin
            .from("products")
            .update({ stock, published: stock > 0 })
            .eq("id", item.product_id);
        }

        return new Response("ok");
      },
    },
  },
});
