import { createFileRoute, Link } from "@tanstack/react-router";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site } from "@/lib/site";

export const Route = createFileRoute("/how-to-order")({
  head: () => ({
    meta: [
      { title: "How to Order — 3K Below Ankara" },
      {
        name: "description",
        content:
          "Four steps to order from 3K Below Ankara: pick your item, message us on WhatsApp, pay by transfer, and receive it in 48–72 hours anywhere in Nigeria.",
      },
      { property: "og:title", content: "How to Order — 3K Below Ankara" },
      {
        property: "og:description",
        content:
          "Pick, message, pay, receive. Ordering from 3K Below Ankara takes four steps.",
      },
    ],
  }),
  component: HowToOrder,
});

const steps = [
  {
    title: "1. Pick your item",
    text: "Browse the shop and note the item name. Every price is fixed at ₦3,000 or below — no haggling needed.",
  },
  {
    title: "2. Message us on WhatsApp",
    text: "Tap the order button on any item. WhatsApp opens with the item name already filled in. We confirm it's still available.",
  },
  {
    title: "3. Pay by transfer",
    text: "We send our account details plus the delivery fee for your location. Send proof of payment in the same chat.",
  },
  {
    title: "4. Receive in 48 – 72 hrs",
    text: "We dispatch nationwide and share your tracking or dispatch rider details as soon as the parcel leaves us.",
  },
];

function HowToOrder() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        How to order
      </h1>
      <p className="mt-3 text-muted-foreground">
        Ordering happens on WhatsApp — the same way our customers have shopped
        with us from the start. It takes four steps.
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((s) => (
          <li key={s.title} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg text-foreground">{s.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl bg-secondary/60 p-6">
        <h2 className="font-display text-xl text-foreground">Good to know</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· Thrift pieces are one-of-one — the first confirmed payment takes it.</li>
          <li>· Delivery fees depend on your state and are quoted before payment.</li>
          <li>· Fabric is sold in cut lengths; tell us how many yards you need.</li>
          <li>· Keep your chat as your receipt until the parcel arrives.</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
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
