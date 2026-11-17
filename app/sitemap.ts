import type { MetadataRoute } from "next";
import { SITE } from "@/components/contato";

// O site é uma página só: as seções são âncoras (#projetos, #faq...), que o
// Google não indexa separadas. Página nova entra aqui.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
