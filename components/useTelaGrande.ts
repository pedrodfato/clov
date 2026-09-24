"use client";

import { useEffect, useState } from "react";

/**
 * Libera os efeitos que só fazem sentido em tela grande.
 *
 * Dois motivos distintos apontam para o mesmo corte:
 *
 * 1. WebGL. three.js e o R3F somam cerca de 950 KB, e cada contexto custa GPU
 *    contínua. Num aparelho de entrada isso é a diferença entre a página
 *    responder ao toque e travar.
 *
 * 2. Transições em camadas. Elas pressupõem que a seção presa tem a altura da
 *    viewport, porque é essa altura que define o fim do pin. No celular as
 *    seções crescem (projetos vai a 1363px numa tela de 844), o pin dura mais
 *    que a tela, o conteúdo de baixo nunca aparece e sobra uma faixa preta.
 *
 * Tudo que depende disto é decoração: sem, a página rola normalmente.
 */
export default function useTelaGrande() {
  const [grande, setGrande] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const atualizar = () => setGrande(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  return grande;
}
