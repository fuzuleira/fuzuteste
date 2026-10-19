import type { Dimension } from "./questions";

export interface Profile {
  key: Dimension;
  name: string;
  title: string;
  reading: string;
  firstStep: string;
  bridge: string;
}

export const profiles: Record<Dimension, Profile> = {
  D: {
    key: "D",
    name: "Decisão no fim do dia",
    title: "Sua semana concentra decisões justamente quando a energia está mais baixa",
    reading:
      "Suas respostas mostram que almoço e jantar costumam ser resolvidos perto da hora de comer. Isso aumenta a dependência da opção mais rápida disponível. Não é falta de vontade: é a decisão chegando no pior momento do dia, quando a fome já estreitou as opções e a intenção do começo da semana pesa menos do que a conveniência.",
    firstStep: "Escolha hoje apenas três jantares para os próximos dias e anote os ingredientes que faltam.",
    bridge:
      "O Cardápio Inteligente amplia esse primeiro passo com 30 dias de sugestões, receitas-base e um planner semanal.",
  },
  C: {
    key: "C",
    name: "Compra sem mapa",
    title: "Sua compra precisa nascer das refeições, não dos corredores do mercado",
    reading:
      "Suas respostas indicam que a lista nem sempre está conectada aos pratos da semana. Assim, itens podem faltar ou ficar sem destino. O mercado vira uma sequência de lembranças soltas, e a cozinha recebe ingredientes que ninguém sabe exatamente quando serão usados.",
    firstStep: "Antes da próxima compra, escolha quatro refeições e confira o que já existe em casa.",
    bridge:
      "As listas-base e o calendário do Cardápio Inteligente ajudam a repetir esse processo durante quatro semanas.",
  },
  R: {
    key: "R",
    name: "Poucas opções disponíveis",
    title: "A repetição está ocupando o espaço que deveria ser das escolhas prontas",
    reading:
      "Suas respostas mostram que ter poucas ideias acessíveis pesa nos dias corridos. O problema não exige receitas sofisticadas, e sim opções comuns que possam ser consultadas rapidamente. Sem esse repertório à mão, o cansaço sempre vence e o prato da vez acaba sendo o mesmo de ontem.",
    firstStep: "Escolha duas receitas conhecidas e uma alternativa simples para variar a próxima semana.",
    bridge: "O material reúne 60 sugestões de refeição e 12 receitas-base para consultar e adaptar.",
  },
  F: {
    key: "F",
    name: "Plano difícil de sustentar",
    title: "Sua rotina precisa de um plano que aceite mudanças",
    reading:
      "Suas respostas indicam que um imprevisto pode desmontar o planejamento inteiro. Um cardápio rígido aumenta esse risco. Quando um dia sai do roteiro, parece que a semana toda foi perdida, e recomeçar do zero cansa mais do que ajustar.",
    firstStep:
      "Planeje cinco dias e deixe dois espaços de adaptação. Se uma refeição mudar, mova a opção para outro dia.",
    bridge:
      "O planner do Cardápio Inteligente foi pensado como ponto de partida, com espaço para trocas e revisão semanal.",
  },
  O: {
    key: "O",
    name: "Base organizada",
    title: "Você já tem uma base. O próximo ganho está em reduzir o trabalho de planejar",
    reading:
      "Suas respostas mostram que parte do processo já existe. O ganho potencial vem de ter sugestões, listas e revisão no mesmo material. Em vez de reinventar a semana toda vez, você pode consultar opções já reunidas e gastar menos energia pensando no cardápio.",
    firstStep: "Compare sua próxima semana com as sugestões do guia e escolha apenas o que pouparia tempo.",
    bridge:
      "O Cardápio Inteligente pode funcionar como biblioteca e planner, sem substituir o sistema que já funciona.",
  },
};

export const dimensionLabels: Record<Dimension, string> = {
  D: "Decisão tardia",
  C: "Compra sem cardápio",
  R: "Repertório limitado",
  F: "Plano rígido",
  O: "Organização",
};
