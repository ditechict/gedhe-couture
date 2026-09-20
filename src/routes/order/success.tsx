import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2 } from "lucide-react";
import { getOrderSummary } from "@/lib/checkout.functions";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { formatNaira, site } from "@/lib/site";

type Search = { ref?: string };

export const Route = createFileRoute("/order/success")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const ref = search["ref"];
    return typeof ref === "string" ? { ref } : {};
  },
  head: () => ({
    meta: [
      { title: "Order Confirmed — 3K Below Ankara" },
      {
        name: "description",
        content:
          "Your order is confirmed. Message us on WhatsApp to agree delivery to your location.",
      },
      { property: "og:title", content: "Order Confirmed — 3K Below Ankara" },
      {
        property: "og:description",
        content: "Thanks for shopping with 3K Below Ankara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { ref } = Route.useSearch();
  const fetchSummary = useServerFn(getOrderSummary);
  const { data } = useQuery({
    queryKey: ["order", ref],
    queryFn: () => fetchSummary({ data: { reference: ref! } }),
    enabled: Boolean(ref),
  });

  const paid = data?.status && data.status !== "pending";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto size-12 text-primary" />
      <h1 className="mt-4 text-3xl font-bold text-foreground">
        {paid ? "Payment received" : "Order received"}
      </h1>
      {ref && (
        <p className="mt-3 text-muted-foreground">
          Your order number is{" "}
          <span className="font-semibold text-foreground">{ref}</span>. Keep it handy.
        </p>
      )}
      {data && (
        <p className="mt-2 text-muted-foreground">
          Items total: {formatNaira(data.subtotal_ngn)}
        </p>
      )}
      {!paid && (
        <p className="mt-3 text-sm text-muted-foreground">
          If you've just paid, it can take a moment to show as confirmed.
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-left">
        <h2 className="font-display text-xl text-foreground">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>We message you on WhatsApp to agree the delivery cost to your area.</li>
          <li>Your parcel is dispatched within 48–72 hrs of payment.</li>
          <li>We send you the courier details so you can track it.</li>
        </ol>
        <div className="mt-5">
          <WhatsAppCta
            message={`Hi ${site.name}, I've just paid for order ${ref ?? ""}. Please confirm delivery to my area.`}
          >
            Arrange delivery on WhatsApp
          </WhatsAppCta>
        </div>
      </div>

      <Link
        to="/shop"
        className="mt-8 inline-flex text-sm text-primary hover:underline"
      >
        Continue shopping
      </Link>
    </div>
  );
}
