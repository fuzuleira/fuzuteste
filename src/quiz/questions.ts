export type Dimension = "D" | "C" | "R" | "F" | "O";

export interface QuizOption {
  id: string;
  label: string;
  points: Partial<Record<Dimension, number>>;
  /** Fator curto exibido no resultado quando esta resposta é escolhida. */
  factor: string;
  image?: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  eyebrow?: string;
  hint?: string;
  options: QuizOption[];
  /** Insight exibido após esta pergunta. */
  insight?: string;
}

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    title: "O que você mais quer mudar na alimentação?",
    eyebrow: "PRIMEIRO, O QUE IMPORTA PARA VOCÊ",
    options: [
      {
        id: "A",
        image: "/images/meal.jpg",
        label: "Cuidar melhor da alimentação",
        points: { D: 3 },
        factor: "Quer cuidar da alimentação",
      },
      {
        id: "B",
        image: "/images/groceries.jpg",
        label: "Comprar com mais direção",
        points: { C: 2 },
        factor: "Quer compras com direção",
      },
      {
        id: "C",
        image: "/images/prep.jpg",
        label: "Parar de começar e desistir",
        points: { F: 2 },
        factor: "Quer manter a continuidade",
      },
      {
        id: "D",
        image: "/images/table.jpg",
        label: "Facilitar uma rotina já organizada",
        points: { O: 2 },
        factor: "Já tem uma base organizada",
      },
    ],
  },
  {
    id: "q2",
    title: "Quando o dia aperta, o que vai para a mesa?",
    eyebrow: "VAMOS OLHAR PARA OS DIAS REAIS",
    insight:
      "Quando a decisão fica para o momento de maior cansaço, conveniência costuma pesar mais do que a intenção feita no começo da semana.",
    options: [
      {
        id: "A",
        label: "Escolho a opção mais rápida disponível.",
        points: { D: 2 },
        factor: "Recorre à opção mais rápida",
      },
      {
        id: "B",
        label: "Peço alguma coisa ou passo no mercado de última hora.",
        points: { C: 2 },
        factor: "Compras de última hora",
      },
      {
        id: "C",
        label: "Repito qualquer refeição que já sei fazer.",
        points: { R: 2 },
        factor: "Repete as mesmas refeições",
      },
      {
        id: "D",
        label: "Troco o dia do cardápio e continuo.",
        points: { O: 2 },
        factor: "Ajusta o cardápio e segue",
      },
    ],
  },
  {
    id: "q3",
    title: "Você compra com um plano ou resolve depois?",
    eyebrow: "DA COZINHA PARA O MERCADO",
    options: [
      {
        id: "A",
        label: "Lembro dos itens enquanto caminho pelo mercado.",
        points: { C: 3 },
        factor: "Compra por lembrança",
      },
      {
        id: "B",
        label: "Faço uma lista, mas sem ligar cada item a uma refeição.",
        points: { C: 2 },
        factor: "Lista sem ligação com refeições",
      },
      {
        id: "C",
        label: "Escolho algumas refeições e depois anoto o que falta.",
        points: { F: 2 },
        factor: "Lista parcialmente planejada",
      },
      {
        id: "D",
        label: "Confiro o que tenho e monto a lista a partir de um plano.",
        points: { O: 3 },
        factor: "Lista nasce de um plano",
      },
    ],
  },
  {
    id: "q4",
    title: "O que mais faz você perder o ritmo?",
    eyebrow: "VAMOS AO PONTO",
    insight:
      "Uma meta ampla não decide a refeição de terça-feira. Um plano útil precisa responder o que preparar, o que comprar e como ajustar.",
    options: [
      {
        id: "A",
        label: "Pensar no que preparar todos os dias.",
        points: { D: 3 },
        factor: "Cansaço de decidir todo dia",
      },
      {
        id: "B",
        label: "Comprar os ingredientes certos.",
        points: { C: 3 },
        factor: "Dificuldade com os ingredientes certos",
      },
      {
        id: "C",
        label: "Manter o plano quando a rotina muda.",
        points: { F: 3 },
        factor: "Plano cai quando a rotina muda",
      },
      {
        id: "D",
        label: "Encontrar receitas simples que a casa aceite.",
        points: { R: 3 },
        factor: "Falta de receitas simples",
      },
    ],
  },
  {
    id: "q5",
    title: "O que já ficou pelo caminho?",
    eyebrow: "SEM JULGAMENTO. SÓ A SUA EXPERIÊNCIA.",
    options: [
      {
        id: "A",
        label: "Planejei demais e abandonei depois de poucos dias.",
        points: { F: 3 },
        factor: "Plano exigente demais",
      },
      {
        id: "B",
        label: "Salvei receitas, mas não transformei em uma semana.",
        points: { R: 2, D: 1 },
        factor: "Receitas salvas sem virar semana",
      },
      {
        id: "C",
        label: "Fiz compras, mas alguns ingredientes ficaram sem uso.",
        points: { C: 3 },
        factor: "Ingredientes sem destino",
      },
      {
        id: "D",
        label: "Nunca tive um roteiro simples para testar.",
        points: { D: 2 },
        factor: "Nunca teve um roteiro simples",
      },
    ],
  },
  {
    id: "q6",
    title: "Quanto tempo cabe na sua semana?",
    eyebrow: "UM PLANO POSSÍVEL É MELHOR QUE UM PERFEITO",
    options: [
      { id: "A", label: "Cerca de 15 minutos.", points: { F: 2 }, factor: "Pouco tempo semanal" },
      {
        id: "B",
        label: "De 30 a 45 minutos.",
        points: { O: 2 },
        factor: "30 a 45 minutos por semana",
      },
      {
        id: "C",
        label: "De 45 a 60 minutos.",
        points: { O: 3 },
        factor: "45 a 60 minutos por semana",
      },
      {
        id: "D",
        label: "Depende muito da semana.",
        points: { F: 2 },
        factor: "Tempo varia a cada semana",
      },
    ],
  },
  {
    id: "q7",
    title: "Se pudesse resolver uma coisa hoje, qual seria?",
    eyebrow: "SEU PRÓXIMO PASSO COMEÇA AQUI",
    options: [
      {
        id: "A",
        label: "Parar de perguntar “o que faço hoje?”.",
        points: { D: 3 },
        factor: "Quer parar de decidir na hora",
      },
      {
        id: "B",
        label: "Chegar ao mercado com uma lista mais clara.",
        points: { C: 3 },
        factor: "Quer uma lista mais clara",
      },
      {
        id: "C",
        label: "Ter opções simples para variar as refeições.",
        points: { R: 3 },
        factor: "Quer variar com simplicidade",
      },
      {
        id: "D",
        label: "Continuar mesmo quando um dia sair do plano.",
        points: { F: 3 },
        factor: "Quer continuar após imprevistos",
      },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
