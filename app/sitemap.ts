import type { MetadataRoute } from "next";
import { SITE } from "@/components/contato";
import { PAGINAS } from "@/dicionarios/idiomas";

// As seções da home são âncoras (#faq...), que o Google não indexa separadas.
// Toda página de PAGINAS entra aqui, nos dois idiomas.
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(PAGINAS).flatMap(([pagina, { pt, en }]) => {
    const idiomas = { "pt-BR": SITE + (pt === "/" ? "" : pt), en: SITE + en };
    return Object.values(idiomas).map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: pagina === "home" ? 1 : 0.8,
      alternates: { languages: idiomas },
    }));
  });
}
