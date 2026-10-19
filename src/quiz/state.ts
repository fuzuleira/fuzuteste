import type { Answers } from "./scoring";

const KEY = "ci_quiz_v1";
const EXIT_KEY = "ci_exit_prompt_shown";

export function loadAnswers(): Answers {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: Answers) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    /* ignore */
  }
}

export function exitPromptShown(): boolean {
  try {
    return sessionStorage.getItem(EXIT_KEY) === "1";
  } catch {
    return true;
  }
}
export function markExitPromptShown() {
  try {
    sessionStorage.setItem(EXIT_KEY, "1");
  } catch {
    /* ignore */
  }
}
