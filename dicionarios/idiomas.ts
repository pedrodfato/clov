// Separado dos dicionários: o proxy e o botão de idioma (cliente) importam
// daqui, e não devem carregar o texto do site inteiro junto.
export const IDIOMAS = ["pt", "en"] as const;
export type Idioma = (typeof IDIOMAS)[number];

// Guarda a escolha feita no botão do header. Sem ele, o proxy decide pelo
// idioma do navegador e, se nenhum dos dois aparecer, pelo país.
export const COOKIE_IDIOMA = "idioma";

export const ehIdioma = (v: string): v is Idioma => (IDIOMAS as readonly string[]).includes(v);

// O [lang] da rota: o proxy só entrega pt ou en, e qualquer outro cai no português.
export const idiomaDe = (lang: string): Idioma => (ehIdioma(lang) ? lang : "pt");

// Português fica na raiz, que é o endereço que o Google já conhece.
export const caminho = (idioma: Idioma) => (idioma === "en" ? "/en" : "/");

// Países onde o português é a língua do dia a dia.
const LUSOFONOS = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);

export function idiomaPreferido(cookie: string | undefined, aceita: string | null, pais: string | null): Idioma {
  // 1. A escolha feita no botão do header.
  if (cookie && ehIdioma(cookie)) return cookie;

  // Sem Accept-Language é robô, inclusive o Google, que rastreia dos EUA:
  // fica no português da raiz, senão ela nunca seria indexada.
  if (!aceita) return "pt";

  // 2. O idioma do navegador, na ordem de preferência (pt-BR, en-AU...).
  const preferidos = aceita
    .split(",")
    .map((parte) => {
      const [tag, q] = parte.trim().toLowerCase().split(";q=");
      return { tag, q: q === undefined ? 1 : Number(q) };
    })
    .filter((p) => p.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { tag } of preferidos) {
    if (tag.startsWith("pt")) return "pt";
    if (tag.startsWith("en")) return "en";
  }

  // 3. Nenhum dos dois no navegador: decide a região, pelo país do IP.
  return pais && LUSOFONOS.has(pais.toUpperCase()) ? "pt" : "en";
}
