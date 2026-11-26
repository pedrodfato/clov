import type { Metadata } from "next"
import Parede from "@/components/projetos/Parede"
import { dicionario } from "@/dicionarios"
import { PAGINAS, caminho, idiomaDe } from "@/dicionarios/idiomas"

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const idioma = idiomaDe((await params).lang)
  const { meta } = dicionario(idioma).paginaProjetos
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: caminho(idioma, "projetos"),
      languages: { "pt-BR": PAGINAS.projetos.pt, en: PAGINAS.projetos.en, "x-default": PAGINAS.projetos.pt },
    },
  }
}

// Sem rodapé: a página é a parede, do tamanho da tela. O header leva ao resto.
export default async function PaginaProjetos({ params }: PageProps<"/[lang]/projetos">) {
  const d = dicionario(idiomaDe((await params).lang))
  return (
    <main>
      <Parede t={d.paginaProjetos} p={d.projetos} />
    </main>
  )
}
