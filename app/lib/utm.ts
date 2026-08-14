// Rastreio de origem de campanha para os leads do site.
//
// Sem isto, todo lead do formulário chega no CRM apenas como "site-b2c" e não
// dá pra saber qual campanha, criativo ou público trouxe a pessoa. Com dois
// perfis de campanha rodando (WhatsApp e formulário), isso é o que permite
// comparar qual traz lead que vira proposta, não só qual traz lead barato.
//
// A tabela `leads` do SaaS não tem colunas utm_*, então gravamos no campo
// `tags` (text[]), que o kanban já exibe nos cards. Evita depender de migration
// no banco de outro projeto.

const CHAVE = "aonik_utm";

const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Identificadores de clique das plataformas, úteis quando a UTM se perde. */
const CLIQUE = ["fbclid", "gclid"] as const;

type Origem = Record<string, string>;

/**
 * Guarda a origem do PRIMEIRO acesso da sessão. Depois disso não sobrescreve:
 * se a pessoa chega por um anúncio, navega, sai e volta pelo Google, o crédito
 * continua com o anúncio que realmente a trouxe.
 */
export function capturarOrigem(): void {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(CHAVE)) return;

    const url = new URL(window.location.href);
    const achado: Origem = {};

    for (const p of [...PARAMS, ...CLIQUE]) {
      const v = url.searchParams.get(p);
      if (v) achado[p] = v.slice(0, 120);
    }

    // Sem parâmetro nenhum, registra de onde veio para separar orgânico de direto.
    if (Object.keys(achado).length === 0) {
      const ref = document.referrer;
      if (!ref) achado.entrada = "direto";
      else {
        try {
          const host = new URL(ref).hostname.replace(/^www\./, "");
          if (host !== window.location.hostname.replace(/^www\./, "")) {
            achado.entrada = host;
          } else return; // navegação interna, não é entrada nova
        } catch {
          return;
        }
      }
    }

    sessionStorage.setItem(CHAVE, JSON.stringify(achado));
  } catch {
    // sessionStorage bloqueado (aba anônima, cookies restritos). Sem rastreio,
    // mas o lead continua sendo gravado normalmente.
  }
}

/**
 * Devolve a origem no formato de tags do CRM: ["utm_source:facebook", ...].
 * O kanban já mostra tags no card, então o vendedor vê a campanha sem abrir nada.
 */
export function origemComoTags(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const cru = sessionStorage.getItem(CHAVE);
    if (!cru) return [];
    const dados = JSON.parse(cru) as Origem;
    return Object.entries(dados).map(([k, v]) => `${k}:${v}`);
  } catch {
    return [];
  }
}
