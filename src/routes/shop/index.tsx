import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products, type Category } from "@/data/products";
import { ProductCard } from "@/components/product-card";

type Search = { category?: Category };

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = search.category;
    const valid = categories.some((c) => c.id === raw);
    return valid ? { category: raw as Category } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop Ankara Fabric, Ready to Wear & Thrift — 3K Below Ankara" },
      {
        name: "description",
        content:
          "Browse Ankara wax prints, ready-to-wear sets and thrift pieces, all priced ₦3,000 and below. Order any item on WhatsApp.",
      },
      { property: "og:title", content: "Shop — 3K Below Ankara" },
      {
        property: "og:description",
        content:
          "Ankara fabrics, ready to wear and thrift finds, all ₦3,000 and below.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const list = category ? products.filter((p) => p.category === category) : products;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Shop</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Every item here is ₦3,000 or less. Tap a piece to see the details, then
        order it on WhatsApp.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/shop"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            category
              ? "border-border text-muted-foreground hover:bg-muted"
              : "border-primary bg-primary text-primary-foreground"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ category: c.id }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              category === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          Nothing in this category right now — check back soon.
        </p>
      )}
    </div>
  );
}
