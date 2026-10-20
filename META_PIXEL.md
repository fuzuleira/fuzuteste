# Meta Pixel — Cardápio Inteligente

ID público configurado em `src/config/funnel.ts`: `1773375323917983`.

## Eventos do site

| Evento          | Momento                                                |
| --------------- | ------------------------------------------------------ |
| PageView        | Uma vez por carregamento do documento                  |
| QuizStart       | Clique para começar                                    |
| QuizStepView    | Primeira visita a cada pergunta neste documento        |
| QuizAnswer      | Primeira resposta a cada pergunta neste documento      |
| QuizInsightView | Orientação intermediária exibida                       |
| QuizComplete    | Sete perguntas respondidas                             |
| QuizResultView  | Resultado exibido                                      |
| ViewContent     | Pelo menos 30% da seção de oferta aparece na tela      |
| CheckoutClick   | Clique no link de compra; proteção contra duplo clique |

PageView e ViewContent são eventos padrão. Os demais são personalizados.
Não existe cadastro no quiz: não disparar Lead ou CompleteRegistration.
Não disparar Purchase por concluir o quiz, abrir o checkout ou gerar Pix.
O site não dispara InitiateCheckout para não duplicar o evento da Hubla.
As etapas do quiz não geram novos PageViews.

Não são enviados perfis ou respostas. São permitidos somente número de etapa,
índice da orientação e identificador genérico do produto. O SDK ainda envia seus
metadados normais de navegação. Correspondência avançada não é configurada.

## Configuração necessária na Hubla

1. Abra o produto no painel da Hubla.
2. Acesse **Pixel de Rastreamento** (ou Configurações → Pixel).
3. Configure o mesmo ID: **1773375323917983**.
4. Se o painel solicitar token, insira diretamente no painel da Hubla. Nunca
   coloque esse token no código, GitHub ou frontend.
5. Mantenha **InitiateCheckout** ao começar a preencher os dados.
6. Mantenha **Purchase** somente para vendas aprovadas/pagamentos confirmados.
7. Confira moeda BRL e o valor real da transação. Não fixe o valor no site.
8. Use o teste da Hubla, inclusive a opção de começar pela landing page, para
   validar chegada de parâmetros e a sequência dos eventos.

Referências:

- https://help.hub.la/hc/pt-br/facebook-pixel-e-google-tag-manager
- https://help.hub.la/hc/pt-br/como-customizar-

## Publicação e validação

Antes de publicar, execute testes, TypeScript, lint e build.
Publique a alteração pelo fluxo normal GitHub/Lovable.
O Pixel fica desativado em localhost e 127.0.0.1 para não contaminar dados reais.

No domínio publicado, abra o Gerenciador de Eventos da Meta → seu Pixel →
Testar eventos. Percorra o quiz, role até a oferta e avance ao checkout.
Use também a extensão oficial Meta Pixel Helper, se disponível.

Confira:

- um PageView por abertura, sem repetição por pergunta;
- nenhuma duplicação por voltar às etapas no mesmo documento;
- ViewContent apenas ao visualizar a oferta;
- CheckoutClick no botão;
- InitiateCheckout no momento configurado na Hubla;
- Purchase apenas após confirmação de pagamento na Hubla;
- nenhuma instalação adicional do mesmo Pixel via GTM ou ferramenta visual.

UTMs e fbclid são preservados na sessão e repassados ao link do checkout.
Nenhuma resposta do quiz acompanha esse link.
Recarregar o documento inicia outra medição de visita; não é deduplicação de
compras. A deduplicação entre navegador e servidor é responsabilidade da
integração da Hubla.

Os testes locais usam o SDK simulado: comprovam o comportamento do código,
mas não comprovam recebimento no Gerenciador de Eventos. Essa confirmação
depende do domínio publicado e da configuração da conta/checkout.
