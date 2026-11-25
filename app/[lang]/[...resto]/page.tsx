import { notFound } from "next/navigation"

// Endereço que não existe: sem esta rota o 404 sairia do layout raiz, sem o
// [lang], e portanto sem saber em que idioma responder.
export default function Resto() {
  notFound()
}
