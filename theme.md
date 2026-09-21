# Clov — Design System

## 1. Auditoria do estado atual

**Stack:** Next.js 16 (App Router) + Tailwind v4 (config via `@theme` em `app/globals.css`, sem `tailwind.config.js`). Sem libs de UI externas — só `lucide-react` para ícones.

**O que já existia e funcionava bem (mantido/formalizado abaixo):**
- Verde `#00E87A` já usado como acento em quase todas as seções — vira a cor de marca oficial.
- Um "eyebrow badge" (chip com borda em gradiente + ponto + texto uppercase) já se repete em Metodologia e Soluções — é um motivo de marca real, não genérico, então documentamos e mantemos.
- `hero1.png` já é uma imagem em halftone/duotone verde (mãos robô + humana) — o motivo "halftone" pedido já existe como asset, só faltava tratamento consistente ao redor dela (glow + grão).
- Fonte de corpo em `font-mono` (stack padrão do sistema) contrastando com a sans PP Mori nos títulos — um pareamento tipográfico deliberado e já distinto, mantido.

**Problemas encontrados (corrigidos neste PR ou sinalizados para as seções antigas):**
1. **Fundo dependia do tema do SO** (`@media (prefers-color-scheme: dark)`), mas todas as seções já assumem fundo escuro fixo (texto branco hardcoded). Em SO no modo claro o site quebrava (texto branco sobre fundo branco). Corrigido: fundo escuro agora é fixo em `:root`, não condicional.
2. **`font-bold` (700) é usado em várias seções, mas só carregamos os pesos 300/400/600 da PP Mori** (`app/layout.tsx`). Sem um arquivo de peso 700, o navegador sintetiza (embold fake) o texto — perde nitidez. *Aplicado no que foi reconstruído agora (nav, hero, botões); Metodologia/Soluções/Contato ainda usam `font-bold` e deveriam migrar para `font-semibold` numa próxida passada.*
3. `text-muted` era usado no Hero mas nunca foi definido — não fazia nada. Corrigido: token `--color-muted` criado e a classe agora funciona de verdade.
4. Gutter horizontal inconsistente entre seções (`px-40` fixo na Metodologia/Soluções — não responsivo e estoura em telas pequenas; `px-4 sm:px-6 lg:px-8` no Header). Definimos um gutter único abaixo; recomenda-se migrar as seções antigas quando forem tocadas de novo.
5. Cores verdes "soltas" repetidas como hex literal em vários arquivos (`#00E87A`, `#00db71`, `#0B4C11`, `#061910`, `#11542e`, `#5BB421`) sem nomes — formalizadas em tokens abaixo.

## 2. Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-surface` | `#0a0a0a` | Fundo base de toda a página |
| `--color-surface-elevated` | `#101512` | Nav com blur ao rolar, cards, superfícies "levantadas" |
| `--color-ink` | `#fafafa` | Texto primário (headlines) |
| `--color-muted` | `#9aa39d` | Texto secundário sólido (equivalente a white/55 sobre `#0a0a0a`) |
| `--color-brand` | `#00E87A` | Verde primário — CTAs, destaques, ícones ativos |
| `--color-brand-strong` | `#00ed9e` | Verde de hover/glow mais claro (mesmo tom do ícone da logo) |
| `--color-brand-soft` | `#0B4C11` | Meio-tom para gradientes/glow |
| `--color-brand-deep` | `#061910` | Sombra do glow, quase preto-esverdeado |
| `--color-brand-line` | `#11542e` | Linhas divisórias e bordas sutis (sempre com opacidade, ex. `/25`) |

Texto secundário continua podendo usar a escala `white/80 → white/70 → white/50 → white/40 → white/30` já estabelecida (do mais forte pro mais fraco); `text-muted` é a alternativa em cor sólida quando opacidade não é desejada (ex. sobre imagem).

Todos os tokens de cor viram utilities Tailwind automaticamente (`bg-brand`, `text-brand-strong`, `border-brand-line/25`, `bg-surface-elevated`, etc.) via `@theme inline` em `globals.css`.

## 3. Tipografia

Duas famílias, papéis bem separados — não adicionar uma terceira:
- **PP Mori** (`font-sans`, pesos 300/400/600) → headlines, labels de UI, botões.
- **Mono do sistema** (`font-mono`) → parágrafos de corpo, legendas, texto de eyebrow. Dá um ar técnico/"feito à mão" que já era a assinatura do site.

