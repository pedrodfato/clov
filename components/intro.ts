// Fora do IntroReveal ("use client"): o layout, que é de servidor, precisa do
// script como texto, e não como referência de componente de cliente.
export const INTRO_CHAVE = "clov-intro";

// A intro roda uma vez por sessão: quem recarrega ou volta não espera 3 s de
// novo. Este script, no topo do <body>, marca o <html> com .sem-intro antes da
// primeira pintura, então o overlay nem aparece (o CSS o esconde).
export const INTRO_VISTA = `try{if(sessionStorage.getItem("${INTRO_CHAVE}"))document.documentElement.classList.add("sem-intro")}catch(e){}`;
