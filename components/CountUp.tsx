"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  value: number;
  suffix?: string;
  className?: string;
};

export default function CountUp({ value, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // O HTML já vem com o número final (serve sem JS); zera antes do gatilho
    // pra não piscar o valor pronto quando a contagem começa.
    el.textContent = `0${suffix}`;

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {`${value}${suffix}`}
    </span>
  );
}
