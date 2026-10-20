import { ArrowRight, Check } from "lucide-react";
export function QuizInsight({
  text,
  index,
  onContinue,
}: {
  text: string;
  index: number;
  onContinue: () => void;
}) {
  return (
    <section className="ci-insight animate-step">
      <div className="ci-insight-check">
        <Check size={35} />
      </div>
      <div className="ci-kicker">{index === 1 ? "ROTINA MAPEADA" : "OBSTÁCULO IDENTIFICADO"}</div>
      <h1>{index === 1 ? "Isso ajuda a entender seu dia." : "O plano precisa caber na vida."}</h1>
      <p>{text}</p>
      <div className="ci-insight-tip">
        {index === 1
          ? "A próxima pergunta conecta sua rotina às compras."
          : "Agora vamos encontrar um primeiro passo possível."}
      </div>
      <button className="ci-button" onClick={onContinue}>
        Continuar <ArrowRight size={19} />
      </button>
    </section>
  );
}
