import { useEffect, useRef } from "react";
import { Check, ChevronRight, Clock3, ShoppingBasket, CalendarDays, Utensils } from "lucide-react";
import type { QuizQuestion as Q } from "@/quiz/questions";
const icons = [Clock3, ShoppingBasket, CalendarDays, Utensils];
export function QuizQuestion({
  question,
  selected,
  onSelect,
  locked,
}: {
  question: Q;
  selected?: string | undefined;
  onSelect: (id: string) => void;
  locked: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [question.id]);
  return (
    <section key={question.id} className="ci-question animate-step">
      <div className="ci-kicker">{question.eyebrow}</div>
      <h1 ref={ref} tabIndex={-1}>
        {question.title}
      </h1>
      <p className="ci-question-hint">
        {question.hint ?? "Toque na opção que mais combina com você."}
      </p>
      <div
        className={question.id === "q1" ? "ci-options ci-image-options" : "ci-options"}
        aria-label={question.title}
      >
        {question.options.map((o, i) => {
          const Icon = icons[i] ?? Utensils;
          return (
            <button
              key={o.id}
              className={`ci-option ${selected === o.id ? "selected" : ""}`}
              aria-pressed={selected === o.id}
              disabled={locked}
              onClick={() => onSelect(o.id)}
            >
              {o.image ? (
                <img src={o.image} alt="" />
              ) : (
                <span className="ci-option-icon">
                  <Icon size={23} />
                </span>
              )}
              <span className="ci-option-text">
                {o.label}
                {o.description && <small>{o.description}</small>}
              </span>
              <span className="ci-option-check">
                {selected === o.id ? <Check size={17} /> : <ChevronRight size={17} />}
              </span>
            </button>
          );
        })}
      </div>
      <p className="ci-answer-note" aria-live="polite">
        {locked
          ? "Resposta registrada. Vamos em frente."
          : question.id === "q7"
            ? "Última pergunta. Seu próximo passo está logo ali."
            : "Não existe resposta certa. Existe a sua vida real."}
      </p>
    </section>
  );
}
