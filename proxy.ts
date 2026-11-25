import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_IDIOMA, idiomaPreferido } from "@/dicionarios/idiomas";

// Português mora na raiz (reescrita para /pt por dentro) e inglês em /en.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  const url = req.nextUrl.clone();
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
    url.pathname = `/en${resto}`;
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
