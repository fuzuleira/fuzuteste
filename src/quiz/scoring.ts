import { questions, type Dimension } from "./questions";

export type Answers = Record<string, string>; // questionId -> optionId
export type Scores = Record<Dimension, number>;

/** Desempate: D > C > F > R > O */
export const TIE_PRIORITY: Dimension[] = ["D", "C", "F", "R", "O"];

export function computeScores(answers: Answers): Scores {
  const scores: Scores = { D: 0, C: 0, R: 0, F: 0, O: 0 };
  for (const q of questions) {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    if (!opt) continue;
    for (const [dim, pts] of Object.entries(opt.points)) {
      scores[dim as Dimension] += pts ?? 0;
    }
  }
  return scores;
}

export function getProfile(answers: Answers): Dimension {
  const scores = computeScores(answers);
  let best: Dimension = "D";
  for (const dim of TIE_PRIORITY) {
    if (scores[dim] > scores[best]) best = dim;
  }
  return best;
}

/** Três fatores das respostas, priorizando as que mais pontuaram no perfil. */
export function getFactors(answers: Answers, profile: Dimension): string[] {
  const picked = questions
    .map((q) => q.options.find((o) => o.id === answers[q.id]))
    .filter((o): o is NonNullable<typeof o> => Boolean(o))
    .sort((a, b) => (b.points[profile] ?? 0) - (a.points[profile] ?? 0));
  return picked.slice(0, 3).map((o) => o.factor);
}

export function isComplete(answers: Answers): boolean {
  return questions.every((q) => Boolean(answers[q.id]));
}
