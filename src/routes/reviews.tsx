import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — 3K Below Ankara" },
      {
        name: "description",
        content:
          "What customers say about ordering Ankara fabric, ready-to-wear and thrift from 3K Below Ankara — delivery times, quality and service.",
      },
      { property: "og:title", content: "Customer Reviews — 3K Below Ankara" },
      {
        property: "og:description",
        content: "Real feedback from customers who ordered on WhatsApp.",
      },
    ],
  }),
  component: Reviews,
});

/**
 * Placeholder testimonials. Replace with the owner's real WhatsApp review
 * screenshots and quotes before launch — this is the strongest trust surface
 * on the site.
 */
const reviews = [
  {
    name: "Amaka, Lagos",
    text: "Fabric came exactly like the photo and it was here in two days. I've already sent my tailor back for more.",
  },
  {
    name: "Bisi, Ibadan",
    text: "I was nervous about paying first but they answered every message and sent proof of dispatch. Very smooth.",
  },
  {
    name: "Ngozi, Abuja",
    text: "The thrift blouse was washed and pressed. Honestly better quality than I expected for the price.",
  },
  {
    name: "Halima, Kano",
    text: "Ordered the two-piece set for a wedding. Fit perfectly and no one believed the price.",
  },
  {
    name: "Chidi, Enugu",
    text: "Six yards for under three thousand and it still felt heavy and good. Will order again.",
  },
  {
    name: "Tolu, Port Harcourt",
    text: "Delivery took three days to my area, exactly as they said on WhatsApp. No stories.",
  },
];

function Reviews() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Customer reviews
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Every order is closed on WhatsApp, so our reviews come straight from the
        chat. Here's a selection.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-3 text-sm text-foreground">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              {r.name}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <WhatsAppCta message={`Hi ${site.name}, I'd like to place an order.`} />
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Browse the shop
        </Link>
      </div>
    </div>
  );
}
