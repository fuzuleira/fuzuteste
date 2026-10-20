import { funnelConfig, getProductHref } from "@/config/funnel";
/**
 * Camada central de analytics.
 *
 * Meta Pixel assíncrono com parâmetros explicitamente permitidos.
 * Nunca encaminhar respostas, perfis, rótulos livres ou dados pessoais.
 * InitiateCheckout e Purchase pertencem à integração do checkout Hubla.
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
  if (name === "quiz_view") captureCampaign();
  if (import.meta.env.DEV) console.info("[analytics]", name);
  try {
    const state = initMetaPixel();
    if (!state || !window.fbq) return;
    const event = name === "offer_view" ? "ViewContent" : customEvents[name];
    if (!event) return;
    const step =
      typeof props["step"] === "number" && props["step"] >= 1 && props["step"] <= 7
        ? props["step"]
        : undefined;
    const index =
      typeof props["index"] === "number" && props["index"] >= 1 && props["index"] <= 2
        ? props["index"]
        : undefined;
    const key = `${name}:${step ?? index ?? ""}`;
    if (name === "cta_click") {
      if (Date.now() - state.lastClick < 1500) return;
      state.lastClick = Date.now();
    } else {
      if (state.seen.has(key)) return;
      state.seen.add(key);
    }
    const params: Record<string, string | number | string[]> = {};
    if (step !== undefined) params["step"] = step;
    if (index !== undefined) params["index"] = index;
    if (name === "offer_view" || name === "cta_click") {
      params["content_ids"] = ["cardapio_30_dias"];
      params["content_type"] = "product";
    }
    window.fbq(
      name === "offer_view" ? "trackSingle" : "trackSingleCustom",
      state.id,
      event,
      params,
    );
  } catch {
    /* Tracking must never interrupt the quiz or checkout. */
  }
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: Fbq;
  loaded: boolean;
  version: string;
};
type PixelState = { id: string; seen: Set<string>; lastClick: number };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    __ciPixel?: PixelState;
  }
}

const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
const campaignStorage = "ci_campaign_v1";

/** Capture before the router replaces search params. Never include quiz responses. */
export function captureCampaign() {
  if (typeof window === "undefined") return;
  try {
    const search = new URLSearchParams(window.location.search);
    const campaign: Record<string, string> = {};
    for (const key of campaignKeys) {
      const value = search.get(key);
      if (value && value.length <= 500) campaign[key] = value;
    }
    if (Object.keys(campaign).length)
      sessionStorage.setItem(campaignStorage, JSON.stringify(campaign));
  } catch {
    /* Storage can be unavailable. */
  }
}

export function getCheckoutHref() {
  const href = getProductHref();
  if (typeof window === "undefined" || href.startsWith("#")) return href;
  try {
    captureCampaign();
    const campaign: unknown = JSON.parse(sessionStorage.getItem(campaignStorage) ?? "{}");
    const url = new URL(href);
    if (!campaign || typeof campaign !== "object") return href;
    for (const key of campaignKeys) {
      const value = (campaign as Record<string, unknown>)[key];
      if (typeof value === "string" && value.length <= 500 && !url.searchParams.has(key))
        url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return href;
  }
}

/** One async SDK per document. Local tests do not pollute the real pixel. */
export function initMetaPixel() {
  if (typeof window === "undefined") return null;
  const id = funnelConfig.metaPixelId.trim();
  if (
    !/^\d{10,20}$/.test(id) ||
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
  )
    return null;
  if (window.__ciPixel) return window.__ciPixel;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq ??= fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.id = "ci-meta-pixel";
    document.head.appendChild(script);
  }
  // No automatic matching or inferred DOM events. Only explicitly selected events.
  window.fbq("set", "autoConfig", false, id);
  window.fbq("init", id);
  const state = { id, seen: new Set<string>(), lastClick: -Infinity };
  window.__ciPixel = state;
  window.fbq("trackSingle", id, "PageView");
  return state;
}

const customEvents: Partial<Record<FunnelEvent, string>> = {
  quiz_start: "QuizStart",
  quiz_step_view: "QuizStepView",
  quiz_answer: "QuizAnswer",
  quiz_insight_view: "QuizInsightView",
  quiz_complete: "QuizComplete",
  quiz_result_view: "QuizResultView",
  cta_click: "CheckoutClick",
  checkout_return: "CheckoutReturn",
};
