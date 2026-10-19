import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import type { QuizQuestion as Q } from "@/quiz/questions";
import { cn } from "@/lib/utils";

export function QuizQuestion({
  question,
  selected,
  onSelect,
  locked,
}: {
  question: Q;
  selected?: string | undefined;
  onSelect: (optionId: string) => void;
  locked: boolean;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  return (
    <fieldset
      key={question.id}
      className="animate-step mx-auto max-w-[720px] px-4 pb-12 pt-7 sm:px-5 sm:pt-10"
    >
      <legend className="contents">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-[1.65rem] font-bold leading-tight outline-none sm:text-4xl"
        >
          {question.title}
        </h1>
      </legend>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">
        Escolha a opção que mais se aproxima da sua rotina hoje.
      </p>
      <div className="mt-5 grid gap-3" role="radiogroup" aria-label={question.title}>
        {question.options.map((opt, index) => {
          const isSel = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSel}
              disabled={locked && !isSel}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "quiz-option group flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 bg-card p-3.5 text-left text-[0.98rem] font-semibold leading-snug shadow-card transition-[border-color,background-color,transform,box-shadow] duration-200 active:scale-[0.985] sm:min-h-[4.5rem] sm:gap-4 sm:p-4 sm:text-base",
                isSel
                  ? "selected border-primary bg-accent shadow-[0_8px_25px_-16px_var(--primary)]"
                  : "border-border hover:border-leaf hover:bg-secondary/40",
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-bold transition-colors",
                  isSel
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
                aria-hidden
              >
                {isSel ? <Check className="size-5" /> : index + 1}
              </span>
              <span className="flex-1">{opt.label}</span>
              <span
                className={cn(
                  "text-xs font-bold text-primary transition-opacity",
                  isSel ? "opacity-100" : "opacity-0",
                )}
                aria-hidden
              >
                registrado
              </span>
            </button>
          );
        })}
      </div>
      <p
        className="mt-5 text-center text-xs font-semibold text-muted-foreground"
        aria-live="polite"
      >
        {selected
          ? "Resposta salva. Preparando a próxima etapa…"
          : "Sua resposta fica salva neste dispositivo."}
      </p>
    </fieldset>
  );
}
