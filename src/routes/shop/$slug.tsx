import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Truck, Clock } from "lucide-react";
import { categoryLabel, getProduct, variantLabel } from "@/data/products";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { formatNaira, orderMessage, site } from "@/lib/site";


export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Item unavailable — 3K Below Ankara" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${formatNaira(product.price)} | 3K Below Ankara`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const options: string[] = product.variants ?? [product.detail];
  const [variant, setVariant] = useState(options[0]!);
  const message = orderMessage({
    name: product.name,
    price: product.price,
    variant,
    slug: product.slug,
  });


  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            className="size-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-display text-3xl text-primary">
            {formatNaira(product.price)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{product.detail}</p>

          <p className="mt-5 text-muted-foreground">{product.description}</p>

          {options.length > 1 && (
            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-foreground">
                {variantLabel(product.category)}
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setVariant(opt)}
                    aria-pressed={variant === opt}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      variant === opt
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>
          )}


          <div className="mt-6 space-y-2 rounded-2xl border border-border bg-card p-4 text-sm">
            <p className="flex items-center gap-2 text-foreground">
              <Truck className="size-4 text-primary" /> Nationwide delivery across
              Nigeria
            </p>
            <p className="flex items-center gap-2 text-foreground">
              <Clock className="size-4 text-primary" /> Dispatched 48–72 hrs after
              payment
            </p>
          </div>

          <div className="mt-6">
            {product.inStock ? (
              <WhatsAppCta message={message} className="w-full sm:w-auto" />
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  This one is sold out.
                </p>
                <WhatsAppCta
                  variant="outline"
                  message={`Hi ${site.name}, is ${product.name} coming back in stock?`}
                >
                  Ask about restock
                </WhatsAppCta>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Payment is confirmed on WhatsApp before dispatch. See{" "}
            <Link to="/how-to-order" className="text-primary hover:underline">
              how to order
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
