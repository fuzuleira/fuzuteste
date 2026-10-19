import { CalendarDays, ClipboardCheck, ListChecks, RefreshCw, X, Check, Quote } from "lucide-react";
import { BuyCta, Disclaimer } from "./ui";
import { useSectionView } from "./useSectionView";
import type { ReactNode } from "react";

function Section({ id, name, children, tone = "plain" }: { id?: string; name: string; children: ReactNode; tone?: "plain" | "cream" | "deep" }) {
  const ref = useSectionView<HTMLElement>(name);
  const toneCls = tone === "cream" ? "bg-cream" : tone === "deep" ? "bg-deep text-primary-foreground" : "";
  return (
    <section ref={ref} id={id} className={`${toneCls} scroll-mt-4 px-5 py-14 sm:py-20`}>
      <div className="mx-auto max-w-[1120px]">{children}</div>
    </section>
  );
}

export function CostSection() {
  return (
    <Section id="plano" name="agitation" tone="deep">
      <div className="max-w-[760px]">
        <h2 className="text-3xl font-bold sm:text-4xl">A próxima semana vai acontecer de qualquer forma</h2>
        <p className="mt-5 text-lg opacity-90">
          Almoços e jantares serão decididos. A diferença está no momento da decisão: com antecedência e uma lista na
          mão, ou no fim do dia, quando a fome já estreitou as opções.
        </p>
        <p className="mt-4 text-lg opacity-90">
          O improviso repetido cobra em pequenas parcelas: compras sem destino, ingredientes esquecidos e outra meta
          que não encontrou lugar na rotina. A promessa de janeiro continua ali, mas cada noite resolvida às pressas
          ensina que ela pode esperar mais um pouco. E recomeçar do zero, de novo, cansa mais do que deveria.
        </p>
        <blockquote className="mt-8 flex gap-3 border-l-4 border-highlight pl-4 font-display text-xl font-semibold">
          <Quote className="size-6 shrink-0 text-highlight" aria-hidden />
          Muitas promessas de ano novo acabam na primeira noite em que a fome chega antes do plano.
        </blockquote>
      </div>
    </Section>
  );
}

const steps = [
  { icon: CalendarDays, t: "Planeje", d: "Escolha os próximos almoços e jantares." },
  { icon: ClipboardCheck, t: "Confira", d: "Veja o que já existe na despensa, geladeira e congelador." },
  { icon: ListChecks, t: "Compre", d: "Anote somente os ingredientes que faltam." },
  { icon: RefreshCw, t: "Ajuste", d: "Revise o que funcionou e ajuste a semana seguinte." },
];

export function MechanismSection() {
  return (
    <Section name="mechanism">
      <p className="font-bold text-cta">O mecanismo</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Planeje, confira, compre e ajuste</h2>
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
        Uma sessão semanal sugerida de 30 a 60 minutos para escolher até sete dias de refeições e sair com uma lista
        que tem destino.
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, t, d }, i) => (
          <li key={t} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="font-display text-3xl font-bold text-border">{i + 1}</span>
            </div>
            <h3 className="mt-4 text-xl font-bold">{t}</h3>
            <p className="mt-1 text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const rows: [string, string][] = [
  ["Decidir perto da hora", "Escolher antes dos dias corridos"],
  ["Comprar por lembrança", "Conferir a casa e listar o que falta"],
  ["Tratar mudança como fracasso", "Mover, trocar e continuar"],
  ["Procurar ideias todos os dias", "Consultar opções já reunidas"],
];

export function ComparisonSection() {
  return (
    <Section name="comparison">
      <h2 className="text-3xl font-bold sm:text-4xl">Duas formas de viver a mesma semana</h2>
      <p className="mt-3 text-muted-foreground">Como o material foi pensado para ser usado:</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted p-6">
          <h3 className="text-xl font-bold text-muted-foreground">Semana no improviso</h3>
          <ul className="mt-4 grid gap-3">
            {rows.map(([a]) => (
              <li key={a} className="flex items-start gap-3">
                <X className="mt-0.5 size-5 shrink-0 text-destructive" aria-label="Sem plano:" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-primary bg-card p-6 shadow-card">
          <h3 className="text-xl font-bold text-primary">Semana com um ponto de partida</h3>
          <ul className="mt-4 grid gap-3">
            {rows.map(([, b]) => (
              <li key={b} className="flex items-start gap-3 font-semibold">
                <Check className="mt-0.5 size-5 shrink-0 text-success" aria-label="Com plano:" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function ClosingSection() {
  return (
    <Section name="closing" tone="cream">
      <div className="mx-auto max-w-[760px] text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Daqui a sete dias, as refeições terão sido decididas de qualquer forma</h2>
        <p className="mt-5 text-lg text-muted-foreground">
          O Cardápio Inteligente oferece um caminho para que algumas dessas decisões aconteçam antes da fome e do
          cansaço. Comece com a primeira semana, ajuste o que não funcionar e use o restante do mês como biblioteca de
          opções.
        </p>
        <p className="mt-4 text-lg font-semibold">
          A alternativa é a mesma de sempre: abrir a geladeira na terça à noite e perguntar, mais uma vez, “o que eu
          faço hoje?”.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <BuyCta label="Quero receber o Cardápio Inteligente por R$ 19,90" location="closing" data-main-cta />
          <Disclaimer />
        </div>
      </div>
    </Section>
  );
}

export { Section };
