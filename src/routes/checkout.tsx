import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { createCheckout } from "@/lib/checkout.functions";
import { formatNaira } from "@/lib/site";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — 3K Below Ankara" },
      {
        name: "description",
        content:
          "Enter your delivery details and pay by card, bank transfer or USSD. Delivery cost is agreed separately on WhatsApp.",
      },
      { property: "og:title", content: "Checkout — 3K Below Ankara" },
      {
        property: "og:description",
        content: "Pay securely for your Ankara, ready-to-wear and thrift picks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const fields = [
  { name: "name", label: "Full name", type: "text", placeholder: "Amaka Obi" },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { name: "phone", label: "WhatsApp phone", type: "tel", placeholder: "0803 222 7986" },
  { name: "city", label: "City / State", type: "text", placeholder: "Lagos" },
] as const;

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const startCheckout = useServerFn(createCheckout);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      const result = await startCheckout({
        data: {
          customer: {
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            phone: String(form.get("phone") ?? ""),
            address: String(form.get("address") ?? ""),
            city: String(form.get("city") ?? ""),
            note: String(form.get("note") ?? "") || undefined,
          },
          items: lines.map((l) => ({
            productId: l.productId,
            variant: l.variant,
            quantity: l.quantity,
          })),
          origin: window.location.origin,
        },
      });

      clear();
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
        return;
      }
      navigate({ to: "/order/success", search: { ref: result.orderNumber } });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setBusy(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">Your basket is empty</h1>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="text-sm font-medium text-foreground">
                {field.label}
              </span>
              <input
                required
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
          ))}
          <label className="block">
            <span className="text-sm font-medium text-foreground">
              Delivery address
            </span>
            <textarea
              required
              name="address"
              rows={3}
              placeholder="Street, area, landmark"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">
              Note (optional)
            </span>
            <textarea
              name="note"
              rows={2}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            Pay {formatNaira(subtotal)}
          </button>
        </form>

        <aside className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-display text-xl text-foreground">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((line) => (
              <li
                key={`${line.slug}-${line.variant ?? ""}`}
                className="flex justify-between gap-3"
              >
                <span className="text-muted-foreground">
                  {line.name}
                  {line.variant ? ` · ${line.variant}` : ""} × {line.quantity}
                </span>
                <span className="text-foreground">
                  {formatNaira(line.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="text-muted-foreground">Total</span>
            <span className="font-display text-2xl text-primary">
              {formatNaira(subtotal)}
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Delivery is not charged here. We'll agree it with you on WhatsApp once
            your payment lands.
          </p>
        </aside>
      </div>
    </div>
  );
}
