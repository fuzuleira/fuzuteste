import { useEffect, useRef } from "react";
import { BookmarkCheck, X } from "lucide-react";
import { getProductHref } from "@/config/funnel";
import { track } from "@/lib/analytics";
import { btnCta, btnGhost } from "./ui";

export function ExitPrompt({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    track("exit_prompt_view");
    ref.current?.querySelector("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        track("exit_prompt_action", { action: "dismiss" });
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const act = (action: string) => {
    track("exit_prompt_action", { action });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end bg-foreground/50 p-3 backdrop-blur-sm sm:place-items-center sm:p-4"
      onMouseDown={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
        className="animate-step relative w-full max-w-md rounded-3xl bg-card p-6 shadow-card"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => act("dismiss")}
          className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <X className="size-5" aria-hidden />
        </button>
        <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
          <BookmarkCheck className="size-6" aria-hidden />
        </span>
        <h2 id="exit-title" className="text-2xl font-bold">
          Quer levar seu progresso com você?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Suas respostas desta sessão podem ser mantidas para você continuar depois. Também é
          possível ir direto ao material de R$ 19,90.
        </p>
        <div className="mt-6 grid gap-2">
          <button type="button" className={btnCta} onClick={() => act("continue")}>
            Continuar o quiz
          </button>
          <a href={getProductHref()} className={btnGhost} onClick={() => act("offer")}>
            Ver a oferta agora
          </a>
          <button
            type="button"
            className="min-h-11 font-bold text-muted-foreground underline"
            onClick={() => act("exit")}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
