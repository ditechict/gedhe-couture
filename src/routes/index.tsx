import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Tag, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-ankara.jpg";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "3K Below Ankara — Ankara Fabric & Thrift Under ₦3,000" },
      {
        name: "description",
        content:
          "Ankara fabrics, ready-to-wear and thrift pieces, all ₦3,000 and below. Order on WhatsApp, delivered anywhere in Nigeria in 48–72 hours.",
      },
      {
        property: "og:title",
        content: "3K Below Ankara — Ankara Fabric & Thrift Under ₦3,000",
      },
      {
        property: "og:description",
        content:
          "Everything ₦3,000 and below. Ankara fabrics, ready to wear and thrift, delivered nationwide in Nigeria.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Tag, title: "One clear price cap", text: "Nothing on this page costs more than ₦3,000." },
  { icon: Truck, title: "Nationwide delivery", text: "Anywhere in Nigeria, dispatched in 48–72 hrs." },
  { icon: ShieldCheck, title: "Real customer reviews", text: "Hundreds of orders closed on WhatsApp." },
  { icon: Sparkles, title: "New drops weekly", text: "Fresh fabric bolts and thrift finds every week." },
];

function Home() {
  const featured = products.slice(0, 6);

  return (
    <>
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Nigeria · Nationwide delivery
            </p>
            <h1 className="mt-5 text-4xl leading-[1.05] font-bold text-foreground sm:text-5xl md:text-6xl">
              Everything{" "}
              <span className="text-primary">₦3,000</span> and below.
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Ankara wax prints by the yard, ready-to-wear pieces and one-of-one
              thrift finds. Pick what you like, send one message, and it ships
              within 48–72 hours.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Browse the shop
              </Link>
              <WhatsAppCta
                variant="outline"
                message={`Hi ${site.name}, I saw your website and I'd like to order.`}
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <img
              src={heroImg}
              alt="Woman wearing a tailored dress made from bold Ankara wax print fabric"
              width={1280}
              height={1600}
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Shop by category
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              search={{ category: cat.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg text-foreground">{cat.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              This week's picks
            </h2>
            <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
              See everything →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ready to order?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Send us the item name on WhatsApp. We confirm availability, share
          payment details, and dispatch within 48–72 hours.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppCta message={`Hi ${site.name}, I'd like to place an order.`} />
          <Link
            to="/how-to-order"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            How ordering works
          </Link>
        </div>
      </section>
    </>
  );
}
