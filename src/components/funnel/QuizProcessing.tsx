import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";

const steps = [
  "identificando onde as decisões se acumulam",
  "relacionando compras e refeições",
  "preparando seu primeiro passo",
];

export function QuizProcessing({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const timers = [450, 950, 1450].map((ms, i) => setTimeout(() => setDone(i + 1), ms));
    const end = setTimeout(onDone, 1900);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, [onDone]);
  return (
    <section
      className="animate-step mx-auto max-w-[720px] px-4 pt-10 sm:px-5 sm:pt-14"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-4">
          <div className="relative grid size-16 shrink-0 place-items-center rounded-full bg-secondary sm:size-20">
            <Loader2 className="size-9 animate-spin text-leaf" aria-hidden />
            <Sparkles className="absolute -right-1 -top-1 size-5 text-highlight" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold text-primary">7 respostas conectadas</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Montando seu resultado</h1>
          </div>
        </div>
        <p className="mt-5 text-muted-foreground">
          Seu padrão está claro. Estamos transformando as respostas em um primeiro passo simples
          para a próxima semana.
        </p>
        <ul className="mt-6 grid gap-3">
          {steps.map((s, i) => (
            <li
              key={s}
              className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 transition-colors ${i < done ? "border-success/30 bg-secondary" : "border-border bg-background/50"}`}
            >
              {i < done ? (
                <Check className="size-5 text-success" aria-hidden />
              ) : (
                <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
              )}
              <span className={i < done ? "font-semibold" : "text-muted-foreground"}>{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-3 text-xs font-bold text-muted-foreground">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-leaf transition-[width] duration-500"
              style={{ width: `${Math.max(8, (done / steps.length) * 100)}%` }}
            />
          </div>
          <span>{Math.round((done / steps.length) * 100)}%</span>
        </div>
      </div>
    </section>
  );
}
