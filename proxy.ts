import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_IDIOMA, PAGINAS, idiomaPreferido, traduz } from "@/dicionarios/idiomas";

// Português mora na raiz (reescrita para /pt por dentro) e inglês em /en.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // /en/projects é servido pela pasta em português; o endereço com a pasta
  // duplicaria a página para o Google.
  if (pathname === PAGINAS.projetos.en) {
    url.pathname = "/en/projetos";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/en/projetos") {
    url.pathname = PAGINAS.projetos.en;
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  const resto = pathname === "/" ? "" : pathname;

  // /pt duplicaria a raiz para o Google.
  if (pathname === "/pt" || pathname.startsWith("/pt/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const idioma = idiomaPreferido(
    req.cookies.get(COOKIE_IDIOMA)?.value,
    req.headers.get("accept-language"),
    req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry"),
  );
  if (idioma === "en") {
    url.pathname = traduz(pathname, "en") ?? `/en${resto}`;
    return NextResponse.redirect(url);
  }

  url.pathname = `/pt${resto}`;
  return NextResponse.rewrite(url);
}

// Fora: arquivos internos do Next e qualquer caminho com extensão (imagens,
// fontes, robots.txt, sitemap.xml).
export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};
