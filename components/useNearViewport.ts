"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adia o que é caro (canvas WebGL) até o elemento chegar perto da viewport.
 * Vários contextos WebGL rodando desde o topo da página custam bateria e
 * travam o scroll. Dispara uma vez só e desliga o observer.
 */
export default function useNearViewport<T extends HTMLElement>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, near] as const;
}
