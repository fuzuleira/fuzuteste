import { CalendarDays, ChefHat, ShoppingBasket, NotebookPen, Timer } from "lucide-react";
import { Section } from "./SalesSections";

/**
 * PLACEHOLDER: estas são representações ilustrativas da estrutura do material.
 * Quando as imagens reais das páginas do PDF estiverem disponíveis, substitua
 * cada `mock` por <img src=... alt=... width height loading="lazy" />.
 */
const items = [
  { icon: CalendarDays, title: "Calendário de 30 dias", desc: "Almoço e jantar de cada dia, prontos para trocar de lugar.", mock: "calendar" },
  { icon: ChefHat, title: "12 receitas-base", desc: "Ingredientes comuns e preparo direto.", mock: "lines" },
  { icon: ShoppingBasket, title: "Listas de compras", desc: "Listas-base para quatro semanas.", mock: "checks" },
  { icon: NotebookPen, title: "Planner semanal", desc: "Almoço, jantar e ingredientes em uma página.", mock: "grid" },
  { icon: Timer, title: "Guia de preparação", desc: "O que adiantar para a semana fluir.", mock: "lines" },
] as const;

function Mock({ kind }: { kind: (typeof items)[number]["mock"] }) {
  if (kind === "calendar")
    return (
      <div className="grid grid-cols-6 gap-1" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-sm bg-secondary text-[9px] font-bold leading-none text-primary">
            <span className="block p-0.5">{i + 1}</span>
          </div>
        ))}
      </div>
    );
  if (kind === "checks")
    return (
      <div className="grid gap-1.5" aria-hidden>
        {[80, 60, 72, 50, 66, 40].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm border border-primary" />
            <span className="h-1.5 rounded bg-border" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    );
  if (kind === "grid")
    return (
      <div className="grid grid-cols-3 gap-1" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`h-4 rounded-sm ${i < 3 ? "bg-primary" : "bg-secondary"}`} />
        ))}
      </div>
    );
  return (
    <div className="grid gap-1.5" aria-hidden>
      <div className="h-2 w-2/3 rounded bg-primary" />
      {[90, 75, 85, 60, 70].map((w, i) => (
        <div key={i} className="h-1.5 rounded bg-border" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

export function ProductPreview() {
  return (
    <Section name="product_preview" tone="cream">
      <h2 className="text-3xl font-bold sm:text-4xl">Por dentro do Cardápio Inteligente</h2>
      <p className="mt-3 text-muted-foreground">Prévia ilustrativa da estrutura do material digital.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, desc, mock }) => (
          <li key={title} className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="aspect-[4/5] rounded-xl border border-border bg-background p-3" role="img" aria-label={`Ilustração da página: ${title}`}>
              <Mock kind={mock} />
            </div>
            <h3 className="mt-4 flex items-center gap-2 text-lg font-bold">
              <Icon className="size-5 text-cta" aria-hidden /> {title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
