/** Feedback grounded in the selected answer, without inferring health information. */
export function getInsight(questionId: string, answer: string, fallback: string): string {
  const feedback: Record<string, Record<string, string>> = {
    q2: {
      A: "Você escolhe o que fica pronto mais rápido. Deixar algumas opções decididas antes do dia apertar pode reduzir o trabalho de escolher com fome.",
      B: "Você recorre a pedidos ou compras de última hora. O primeiro ajuste é ligar a próxima compra a refeições que já foram escolhidas.",
      C: "Você recorre às receitas que já conhece. Um repertório curto pode funcionar melhor quando as opções ficam organizadas para a semana.",
      D: "Você já consegue trocar o dia do cardápio e continuar. Vamos preservar essa flexibilidade e procurar onde o planejamento ainda dá trabalho.",
    },
    q4: {
      A: "Pensar no que preparar todos os dias é o que mais pesa para você. A próxima mudança pode começar com três jantares escolhidos de uma vez.",
      B: "Os ingredientes são seu principal obstáculo. Escolher os pratos primeiro e conferir a despensa depois dá um destino a cada item da lista.",
      C: "Você apontou que os imprevistos quebram o ritmo. Um plano útil precisa permitir trocas: mudar uma refeição não apaga o restante da semana.",
      D: "Você precisa de receitas simples que façam sentido em casa. Vale partir de ingredientes conhecidos e variar o preparo, sem complicar a compra.",
    },
  };
  return feedback[questionId]?.[answer] ?? fallback;
}
