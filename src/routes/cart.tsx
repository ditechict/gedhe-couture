import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Basket — 3K Below Ankara" },
      {
        name: "description",
        content:
          "Review the Ankara fabric, ready-to-wear and thrift pieces in your basket before paying by card.",
      },
      { property: "og:title", content: "Your Basket — 3K Below Ankara" },
      {
        property: "og:description",
        content: "Check your items and pay securely by card.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQuantity, remove } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Your basket</h1>

      {lines.length === 0 ? (
        <div className="mt-6">
          <p className="text-muted-foreground">Your basket is empty.</p>
          <Link
            to="/shop"
            className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {lines.map((line) => (
              <li
                key={`${line.slug}-${line.variant ?? ""}`}
                className="flex gap-4 p-4"
              >
                {line.image && (
                  <img
                    src={line.image}
                    alt={line.name}
                    className="size-20 shrink-0 rounded-xl object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-snug text-foreground">
                    {line.name}
                  </p>
                  {line.variant && (
                    <p className="text-sm text-muted-foreground">{line.variant}</p>
                  )}
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {formatNaira(line.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Reduce quantity"
                      onClick={() =>
                        setQuantity(line.slug, line.variant, line.quantity - 1)
                      }
                      className="rounded-full border border-border p-1 text-foreground hover:bg-muted"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-6 text-center text-sm text-foreground">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        setQuantity(line.slug, line.variant, line.quantity + 1)
                      }
                      className="rounded-full border border-border p-1 text-foreground hover:bg-muted"
                    >
                      <Plus className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => remove(line.slug, line.variant)}
                      className="ml-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl text-primary">
                {formatNaira(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Delivery is agreed separately on WhatsApp after payment, based on your
              location.
            </p>
            <Link
              to="/checkout"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
