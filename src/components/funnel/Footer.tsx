import { funnelConfig, isFilled } from "@/config/funnel";

export function Footer() {
  const links = [
    { label: "Suporte", href: funnelConfig.supportUrl },
    { label: "Política de privacidade", href: funnelConfig.privacyUrl },
    { label: "Termos de uso", href: funnelConfig.termsUrl },
  ].filter((l) => isFilled(l.href));
  return (
    <footer className="border-t border-border bg-cream px-5 py-10">
      <div className="mx-auto max-w-[1120px] text-sm text-muted-foreground">
        <p className="max-w-[80ch]">
          O Cardápio Inteligente oferece sugestões gerais de planejamento culinário. Não substitui orientação
          individual de nutricionista ou profissional de saúde. Necessidades alimentares específicas, alergias e
          restrições exigem adaptações apropriadas. O material não garante emagrecimento ou qualquer resultado
          corporal.
        </p>
        {links.length > 0 && (
          <nav aria-label="Links legais" className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline">
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <p className="mt-5">© {new Date().getFullYear()} {funnelConfig.productName}</p>
      </div>
    </footer>
  );
}
