import { ArrowLeft } from "lucide-react";

export function QuizProgress({
  current,
  total,
  onBack,
}: {
  current: number;
  total: number;
  onBack: () => void;
}) {
  const pct = Math.round((current / total) * 100);
  const remaining = total - current;
  return (
    <div className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[720px] items-center gap-3 px-3 py-2.5 sm:px-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xl px-2 font-bold text-primary transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-5" aria-hidden /> Voltar
        </button>
        <div className="flex-1">
          <div
            className="flex items-center justify-between gap-3 text-xs font-bold sm:text-sm"
            aria-live="polite"
          >
            <span className="text-primary">
              Etapa {current} de {total}
            </span>
            <span className="text-muted-foreground">
              {remaining === 0 ? "última pergunta" : `faltam ${remaining}`}
            </span>
          </div>
          <div
            className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-secondary ring-1 ring-primary/5"
            role="progressbar"
            aria-label="Progresso do quiz"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div
              className="progress-glow h-full rounded-full bg-leaf transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
