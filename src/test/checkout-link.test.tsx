import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { funnelConfig, getProductHref } from "@/config/funnel";
import { BuyCta } from "@/components/funnel/ui";
import { OfferCard } from "@/components/funnel/OfferCard";
import { ExitPrompt } from "@/components/funnel/ExitPrompt";

const CHECKOUT_URL = "https://pay.hub.la/71OyYqttZWiebUNXMiCZ";

describe("checkout comercial", () => {
  it("mantém o endereço oficial em uma única configuração", () => {
    expect(funnelConfig.productUrl).toBe(CHECKOUT_URL);
    expect(getProductHref()).toBe(CHECKOUT_URL);
  });

  it("aplica o checkout aos diferentes formatos de CTA", () => {
    const { unmount } = render(<BuyCta label="Quero receber" location="test" />);
    expect(screen.getByRole("link", { name: /quero receber/i })).toHaveAttribute(
      "href",
      CHECKOUT_URL,
    );
    unmount();

    const offer = render(<OfferCard />);
    expect(screen.getByRole("link", { name: /desbloquear meu plano completo/i })).toHaveAttribute(
      "href",
      CHECKOUT_URL,
    );
    offer.unmount();

    render(<ExitPrompt onClose={vi.fn()} />);
    expect(screen.getByRole("link", { name: /ver a oferta agora/i })).toHaveAttribute(
      "href",
      CHECKOUT_URL,
    );
  });
});
