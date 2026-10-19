import { useEffect } from "react";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { btnPrimary } from "./ui";

export function QuizInsight({
  text,
  index,
  onContinue,
}: {
  text: string;
  index: number;
  onContinue: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onContinue, 2200);
    return () => clearTimeout(t);
  }, [onContinue]);
  return (
    <section
      className="animate-step mx-auto max-w-[720px] px-4 pt-8 sm:px-5 sm:pt-12"
      aria-live="polite"
    >
      <div className="relative overflow-hidden rounded-3xl border-2 border-highlight/70 bg-card p-6 shadow-card sm:p-8">
        <Sparkles className="absolute -right-4 -top-4 size-24 text-highlight/10" aria-hidden />
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <span className="grid size-9 place-items-center rounded-xl bg-highlight/15">
              <Lightbulb className="size-5 text-cta" aria-hidden />
            </span>
            Insight desbloqueado
          </p>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
            {index} de 3
          </span>
        </div>
        <p className="mt-5 font-display text-[1.35rem] font-semibold leading-snug sm:text-2xl">
          {text}
        </p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden>
          <span className="insight-timer block h-full rounded-full bg-highlight" />
        </div>
        <button
          type="button"
          onClick={onContinue}
          className={`${btnPrimary} mt-5 w-full sm:w-auto`}
          autoFocus
        >
          Continuar <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
