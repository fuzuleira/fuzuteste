export type Dimension = "D" | "C" | "R" | "F" | "O";

export interface QuizOption {
  id: string;
  label: string;
  points: Partial<Record<Dimension, number>>;
  /** Fator curto exibido no resultado quando esta resposta é escolhida. */
  factor: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
  /** Insight exibido após esta pergunta. */
  insight?: string;
}

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    title: "Quando o almoço ou jantar costuma ser decidido na sua rotina?",
    options: [
      { id: "A", label: "Na hora, quando a fome já chegou.", points: { D: 3 }, factor: "Decide na hora da fome" },
      { id: "B", label: "No mesmo dia, algumas horas antes.", points: { D: 2 }, factor: "Decide no mesmo dia" },
      { id: "C", label: "Planejo algumas refeições e improviso outras.", points: { F: 2 }, factor: "Planeja só parte da semana" },
      { id: "D", label: "Normalmente deixo a semana encaminhada.", points: { O: 2 }, factor: "Semana costuma estar encaminhada" },
    ],
  },
  {
    id: "q2",
    title: "O que acontece com mais frequência quando o dia sai do planejado?",
    insight:
      "Quando a decisão fica para o momento de maior cansaço, conveniência costuma pesar mais do que a intenção feita no começo da semana.",
    options: [
      { id: "A", label: "Escolho a opção mais rápida disponível.", points: { D: 2 }, factor: "Recorre à opção mais rápida" },
      { id: "B", label: "Peço alguma coisa ou passo no mercado de última hora.", points: { C: 2 }, factor: "Compras de última hora" },
      { id: "C", label: "Repito qualquer refeição que já sei fazer.", points: { R: 2 }, factor: "Repete as mesmas refeições" },
      { id: "D", label: "Troco o dia do cardápio e continuo.", points: { O: 2 }, factor: "Ajusta o cardápio e segue" },
    ],
  },
  {
    id: "q3",
    title: "Como sua lista de compras costuma nascer?",
    options: [
      { id: "A", label: "Lembro dos itens enquanto caminho pelo mercado.", points: { C: 3 }, factor: "Compra por lembrança" },
      { id: "B", label: "Faço uma lista, mas sem ligar cada item a uma refeição.", points: { C: 2 }, factor: "Lista sem ligação com refeições" },
      { id: "C", label: "Escolho algumas refeições e depois anoto o que falta.", points: { F: 2 }, factor: "Lista parcialmente planejada" },
      { id: "D", label: "Confiro o que tenho e monto a lista a partir de um plano.", points: { O: 3 }, factor: "Lista nasce de um plano" },
    ],
  },
  {
    id: "q4",
    title: "Qual parte mais atrapalha uma semana organizada?",
    insight:
      "Uma meta ampla não decide a refeição de terça-feira. Um plano útil precisa responder o que preparar, o que comprar e como ajustar.",
    options: [
      { id: "A", label: "Pensar no que preparar todos os dias.", points: { D: 3 }, factor: "Cansaço de decidir todo dia" },
      { id: "B", label: "Comprar os ingredientes certos.", points: { C: 3 }, factor: "Dificuldade com os ingredientes certos" },
      { id: "C", label: "Manter o plano quando a rotina muda.", points: { F: 3 }, factor: "Plano cai quando a rotina muda" },
      { id: "D", label: "Encontrar receitas simples que a casa aceite.", points: { R: 3 }, factor: "Falta de receitas simples" },
    ],
  },
  {
    id: "q5",
    title: "Quando você já tentou organizar as refeições, o que aconteceu?",
    options: [
      { id: "A", label: "Planejei demais e abandonei depois de poucos dias.", points: { F: 3 }, factor: "Plano exigente demais" },
      { id: "B", label: "Salvei receitas, mas não transformei em uma semana.", points: { R: 2, D: 1 }, factor: "Receitas salvas sem virar semana" },
      { id: "C", label: "Fiz compras, mas alguns ingredientes ficaram sem uso.", points: { C: 3 }, factor: "Ingredientes sem destino" },
      { id: "D", label: "Nunca tive um roteiro simples para testar.", points: { D: 2 }, factor: "Nunca teve um roteiro simples" },
    ],
  },
  {
    id: "q6",
    title: "Quanto tempo seria realista reservar uma vez por semana?",
    insight:
      "O Cardápio Inteligente sugere uma rotina de 30 a 60 minutos, mas o primeiro uso pode começar com sete refeições ou poucos dias.",
    options: [
      { id: "A", label: "Cerca de 15 minutos.", points: { F: 2 }, factor: "Pouco tempo semanal" },
      { id: "B", label: "De 30 a 45 minutos.", points: { O: 2 }, factor: "30 a 45 minutos por semana" },
      { id: "C", label: "De 45 a 60 minutos.", points: { O: 3 }, factor: "45 a 60 minutos por semana" },
      { id: "D", label: "Depende muito da semana.", points: { F: 2 }, factor: "Tempo varia a cada semana" },
    ],
  },
  {
    id: "q7",
    title: "Qual mudança faria mais diferença já na próxima semana?",
    options: [
      { id: "A", label: "Parar de perguntar “o que faço hoje?”.", points: { D: 3 }, factor: "Quer parar de decidir na hora" },
      { id: "B", label: "Chegar ao mercado com uma lista mais clara.", points: { C: 3 }, factor: "Quer uma lista mais clara" },
      { id: "C", label: "Ter opções simples para variar as refeições.", points: { R: 3 }, factor: "Quer variar com simplicidade" },
      { id: "D", label: "Continuar mesmo quando um dia sair do plano.", points: { F: 3 }, factor: "Quer continuar após imprevistos" },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
