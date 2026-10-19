import { useEffect, useRef } from "react";
import { track, type FunnelEvent } from "@/lib/analytics";

export function useSectionView<T extends HTMLElement>(section: string, event: FunnelEvent = "sales_section_view") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track(event, { section });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [section, event]);
  return ref;
}
