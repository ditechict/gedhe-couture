import { createFileRoute } from "@tanstack/react-router";
import fabricsImg from "@/assets/cat-fabrics.jpg";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About 3K Below Ankara — Affordable Ankara & Thrift in Nigeria" },
      {
        name: "description",
        content:
          "3K Below Ankara sells Ankara wax prints, ready-to-wear and thrift pieces at ₦3,000 and below, sourced between Nigeria and the UK and delivered nationwide.",
      },
      {
        property: "og:title",
        content: "About 3K Below Ankara",
      },
      {
        property: "og:description",
        content:
          "Why we cap every price at ₦3,000 — and how we keep the quality up.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Style shouldn't cost a fortune
          </h1>
          <div className="mt-5 space-y-4 text-muted-foreground">
            <p>
              3K Below Ankara started as an Instagram page with one simple
              promise: everything we sell is ₦3,000 and below. No hidden tiers,
              no "price on request", no long negotiation.
            </p>
            <p>
              We work three lines — Ankara wax prints by the yard for your
              tailor, ready-to-wear pieces made up in-house, and carefully
              selected thrift finds. Sourcing runs between Nigeria and the UK,
              which is how we keep prices low without dropping to poor quality.
            </p>
            <p>
              Orders are handled personally on WhatsApp. You talk to a real
              person, get a straight answer on availability, and your parcel is
              dispatched within 48 to 72 hours to anywhere in Nigeria.
            </p>
          </div>
          <div className="mt-7">
            <WhatsAppCta message={`Hi ${site.name}, I have a question.`}>
              Chat with us
            </WhatsAppCta>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <img
            src={fabricsImg}
            alt="Stacked folds of colourful Ankara wax print fabric"
            loading="lazy"
            width={1024}
            height={1024}
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {[
          { k: "₦3,000", v: "Hard price cap on every single item." },
          { k: "48 – 72 hrs", v: "Dispatch window after payment is confirmed." },
          { k: "Nationwide", v: "We deliver to every state in Nigeria." },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl bg-secondary/60 p-5">
            <p className="font-display text-2xl text-primary">{s.k}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
