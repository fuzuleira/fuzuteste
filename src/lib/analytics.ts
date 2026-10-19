/**
 * Camada central de analytics.
 *
 * PONTO DE INTEGRAÇÃO: conecte Meta Pixel, Google Analytics etc. dentro de `track`.
 * Exemplo:
 *   window.fbq?.("trackCustom", name, props);
 *   window.gtag?.("event", name, props);
 *
 * Nunca envie respostas do quiz, dados de saúde ou dados pessoais. Envie apenas
 * identificadores neutros (etapa, perfil, seção, rótulo do CTA).
 */
export type FunnelEvent =
  | "quiz_view"
  | "quiz_start"
  | "quiz_step_view"
  | "quiz_answer"
  | "quiz_insight_view"
  | "quiz_complete"
  | "quiz_result_view"
  | "sales_section_view"
  | "offer_view"
  | "cta_click"
  | "faq_open"
  | "exit_prompt_view"
  | "exit_prompt_action"
  | "checkout_return";

type Props = Record<string, string | number | boolean>;

export function track(name: FunnelEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  if (import.meta.env.DEV) console.info("[analytics]", name, props);
  // Integrações reais aqui.
}
