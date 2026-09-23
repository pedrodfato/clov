"use client";

import { useEffect, useState } from "react";

/**
 * Libera os efeitos WebGL só em tela grande.
 *
 * three.js e o R3F somam cerca de 950 KB, e cada contexto custa GPU contínua.
 * Num aparelho de entrada isso é a diferença entre a página responder ao toque
 * e travar. Os três efeitos que dependem disso (as mãos do hero, o halftone
 * das capas de projeto e os raios dos depoimentos) são decorativos: no celular
 * a página funciona igual sem eles, e as capas ainda mostram o site de verdade.
 */
export default function useShaderPermitido() {
  const [permitido, setPermitido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const atualizar = () => setPermitido(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  return permitido;
}
