import { useEffect } from "react";
import {
  Check,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ShoppingBasket,
  Utensils,
  RotateCcw,
} from "lucide-react";
import { profiles } from "@/quiz/profiles";
import { getFactors, getProfile, type Answers } from "@/quiz/scoring";
import { funnelConfig } from "@/config/funnel";
import { track } from "@/lib/analytics";
import { Brand } from "./Brand";
import { BuyCta } from "./ui";
import { Footer } from "./Footer";
import { useSectionView } from "./useSectionView";
export function QuizResult({ answers }: { answers: Answers }) {
  const key = getProfile(answers);
  const p = profiles[key];
  const factors = getFactors(answers, key);
  const offerRef = useSectionView<HTMLElement>("offer", "offer_view");
  useEffect(() => {
    track("quiz_result_view", { profile: key });
  }, [key]);
  return (
    <>
      <header className="ci-header">
        <Brand />
        <span className="ci-result-ready">
          <Check size={15} /> 7 de 7 · Concluído
        </span>
      </header>
      <main className="ci-result">
        <section className="ci-result-summary animate-step">
          <div className="ci-kicker">SEU PONTO DE PARTIDA</div>
          <h1>{p.title}</h1>
          <p>{p.reading.split(". ").slice(0, 2).join(". ")}.</p>
          <div className="ci-factors">
            {factors.map((f) => (
              <span key={f}>
                <Check size={14} />
                {f}
              </span>
            ))}
          </div>
          <div className="ci-first-step">
            <span>SEU PRIMEIRO PASSO</span>
            <strong>{p.firstStep}</strong>
          </div>
          <a className="ci-result-jump" href="#oferta">
            Veja como colocar isso em prática <ArrowRight size={17} />
          </a>
          <small>Leitura das suas respostas sobre rotina. Não é uma avaliação nutricional.</small>
        </section>
        <section id="oferta" className="ci-offer" ref={offerRef}>
          <div className="ci-offer-product">
            <div className="ci-kicker">UM MÊS DE IDEIAS. COMECE COM SETE DIAS.</div>
            <div className="ci-book">
              <div className="ci-book-top">
                <span>O SEU PRÓXIMO PASSO</span>
                <BookOpen size={22} />
              </div>
              <h2>
                Cardápio
                <br />
                Inteligente
              </h2>
              <b>30 DIAS</b>
              <img src="/images/prep.jpg" alt="Ingredientes para preparar as refeições" />
              <p>
                Planeje suas refeições.
                <br />
                Organize suas compras.
                <br />
                Simplifique sua rotina.
              </p>
            </div>
            <small>Representação ilustrativa · PDF de 8 páginas</small>
            <details className="ci-preview">
              <summary>Espiar o planner por dentro</summary>
              <img
                src="/images/planner.webp"
                alt="Página real do planner semanal com almoços, jantares e ingredientes"
                loading="lazy"
                width="714"
                height="1010"
              />
            </details>
          </div>
          <div className="ci-offer-copy">
            <span className="ci-offer-tag">DA INTENÇÃO PARA A MESA</span>
            <h2>A próxima semana não precisa começar do zero.</h2>
            <p>
              Você já sabe por onde começar. O {funnelConfig.productName} reúne as ideias e as
              ferramentas para dar esse passo.
            </p>
            <ul>
              {[
                [
                  CalendarDays,
                  "30 dias de almoço e jantar",
                  "60 sugestões para consultar e adaptar.",
                ],
                [Utensils, "12 receitas-base", "Ingredientes comuns, preparo simples."],
                [
                  ShoppingBasket,
                  "Listas de compras + checklist",
                  "Confira o que tem. Anote o que falta.",
                ],
                [
                  BookOpen,
                  "Planner + guia de preparação",
                  "Escolha, organize e ajuste sua semana.",
                ],
              ].map(([Icon, title, desc]) => {
                const I = Icon as typeof BookOpen;
                return (
                  <li key={String(title)}>
                    <I size={22} />
                    <span>
                      <strong>{String(title)}</strong>
                      <small>{String(desc)}</small>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="ci-price">
              <span>O material completo por</span>
              <strong>{funnelConfig.price}</strong>
              <small>Produto digital em PDF</small>
            </div>
            <BuyCta
              className="ci-button"
              label="Quero minha primeira semana planejada"
              location="result_offer"
            />
            <p className="ci-offer-disclaimer">
              Sugestões gerais e adaptáveis. O PDF é o mesmo para todos; seu primeiro passo acima
              considera suas respostas. Não é dieta personalizada e não garante emagrecimento.
            </p>
          </div>
        </section>
        <section className="ci-faq">
          <h2>Antes de começar</h2>
          <details>
            <summary>O cardápio é feito exclusivamente para mim?</summary>
            <p>
              O quiz identifica um ponto de partida para a sua organização. Você compra um guia
              geral de 8 páginas, com sugestões que pode adaptar à rotina e às preferências da casa.
            </p>
          </details>
          <details>
            <summary>Preciso seguir os 30 dias à risca?</summary>
            <p>
              Não. Comece com uma semana, troque refeições e confira os ingredientes disponíveis
              antes de comprar.
            </p>
          </details>
          <details>
            <summary>Serve para emagrecer?</summary>
            <p>
              O material organiza refeições e compras. Não calcula calorias, porções ou necessidades
              individuais. Para emagrecimento ou restrições alimentares, procure orientação
              profissional.
            </p>
          </details>
          <a className="ci-restart" href="/?etapa=inicio">
            <RotateCcw size={15} /> Rever minhas respostas
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
