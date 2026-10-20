import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { captureCampaign, getCheckoutHref, initMetaPixel, track } from "@/lib/analytics";

describe("Meta Pixel", () => {
  const fbq = vi.fn();
  beforeEach(() => {
    sessionStorage.clear();
    fbq.mockReset();
    vi.stubGlobal("window", { location: new URL("https://example.com/"), fbq });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    document.getElementById("ci-meta-pixel")?.remove();
  });

  it("initializes and sends PageView only once, not once per quiz answer", () => {
    track("quiz_view");
    track("quiz_view");
    track("quiz_step_view", { step: 1 });
    expect(fbq.mock.calls.filter((c) => c[0] === "init")).toHaveLength(1);
    expect(fbq.mock.calls.filter((c) => c[2] === "PageView")).toHaveLength(1);
  });

  it("deduplicates revisited steps and excludes answers, profile and free text", () => {
    track("quiz_step_view", { step: 2, profile: "sensitive", answer: "private" });
    track("quiz_step_view", { step: 2 });
    track("quiz_step_view", { step: 3 });
    const calls = fbq.mock.calls.filter((c) => c[2] === "QuizStepView");
    expect(calls).toHaveLength(2);
    expect(calls[0]?.[3]).toEqual({ step: 2 });
    expect(JSON.stringify(fbq.mock.calls)).not.toMatch(/sensitive|private/);
  });

  it("uses ViewContent for the visible offer and custom CheckoutClick, never a false Purchase or Lead", () => {
    track("quiz_complete", { profile: "F" });
    track("quiz_result_view");
    track("offer_view");
    track("offer_view");
    track("cta_click", { label: "sensitive label" });
    track("cta_click");
    expect(fbq.mock.calls.filter((c) => c[2] === "ViewContent")).toHaveLength(1);
    expect(fbq.mock.calls.filter((c) => c[2] === "CheckoutClick")).toHaveLength(1);
    expect(
      fbq.mock.calls.some((c) => ["Purchase", "Lead", "InitiateCheckout"].includes(String(c[2]))),
    ).toBe(false);
  });

  it("disables real tracking on localhost", () => {
    vi.stubGlobal("window", { location: new URL("http://localhost:8081/"), fbq });
    track("quiz_view");
    expect(fbq).not.toHaveBeenCalled();
  });

  it("creates one async SDK with a queue when no existing pixel is installed", () => {
    vi.stubGlobal("window", { location: new URL("https://example.com/") });
    initMetaPixel();
    initMetaPixel();
    expect(document.querySelectorAll("#ci-meta-pixel")).toHaveLength(1);
    expect((document.getElementById("ci-meta-pixel") as HTMLScriptElement).async).toBe(true);
    expect(window.fbq?.queue.some((c) => c[2] === "PageView")).toBe(true);
  });

  it("retains campaign attribution across quiz navigation and excludes unknown parameters", () => {
    vi.stubGlobal("window", {
      location: new URL(
        "https://example.com/?utm_source=instagram&utm_campaign=teste&fbclid=test-click&answer=private",
      ),
      fbq,
    });
    captureCampaign();
    vi.stubGlobal("window", { location: new URL("https://example.com/?etapa=p7"), fbq });
    const url = new URL(getCheckoutHref());
    expect(url.origin + url.pathname).toBe("https://pay.hub.la/71OyYqttZWiebUNXMiCZ");
    expect(url.searchParams.get("utm_source")).toBe("instagram");
    expect(url.searchParams.get("fbclid")).toBe("test-click");
    expect(url.searchParams.has("answer")).toBe(false);
    expect(url.searchParams.has("etapa")).toBe(false);
  });

  it("keeps checkout working if stored attribution is corrupt", () => {
    sessionStorage.setItem("ci_campaign_v1", "invalid json");
    expect(getCheckoutHref()).toBe("https://pay.hub.la/71OyYqttZWiebUNXMiCZ");
  });
});
