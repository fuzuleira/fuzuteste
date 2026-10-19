import { forwardRef } from "react";
import { ArrowRight, Check, FileText, Lock, Trophy, Unlock } from "lucide-react";
import { funnelConfig, getProductHref, isFilled } from "@/config/funnel";
import { track } from "@/lib/analytics";
import { Disclaimer } from "./ui";

const stack = [
  "30 dias de almoço e jantar",
  "60 sugestões de momentos de refeição",
  "12 receitas-base com ingredientes comuns",
  "Listas-base de compras para quatro semanas",
  "Checklist antes do mercado",
  "Planner semanal personalizável",
  "Guia de preparação semanal",
  "Revisão da semana e balanço do mês",
];

/** Espaço do mockup. Defina funnelConfig.mockupImageUrl para usar a imagem real. */
function Mockup() {
  if (isFilled(funnelConfig.mockupImageUrl)) {
    return (
      <img
        src={funnelConfig.mockupImageUrl}
        alt={`Mockup do ${funnelConfig.productName}`}
        width={640}
        height={640}
        loading="lazy"
        className="mx-auto aspect-square w-full max-w-[420px] object-contain"
      />
    );
  }
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label={`Capa do ${funnelConfig.productName}`}
    >
      <div className="absolute inset-[12%] rotate-6 rounded-2xl bg-leaf/30" aria-hidden />
      <div className="absolute inset-[10%] -rotate-3 flex flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground shadow-card sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-highlight">
            Planner digital
          </p>
          <p className="mt-3 font-display text-2xl font-bold leading-tight sm:text-4xl">
            Cardápio Inteligente
          </p>
          <p className="mt-1 font-display text-xl font-semibold opacity-90">para 30 dias</p>
        </div>
        <div className="grid w-3/4 grid-cols-7 gap-1" aria-hidden>
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-sm ${i < 7 ? "bg-highlight" : "bg-primary-foreground/20"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const OfferCard = forwardRef<HTMLElement>(function OfferCard(_, ref) {
  const href = getProductHref();
  return (
    <section ref={ref} id="oferta" className="scroll-mt-4 bg-cream px-4 py-14 sm:px-5 sm:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">
            <Trophy className="size-4 text-highlight" aria-hidden /> Diagnóstico concluído: 7 de 7
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Seu plano completo está a <span className="text-cta">um clique</span> de sair do papel
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Você já descobriu onde o improviso pesa. Agora pare de começar almoço e jantar do zero:
            escolha os dias, confira a cozinha e leve uma lista com destino à próxima compra.
          </p>
        </div>

        <div className="mt-9 overflow-hidden rounded-[1.75rem] border-2 border-primary bg-card shadow-card lg:grid lg:grid-cols-2">
          <div className="flex items-center bg-secondary px-6 py-8 lg:py-12">
            <Mockup />
          </div>

          <div className="p-6 sm:p-10">
            <p className="flex items-center gap-2 text-sm font-bold text-primary">
              <FileText className="size-5" aria-hidden /> {funnelConfig.productName}
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {stack.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-success text-primary-foreground">
                    <Check className="size-4" aria-hidden />
                  </span>
                  <span className="font-semibold">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-end justify-between gap-3 border-t border-border pt-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Acesso completo por</p>
                {funnelConfig.showPreviousPrice && isFilled(funnelConfig.previousPrice) && (
                  <p className="text-lg text-muted-foreground line-through">
                    <span className="sr-only">De </span>
                    {funnelConfig.previousPrice}
                  </p>
                )}
                <p className="whitespace-nowrap font-display text-[2.8rem] font-bold leading-none sm:text-6xl">
                  {funnelConfig.price}
                </p>
              </div>
              <p className="text-right text-sm text-muted-foreground">
                Pagamento único
                <br />
                Material digital
              </p>
            </div>
            {isFilled(funnelConfig.deliveryMethod) && (
              <p className="mt-3 text-sm">
                <strong>Entrega:</strong> {funnelConfig.deliveryMethod}
              </p>
            )}

            {/* Barra gamificada: 3 etapas feitas, falta a última */}
            <div className="mt-6" aria-label="Seu progresso">
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>Quiz</span>
                <span>Diagnóstico</span>
                <span>Primeiro passo</span>
                <span className="text-cta">Plano completo</span>
              </div>
              <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                <span className="h-2 rounded-full bg-leaf" />
                <span className="h-2 rounded-full bg-leaf" />
                <span className="h-2 rounded-full bg-leaf" />
                <span className="h-2 animate-pulse rounded-full bg-cta" />
              </div>
            </div>

            <a
              href={href}
              data-main-cta
              onClick={() => {
                track("cta_click", { location: "offer", label: "Desbloquear meu plano completo" });
                try {
                  sessionStorage.setItem("ci_cta_clicked", "1");
                } catch {
                  /* ignore */
                }
              }}
              className="animate-cta-pulse cta-shine group mt-5 flex min-h-16 w-full items-center gap-3 rounded-2xl bg-cta px-5 py-4 text-cta-foreground transition-colors duration-200 hover:bg-cta-hover"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cta-foreground/15">
                <Lock className="size-6 group-hover:hidden" aria-hidden />
                <Unlock className="hidden size-6 group-hover:block" aria-hidden />
              </span>
              <span className="flex-1 text-left">
                <span className="block font-display text-lg font-bold leading-tight sm:text-xl">
                  Desbloquear meu plano completo
                </span>
                <span className="block text-sm opacity-90">
                  Quero planejar minha primeira semana
                </span>
              </span>
              <ArrowRight
                className="size-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </a>

            {isFilled(funnelConfig.guaranteeText) && (
              <p className="mt-4 rounded-xl bg-secondary p-3 text-sm font-semibold">
                {funnelConfig.guaranteeText}
              </p>
            )}
            <Disclaimer className="mt-4 text-center" />
          </div>
        </div>
      </div>
    </section>
  );
});
