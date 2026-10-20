import { getInsight } from "@/quiz/insights";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { questions, TOTAL_QUESTIONS } from "@/quiz/questions";
import { getProfile, isComplete, type Answers } from "@/quiz/scoring";
import { loadAnswers, saveAnswers } from "@/quiz/state";
import { track } from "@/lib/analytics";
import { QuizIntro } from "./QuizIntro";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizInsight } from "./QuizInsight";
import { QuizProcessing } from "./QuizProcessing";
import { QuizResult } from "./QuizResult";

export type Etapa = "inicio" | "p1" | "p2" | "p3" | "p4" | "p5" | "p6" | "p7" | "resultado";
const qEtapa = (n: number) => `p${n}` as Etapa;

function firstUnanswered(a: Answers) {
  const i = questions.findIndex((q) => !a[q.id]);
  return i === -1 ? TOTAL_QUESTIONS : i; // 0-based
}

export function Funnel({ etapa }: { etapa: Etapa }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [hydrated, setHydrated] = useState(false);
  const [locked, setLocked] = useState(false);
  const [insight, setInsight] = useState<{ text: string; index: number; next: Etapa } | null>(null);
  const [processing, setProcessing] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setAnswers(loadAnswers());
    setHydrated(true);
    track("quiz_view");
  }, []);

  const go = useCallback(
    (e: Etapa) => {
      navigate({ to: "/", search: { etapa: e } });
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [navigate],
  );

  // Resolve a etapa realmente exibível (não pula perguntas sem resposta).
  let view: Etapa = etapa;
  if (hydrated) {
    const fu = firstUnanswered(answers);
    if (etapa === "resultado" && !isComplete(answers)) view = qEtapa(fu + 1);
    else if (/^p\d$/.test(etapa) && Number(etapa.slice(1)) - 1 > fu) view = qEtapa(fu + 1);
  }
  const qIndex = /^p\d$/.test(view) ? Number(view.slice(1)) - 1 : -1;

  useEffect(() => {
    setInsight(null);
    setLocked(false);
    clearTimeout(timer.current);
    if (qIndex >= 0) track("quiz_step_view", { step: qIndex + 1 });
  }, [qIndex]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleSelect = (optionId: string) => {
    if (locked) return;
    const q = questions[qIndex];
    if (!q) return;
    const next = { ...answers, [q.id]: optionId };
    setAnswers(next);
    saveAnswers(next);
    setLocked(true);
    track("quiz_answer", { step: qIndex + 1 });
    if ("vibrate" in navigator) navigator.vibrate(12);
    timer.current = setTimeout(() => {
      if (qIndex === TOTAL_QUESTIONS - 1) {
        track("quiz_complete", { profile: getProfile(next) });
        setProcessing(true);
        return;
      }
      const nextEtapa = qEtapa(qIndex + 2);
      if (q.insight) {
        const index = questions.filter((x, i) => x.insight && i <= qIndex).length;
        track("quiz_insight_view", { index });
        setInsight({ text: getInsight(q.id, optionId, q.insight), index, next: nextEtapa });
      } else go(nextEtapa);
    }, 380);
  };

  const finishProcessing = useCallback(() => {
    setProcessing(false);
    go("resultado");
  }, [go]);

  const continueInsight = useCallback(() => {
    if (insight) go(insight.next);
    setInsight(null);
  }, [go, insight]);

  const back = () => go(qIndex <= 0 ? "inicio" : qEtapa(qIndex));

  if (processing) return <QuizProcessing onDone={finishProcessing} />;

  if (view === "resultado" && hydrated) return <QuizResult answers={answers} />;

  const currentQ = qIndex >= 0 ? questions[qIndex] : undefined;
  if (currentQ && hydrated) {
    return (
      <>
        <QuizProgress current={qIndex + 1} total={TOTAL_QUESTIONS} onBack={back} />
        <main>
          {insight ? (
            <QuizInsight text={insight.text} index={insight.index} onContinue={continueInsight} />
          ) : (
            <QuizQuestion
              question={currentQ}
              selected={answers[currentQ.id]}
              onSelect={handleSelect}
              locked={locked}
            />
          )}
        </main>
      </>
    );
  }

  const answered = Object.keys(answers).length;
  return (
    <main>
      <QuizIntro
        hasProgress={hydrated && answered > 0}
        onResume={() =>
          go(isComplete(answers) ? "resultado" : qEtapa(firstUnanswered(answers) + 1))
        }
        onStart={() => {
          track("quiz_start");
          go("p1");
        }}
      />
    </main>
  );
}
