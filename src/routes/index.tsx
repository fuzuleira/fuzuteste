import { createFileRoute } from "@tanstack/react-router";
import { Funnel, type Etapa } from "@/components/funnel/Funnel";
import { funnelConfig, isFilled } from "@/config/funnel";

const ETAPAS: Etapa[] = ["inicio", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "resultado"];
const TITLE = "Quiz de Planejamento Alimentar | Cardápio Inteligente";
const DESC =
  "Descubra o que está deixando suas refeições no improviso e receba um primeiro passo para planejar almoço, jantar e compras.";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { etapa?: Etapa } => {
    const e = String(s["etapa"] ?? "");
    return ETAPAS.includes(e as Etapa) ? { etapa: e as Etapa } : {};
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: isFilled(funnelConfig.canonicalUrl) ? [{ rel: "canonical", href: funnelConfig.canonicalUrl }] : [],
  }),
  component: Index,
});

function Index() {
  const { etapa } = Route.useSearch();
  return <Funnel etapa={etapa ?? "inicio"} />;
}