| Papel | Tamanho (mobile → desktop) | Peso | Tracking/leading |
|---|---|---|---|
| Display (hero h1) | `40px → 68px` | 600 (semibold) | `leading-[1.08]`, `tracking-tight` |
| H2 (título de seção) | `28px → 36px` | 600 | `leading-tight` |
| Subtítulo/lede | `16px → 18px`, mono | 400 | `leading-relaxed`, max `~60ch` |
| Corpo | `15px`, mono | 400 | `leading-relaxed`, `text-muted`/`white-50` |
| Label/eyebrow | `12–13px`, mono, uppercase | 400–600 | `tracking-widest` |
| Botão/CTA | `15px`, sans | 600 | `leading-none` |

> Nota: usar sempre `font-semibold`, nunca `font-bold`, até existir um peso 700 real da PP Mori — evita bold sintético borrado.

## 4. Espaçamento

- **Gutter horizontal padrão** (mobile-first): `px-6 sm:px-10 lg:px-24`. Substitui o `px-40` fixo antigo.
- **Ritmo vertical entre seções**: `py-24 md:py-32` (seções de conteúdo) — seções "cheias de tela" (hero, banda final de CTA) usam `min-h-screen` em vez de padding fixo.
- **Container de conteúdo**: `max-w-7xl mx-auto` quando o conteúdo precisa de limite de largura (nav, blocos de texto); seções com glow full-bleed (CTA final) continuam edge-to-edge.
- **Gap padrão entre elementos relacionados**: `gap-3`/`gap-4` (itens próximos, ex. texto+ícone), `gap-8`/`gap-10` (blocos dentro de uma seção), `gap-16`+ (blocos irmãos de layout).

## 5. Botão/CTA padrão

Dois estilos, reaproveitados em `components/StartChallengeButton.tsx` (primário) e `components/FreeTrialButton.tsx` (secundário) — ambos agora recebem `children`/`href` para serem reusados no nav, no hero e em qualquer CTA futura, em vez de duplicar markup.

- **Primário**: pill branca, texto preto, `font-semibold`, ícone circular verde (`bg-brand`) com seta que rotaciona 45° no hover.
- **Secundário/ghost**: pill com borda `border-white/15` + `bg-white/5`, texto branco, `hover:bg-white/10`. Quando tem ícone, o círculo vai de `bg-white/10` pra `bg-brand` no hover (já usado no banner final).
- Ambos: `rounded-full`, altura ~44px, `text-[15px]`.

## 6. Motivo visual recorrente: "glow + halftone + hairline"

Em vez de repetir a mesma seção, cada parte da página reaparece com **a mesma linguagem visual em dose diferente**:

1. **Glow verde radial** atrás de um elemento-chave por seção (nunca centralizado do mesmo jeito duas vezes — no hero fica atrás da imagem, no CTA final vira um "amanhecer" no topo, numa seção futura pode ficar atrás só de um número/stat).
2. **Textura de grão/halftone** (`.bg-grain`, nova utility CSS em `globals.css` — um padrão de pontos via `radial-gradient` repetido, sem imagem externa) sobreposta com `mix-blend-overlay` em baixa opacidade sobre glows e imagens. Conecta o visual gerado por CSS com a foto halftone que já existe (`hero1.png`).
3. **Linha divisória fina** (`border-brand-line/25`) marcando transição de seção em vez de sombra/cartão — já usado em Metodologia/Soluções, agora formalizado como padrão.

Isso dá identidade sem clichê de LP genérica: nada de gradiente roxo/azul, nada de glassmorphism, nada de ícone de estoque.

## 7. Arquivos alterados nesta etapa

- `app/globals.css` — tokens de cor fixos (fundo sempre escuro), utility `.bg-grain`, mantém `.animate-breathe`.
- `components/Header.tsx` — nav fixo reconstruído (logo esquerda, links centro, CTA pill direita).
- `components/home/hero.tsx` — hero reconstruído com o sistema acima.
- `components/StartChallengeButton.tsx` / `components/FreeTrialButton.tsx` — generalizados para aceitar `href`/`children`, cores migradas para os tokens.
