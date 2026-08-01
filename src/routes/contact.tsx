import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQ — 3K Below Ankara" },
      {
        name: "description",
        content:
          "Reach 3K Below Ankara on WhatsApp or Instagram, and read answers on delivery fees, payment, sizing and returns.",
      },
      { property: "og:title", content: "Contact & FAQ — 3K Below Ankara" },
      {
        property: "og:description",
        content:
          "WhatsApp us for orders, or read our FAQ on delivery, payment and returns.",
      },
    ],
  }),
  component: Contact,
});

const faqs = [
  {
    q: "How do I pay?",
    a: "Payment is by bank transfer, confirmed in the WhatsApp chat before we dispatch. We share account details once your item is confirmed available.",
  },
  {
    q: "What does delivery cost?",
    a: "Delivery is quoted per location before you pay, because rates differ by state and courier. Dispatch is 48–72 hours after payment.",
  },
  {
    q: "How much fabric should I buy?",
    a: "Most gowns and two-piece styles take 6 yards. If you're not sure, message us with the style you want and we'll advise.",
  },
  {
    q: "Are thrift items in good condition?",
    a: "Every thrift piece is graded and described honestly, washed and pressed before dispatch. Each one is a single item, so it goes to the first confirmed payment.",
  },
  {
    q: "Can I return an item?",
    a: "Message us within 24 hours of delivery if something arrives different from what was described and we'll sort it out with you in the chat.",
  },
  {
    q: "Do you deliver outside Nigeria?",
    a: "Our standard service is nationwide within Nigeria. For international requests, message us and we'll quote it case by case.",
  },
];

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-3 text-muted-foreground">
        WhatsApp is the fastest way to reach us — it's where all orders are
        placed and tracked.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href={whatsappLink(`Hi ${site.name}, I have a question.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-primary/50"
        >
          <MessageCircle className="size-5 text-primary" />
          <span>
            <span className="block text-sm font-semibold text-foreground">
              WhatsApp
            </span>
            <span className="text-sm text-muted-foreground">
              {site.whatsappDisplay}
            </span>
          </span>
        </a>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-primary/50"
        >
          <Instagram className="size-5 text-primary" />
          <span>
            <span className="block text-sm font-semibold text-foreground">
              Instagram
            </span>
            <span className="text-sm text-muted-foreground">
              {site.instagramHandle}
            </span>
          </span>
        </a>
      </div>

      <h2 className="mt-12 text-2xl font-bold text-foreground">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="mt-4">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10">
        <WhatsAppCta message={`Hi ${site.name}, I'd like to place an order.`} />
      </div>
    </div>
  );
}
