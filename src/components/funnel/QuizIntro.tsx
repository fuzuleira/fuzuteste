import {
  ArrowRight,
  Check,
  ClipboardList,
  Clock,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import { btnCta, Eyebrow } from "./ui";

export function QuizIntro({
  onStart,
  hasProgress,
  onResume,
}: {
  onStart: () => void;
  hasProgress: boolean;
  onResume: () => void;
}) {
  return (
    <section className="intro-stage animate-step relative mx-auto flex min-h-[100dvh] max-w-[760px] flex-col items-start justify-center overflow-hidden px-4 pb-10 pt-7 sm:min-h-0 sm:px-5 sm:py-16">
      <Sparkles
        className="absolute right-2 top-16 size-28 text-highlight/10 sm:right-0"
        aria-hidden
      />
      <div className="mb-6 flex items-center gap-2 font-display text-lg font-bold text-primary sm:mb-8">
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Sprout className="size-5" aria-hidden />
        </span>
        Cardápio Inteligente
      </div>
      <Eyebrow>
        <Clock className="size-4" aria-hidden /> Diagnóstico de rotina alimentar, leva cerca de 90
        segundos
      </Eyebrow>
      <h1 className="mt-4 text-[2rem] font-bold leading-[1.06] text-foreground sm:mt-5 sm:text-5xl">
        Em que ponto o <span className="text-cta">improviso</span> está desmontando sua semana?
      </h1>
      <p className="mt-4 max-w-[60ch] text-[1.02rem] text-muted-foreground sm:mt-5 sm:text-lg">
        Responda sete perguntas e descubra qual ajuste pode deixar seus próximos almoços, jantares e
        compras mais fáceis de executar.
      </p>

      <ol
        className="mt-6 grid w-full grid-cols-3 gap-2 text-center text-[0.68rem] font-bold text-primary sm:text-sm"
        aria-label="Como funciona"
      >
        {["7 perguntas", "perfil revelado", "primeiro passo"].map((t, index) => (
          <li
            key={t}
            className="relative rounded-2xl border border-border bg-card px-2 py-3 shadow-card"
          >
            <span className="mx-auto mb-1.5 grid size-6 place-items-center rounded-full bg-secondary text-xs">
              {index + 1}
            </span>
            {t}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={onStart}
          className={`${btnCta} cta-shine w-full text-lg sm:w-auto`}
        >
          <ClipboardList className="size-5" aria-hidden />
          Começar meu diagnóstico
          <ArrowRight className="size-5" aria-hidden />
        </button>
        {hasProgress && (
          <button
            type="button"
            onClick={onResume}
            className="min-h-12 rounded-xl px-4 font-bold text-primary underline underline-offset-4"
          >
            Continuar de onde parei
          </button>
        )}
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="size-4 text-success" aria-hidden />
        Sem informar peso, medidas ou condição de saúde.
      </p>
      <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-primary">
        <Check className="size-4" aria-hidden /> Respostas salvas enquanto você avança
      </p>
    </section>
  );
}
