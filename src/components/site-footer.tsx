import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-foreground">3K Below Ankara</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {site.deliveryPromise}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Shop
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/shop" className="hover:text-primary">
                All products
              </Link>
            </li>
            <li>
              <Link to="/how-to-order" className="hover:text-primary">
                How to order
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-primary">
                Customer reviews
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-primary">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact &amp; FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Reach us
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MessageCircle className="size-4" /> {site.whatsappDisplay}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <Instagram className="size-4" /> {site.instagramHandle}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} 3K Below Ankara. Ankara fabrics, ready to
        wear and thrift — delivered nationwide in Nigeria.
      </div>
    </footer>
  );
}
