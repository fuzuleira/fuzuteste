import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { getProductHref, isFilled, funnelConfig } from "@/config/funnel";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-bold transition-colors duration-200 disabled:opacity-60";
export const btnPrimary = cn(btnBase, "bg-primary text-primary-foreground hover:bg-deep");
export const btnCta = cn(btnBase, "bg-cta text-cta-foreground shadow-cta hover:bg-cta-hover");
export const btnGhost = cn(
  btnBase,
  "border-2 border-border bg-card text-primary hover:border-primary",
);

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface CtaProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  label: string;
  location: string;
  full?: boolean;
}

/** Todos os CTAs de compra usam funnelConfig.productUrl. */
export function BuyCta({ label, location, full = true, className, ...rest }: CtaProps) {
  const href = getProductHref();
  const external = isFilled(funnelConfig.productUrl);
  return (
    <a
      href={href}
      onClick={() => {
        track("cta_click", { location, label });
        if (external) {
          try {
            sessionStorage.setItem("ci_cta_clicked", "1");
          } catch {
            /* ignore */
          }
        }
      }}
      className={cn(btnCta, "text-lg", full && "w-full sm:w-auto", className)}
      {...rest}
    >
      {label}
      <ArrowRight className="size-5 shrink-0" aria-hidden />
    </a>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Produto digital. Planejamento culinário geral. Não é dieta personalizada e não garante
      emagrecimento.
    </p>
  );
}
