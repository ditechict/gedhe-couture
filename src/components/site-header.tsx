import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { WhatsAppCta } from "@/components/whatsapp-cta";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/how-to-order", label: "How to Order" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight text-foreground">
            3K Below
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            Ankara
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppCta
            className="px-4 py-2 text-xs"
            message={`Hi ${site.name}, I'd like to place an order.`}
          >
            Order now
          </WhatsAppCta>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-md p-2 text-foreground md:hidden"
        >
          {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-3 text-base font-medium text-foreground last:border-0"
              >
                {item.label}
                <X className="size-4 rotate-45 text-muted-foreground" aria-hidden />
              </Link>
            ))}
            <div className="py-3">
              <WhatsAppCta
                className="w-full"
                message={`Hi ${site.name}, I'd like to place an order.`}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
