import { useEffect, useState, type RefObject } from "react";
import { funnelConfig } from "@/config/funnel";
import { BuyCta } from "./ui";

/** CTA fixo no celular: aparece depois que a oferta entra na tela e some quando um CTA principal está visível. */
export function StickyCTA({ offerRef }: { offerRef: RefObject<HTMLElement | null> }) {
  const [seenOffer, setSeenOffer] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);

  useEffect(() => {
    const offer = offerRef.current;
    if (!offer || typeof IntersectionObserver === "undefined") return;
    const io1 = new IntersectionObserver((e) => {
      if (e.some((x) => x.isIntersecting)) setSeenOffer(true);
    });
    io1.observe(offer);
    const visible = new Set<Element>();
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((x) => (x.isIntersecting ? visible.add(x.target) : visible.delete(x.target)));
      setMainVisible(visible.size > 0);
    });
    document.querySelectorAll("[data-main-cta]").forEach((el) => io2.observe(el));
    return () => {
      io1.disconnect();
      io2.disconnect();
    };
  }, [offerRef]);

  const show = seenOffer && !mainVisible;
  return (
    <>
      <div className={show ? "h-24 md:hidden" : "hidden"} aria-hidden />
      <div
        className={`pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pt-3 backdrop-blur transition-transform duration-200 md:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
        aria-hidden={!show}
      >
        <div className="flex items-center gap-3">
          <p className="flex-1 text-sm font-bold leading-tight">
            Cardápio Inteligente — <span className="whitespace-nowrap">{funnelConfig.price}</span>
          </p>
          <BuyCta label="Quero receber" location="sticky" full={false} className="min-h-11 px-4 text-base" tabIndex={show ? 0 : -1} />
        </div>
      </div>
    </>
  );
}
