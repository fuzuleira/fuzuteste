import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Brand } from "./Brand";
export function QuizProgress({
  current,
  total,
  onBack,
}: {
  current: number;
  total: number;
  onBack: () => void;
}) {
  const pct = Math.round(((current - 1) / total) * 100);
  return (
    <header className="ci-quiz-header">
      <div className="ci-header">
        <Brand />
        <span className="ci-header-note">
          <LockKeyhole size={14} /> Sua rotina, seu ritmo
        </span>
      </div>
      <div className="ci-progress-wrap">
        <div className="ci-progress-top">
          <button onClick={onBack} aria-label="Voltar à etapa anterior">
            <ArrowLeft size={19} />
          </button>
          <span>
            {current <= 2
              ? "01 · SUA ROTINA"
              : current <= 5
                ? "02 · SEUS OBSTÁCULOS"
                : "03 · SEU PRÓXIMO PASSO"}
          </span>
          <b>
            {current}
            <small> / {total}</small>
          </b>
        </div>
        <div
          className="ci-progress"
          role="progressbar"
          aria-label="Perguntas respondidas"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="ci-milestones">
          <span className="active">Entender</span>
          <span className={current > 2 ? "active" : ""}>Simplificar</span>
          <span className={current > 5 ? "active" : ""}>Começar</span>
        </div>
      </div>
    </header>
  );
}
