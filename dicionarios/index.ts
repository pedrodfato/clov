import pt from "./pt";
import en from "./en";
import type { Idioma } from "./idiomas";

// Só no servidor: os componentes de cliente recebem apenas o pedaço que usam.
export const dicionario = (idioma: Idioma) => (idioma === "en" ? en : pt);
