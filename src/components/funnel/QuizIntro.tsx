import { ArrowRight, Clock3, Check, ShieldCheck } from "lucide-react";
import { Brand } from "./Brand";
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
    <div className="ci-home">
      <header className="ci-header">
        <Brand />
        <span className="ci-header-note">
          <Clock3 size={15} /> Seu primeiro passo em 1 minuto
        </span>
      </header>
      <section className="ci-hero">
        <div className="ci-hero-copy">
          <div className="ci-kicker">
            <span /> MENOS IMPROVISO. MAIS DIREÇÃO.
          </div>
          <h1>
            A fome chega.
            <br />O cansaço também.
            <br />
            <em>E o seu plano?</em>
          </h1>
          <p className="ci-lead">
            Pare de começar cada refeição do zero. Descubra o que trava sua rotina e por onde
            começar a mudar.
          </p>
          <div className="ci-chips">
            <span>
              <Check size={16} /> Comida de verdade
            </span>
            <span>
              <Check size={16} /> Sem complicação
            </span>
          </div>
          <button className="ci-button" onClick={onStart}>
            Quero sair do improviso <ArrowRight size={20} />
          </button>
          <p className="ci-micro">7 perguntas rápidas · Sem cadastro</p>
          {hasProgress && (
            <button className="ci-resume" onClick={onResume}>
              Continuar de onde parei →
            </button>
          )}
          <div className="ci-trust">
            <ShieldCheck size={19} />
            <span>
              Suas respostas ficam apenas nesta sessão.
              <br />
              Um primeiro passo que respeita a sua rotina.
            </span>
          </div>
        </div>
        <div className="ci-hero-visual">
          <img
            src="/images/meal.jpg"
            alt="Prato com cereais, vegetais e proteína"
            fetchPriority="high"
          />
          <div className="ci-photo-label">
            <span className="ci-small-dot" /> A próxima refeição pode ter um plano.
          </div>
          <div className="ci-week-card">
            <span className="ci-kicker">SUA PRÓXIMA SEMANA</span>
            <strong>
              Decidir antes.
              <br />
              Respirar depois.
            </strong>
            <div className="ci-week-days">
              {"STQQSSD".split("").map((d, i) => (
                <span key={i} className={i < 3 ? "done" : ""}>
                  {i < 3 ? <Check size={13} /> : d}
                </span>
              ))}
            </div>
            <small>Um dia de cada vez. Um plano para seguir.</small>
          </div>
        </div>
      </section>
      <footer className="ci-home-footer">
        <span>ROTINA REAL. COMIDA SIMPLES.</span>
        <p>
          Planejamento culinário geral. Não é dieta personalizada nem promessa de emagrecimento.
        </p>
      </footer>
    </div>
  );
}
