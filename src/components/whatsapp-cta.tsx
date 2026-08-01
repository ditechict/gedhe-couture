import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";

type Props = {
  message?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
};

export function WhatsAppCta({
  message,
  children = "Order on WhatsApp",
  className,
  variant = "solid",
}: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-primary/40 text-primary hover:bg-primary/10",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {children}
    </a>
  );
}
