import { Link } from "@tanstack/react-router";
import { formatNaira } from "@/lib/site";
import { categoryLabel, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-3 py-1 text-xs font-semibold text-background">
            Sold out
          </span>
        )}
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {categoryLabel(product.category)}
        </p>
        <h3 className="font-display text-lg leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">{product.detail}</p>
        <p className="pt-1 font-display text-2xl text-primary">
          {formatNaira(product.price)}
        </p>
      </div>
    </Link>
  );
}
