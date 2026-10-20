/**
 * Configuração comercial central. Edite apenas aqui.
 * Valores vazios ou entre colchetes ("[...]") são tratados como não preenchidos
 * e o elemento correspondente fica oculto na interface.
 */
export const funnelConfig = {
  productName: "Cardápio Inteligente para 30 Dias",
  price: "R$ 19,90",
  previousPrice: "R$ 49,90",
  showPreviousPrice: false,
  productUrl: "https://pay.hub.la/71OyYqttZWiebUNXMiCZ",
  supportUrl: "[INSERIR_SUPORTE]",
  privacyUrl: "[INSERIR_POLITICA_DE_PRIVACIDADE]",
  termsUrl: "[INSERIR_TERMOS]",
  deliveryMethod: "[EXPLICAR_COMO_O_PDF_E_ENTREGUE]",
  guaranteeText: "[INSERIR_GARANTIA_REAL_OU_DEIXAR_VAZIO]",
  offerEndDate: "",
  /** Imagem do mockup do produto (URL ou caminho em /public). Vazio = capa ilustrada. */
  mockupImageUrl: "",
  /** URL absoluta do site publicado, usada como canonical. Vazio = omitir. */
  canonicalUrl: "",
  /** Caminho do favicon em /public. */
  faviconUrl: "/favicon.ico",
};

/** true quando o valor é real (não vazio e não placeholder). */
export function isFilled(value: string | undefined | null): value is string {
  if (!value) return false;
  const v = value.trim();
  return v.length > 0 && !(v.startsWith("[") && v.endsWith("]"));
}

/** Link de compra. Se ainda não configurado, rola até a oferta na própria página. */
export function getProductHref(): string {
  return isFilled(funnelConfig.productUrl) ? funnelConfig.productUrl : "#oferta";
}
