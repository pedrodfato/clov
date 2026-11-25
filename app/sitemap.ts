import type { MetadataRoute } from "next";
import { SITE } from "@/components/contato";

// O site é uma página só: as seções são âncoras (#projetos, #faq...), que o
// Google não indexa separadas. Página nova entra aqui, nos dois idiomas.
const idiomas = { "pt-BR": SITE, en: `${SITE}/en` };

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(idiomas).map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: idiomas },
  }));
}
