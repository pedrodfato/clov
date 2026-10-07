"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Estado que a timeline do scroll escreve e o shader lê a cada quadro. */
export type EstadoLuz = { progresso: number; centro: [number, number] };

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Explosão no ponto em que os dedos se tocam, na mesma trama de pontos das
// mãos: núcleo que cresce até cobrir a tela, raios girando devagar e um halo
// suave por trás. A intensidade vira o raio de cada ponto; acima de 1 os
// pontos se encostam e a tela fecha numa grade branca.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uCenter;
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uGreen;

  varying vec2 vUv;

  void main() {
    vec2 px = vUv * uResolution;
    float grid = 7.0;
    vec2 cell = floor(px / grid);
    vec2 cellCenter = (cell + 0.5) * grid;

    // Distância normalizada pela altura: raios redondos em qualquer proporção.
    vec2 d = (cellCenter - uCenter * uResolution) / uResolution.y;
    float r = length(d);
    float ang = atan(d.y, d.x);
    float p = uProgress;
    float reach = max(uResolution.x / uResolution.y, 1.0);

    float R = p * p * 1.3 * reach;
    float core = 1.0 - smoothstep(R * 0.5, R + 0.001, r);

    float beam = 0.0;
    beam += 0.55 * pow(abs(sin(ang * 3.0 + uTime * 0.6)), 10.0);
    beam += 0.40 * pow(abs(sin(ang * 5.0 - uTime * 0.4 + 1.3)), 16.0);
    beam += 0.30 * pow(abs(sin(ang * 8.0 + uTime * 0.9 + 2.6)), 22.0);
    float rays = beam * (1.0 - smoothstep(0.0, 0.15 + 1.6 * p, r)) * smoothstep(0.0, 0.2, p);

    float glow = exp(-r / (0.03 + 0.5 * p)) * smoothstep(0.0, 0.05, p);
    float I = clamp(core + rays + glow, 0.0, 1.0);

    vec2 local = (px - cellCenter) / grid;
    float dist = length(local) * 2.0;
    float radius = sqrt(I) * 1.15;
    float aa = fwidth(dist) + 0.05;
    float dotMask = 1.0 - smoothstep(radius - aa, radius + aa, dist);

    // Borda verde da marca, centro branco.
    vec3 dotColor = mix(uGreen, vec3(1.0), smoothstep(0.35, 0.85, I));
    float a = dotMask * smoothstep(0.02, 0.12, I);

    // Halo entre os pontos: sem ele a explosão lê como textura, não como luz.
    float halo = glow * 0.35 + core * 0.25;
    vec3 premult = dotColor * a + vec3(0.8, 1.0, 0.9) * halo * (1.0 - a);
    float alpha = clamp(a + halo * (1.0 - a), 0.0, 1.0);

    gl_FragColor = vec4(premult / max(alpha, 0.001), alpha);
  }
`;

function Luz({ estado }: { estado: EstadoLuz }) {
  const { viewport, size, gl, scene, camera } = useThree();

  // O ShaderMaterial clona os uniforms no construtor: mexemos no do material.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uResolution: { value: new THREE.Vector2(1, 1) },
          uCenter: { value: new THREE.Vector2(0.5, 0.5) },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uGreen: { value: new THREE.Color("#00e87a") },
        },
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    material.uniforms.uResolution.value.set(size.width, size.height);
  }, [material, size]);

  // Prioridade 1 tira o render automático: só desenha enquanto a luz existe.
  // Antes do toque e depois que ela se dissolve, o canvas fica parado.
  useFrame((_, delta) => {
    if (estado.progresso <= 0) return;
    const u = material.uniforms;
    u.uTime.value += delta;
    u.uProgress.value = estado.progresso;
    // uv cresce para cima; a posição no DOM, para baixo.
    u.uCenter.value.set(estado.centro[0], 1 - estado.centro[1]);
    gl.render(scene, camera);
  }, 1);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function HeroLuz({ estado, className = "" }: { estado: EstadoLuz; className?: string }) {
  return (
    <Canvas
      className={className}
      // O R3F põe pointer-events: auto na div do canvas, por cima do
      // pointer-events-none de quem o envolve. Fixa sobre a tela inteira, a luz
      // engolia todos os cliques da página.
      style={{ pointerEvents: "none" }}
      gl={{ alpha: true, antialias: false }}
      // Trama de pontos de 7px: 2x o devicePixelRatio quadruplica o custo numa
      // tela inteira sem mudar o que se vê.
      dpr={1}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <Luz estado={estado} />
    </Canvas>
  );
}
