import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { funnelConfig, isFilled } from "@/config/funnel";
import { track } from "@/lib/analytics";
import { Section } from "./SalesSections";

function getFaqs() {
  const list: { q: string; a: string }[] = [
    { q: "É uma dieta?", a: "Não. É um guia de planejamento com sugestões gerais de almoço, jantar e compras." },
    {
      q: "O material faz emagrecer?",
      a: "O produto não promete alteração de peso. Ele ajuda a organizar refeições e compras. Objetivos de emagrecimento dependem de fatores individuais e podem exigir orientação profissional.",
    },
    { q: "Preciso seguir os 30 dias na ordem?", a: "Não. As refeições podem ser trocadas e adaptadas à sua semana." },
    { q: "As quantidades estão calculadas?", a: "Não. Cada casa deve ajustar quantidades ao número de pessoas e às suas necessidades." },
    { q: "Serve para restrições alimentares?", a: "O conteúdo é geral. Alergias, restrições e condições de saúde exigem adaptações adequadas." },
    {
      q: "Já existem receitas grátis na internet. Por que pagar?",
      a: "Receitas soltas não decidem sua semana. O valor está em ter calendário, receitas-base, listas, planner e revisão organizados juntos, para você sair da escolha diária e ir ao mercado com uma lista que tem destino.",
    },
    {
      q: "Tenho medo de comprar e não usar.",
      a: "Você não precisa começar pelos 30 dias. O primeiro uso pode ser escolher sete refeições ou poucos dias, conferir a cozinha e montar uma lista do que falta.",
    },
  ];
  if (isFilled(funnelConfig.deliveryMethod)) list.push({ q: "Como recebo?", a: funnelConfig.deliveryMethod });
  if (isFilled(funnelConfig.guaranteeText)) list.push({ q: "Existe garantia?", a: funnelConfig.guaranteeText });
  return list;
}

export function FAQ() {
  const faqs = getFaqs();
  return (
    <Section name="faq">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-3xl font-bold sm:text-4xl">Perguntas antes de decidir</h2>
        <Accordion
          type="single"
          collapsible
          className="mt-6"
          onValueChange={(v) => v && track("faq_open", { question: v })}
        >
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i + 1}`}>
              <AccordionTrigger className="min-h-14 text-left font-display text-lg font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
