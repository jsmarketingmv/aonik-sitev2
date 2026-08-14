/**
 * Ponto de conversão no meio da página de produto.
 *
 * As páginas de produto são longas e funcionam como landing de campanha, mas
 * concentravam a conversão só no topo e perto do fim. Entre um e outro passavam
 * as seções que mais geram desejo (roteiro dia a dia, guia, galeria) sem lugar
 * nenhum pra clicar.
 *
 * O texto muda conforme o momento da leitura de propósito. Depois do roteiro o
 * convite natural é sobre datas; depois da tarifa é sobre garantir a vaga.
 * Repetir "Reservar" cinco vezes cansa, encadear microcompromissos converte.
 *
 * Sem animação de entrada de propósito. A primeira versão usava o mesmo
 * `whileInView` do resto da página e a animação ficava travada em 11% de
 * opacidade, deixando o botão praticamente invisível enquanto as seções
 * vizinhas apareciam normalmente. Um ponto de conversão não pode depender de
 * animação para existir: se ela falha, o clique some junto.
 */
export default function CtaInline({
  chamada,
  botao,
  href = "#reservar",
  apoio,
  cores,
}: {
  /** Pergunta ou frase curta que dá contexto ao clique. */
  chamada: string;
  /** Texto do botão. Varie conforme o momento da página. */
  botao: string;
  href?: string;
  /** Linha discreta abaixo, para urgência real (vaga, data). Opcional. */
  apoio?: string;
  cores: {
    fundo: string;
    texto: string;
    acento: string;
    acentoTexto: string;
    suave: string;
  };
}) {
  return (
    <section className="px-6 md:px-10" style={{ background: cores.fundo }}>
      <div
        className="mx-auto flex max-w-[880px] flex-col items-center gap-6 border-t py-14 text-center md:flex-row md:justify-between md:gap-10 md:py-16 md:text-left"
        style={{ borderColor: cores.suave }}
      >
        <div>
          <p
            className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-light leading-snug"
            style={{ color: cores.texto }}
          >
            {chamada}
          </p>
          {apoio && (
            <p
              className="mt-2 text-[12px] uppercase tracking-[0.16em]"
              style={{ color: cores.acento }}
            >
              {apoio}
            </p>
          )}
        </div>

        <a
          href={href}
          className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
          style={{ background: cores.acento, color: cores.acentoTexto }}
        >
          {botao} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
