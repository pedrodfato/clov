"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Origin =
  | "top-left" | "top-center" | "top-right"
  | "left" | "center" | "right"
  | "bottom-left" | "bottom-center" | "bottom-right";

// Canto de onde os feixes saem, em coordenadas uv.
const ORIGINS: Record<Origin, [number, number]> = {
  "top-left": [0, 1], "top-center": [0.5, 1], "top-right": [1, 1],
  left: [0, 0.5], center: [0.5, 0.5], right: [1, 0.5],
  "bottom-left": [0, 0], "bottom-center": [0.5, 0], "bottom-right": [1, 0],
};

type Props = {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uOrigin;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpread;
  uniform float uTilt;
  uniform float uSaturation;
  uniform float uBlend;
  uniform float uFalloff;
  uniform float uOpacity;

  varying vec2 vUv;

  vec3 applySaturation(vec3 color, float amount) {
    float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return mix(vec3(luma), color, amount);
  }

  void main() {
    // Corrige o aspecto pra os feixes não esticarem em tela larga.
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2((vUv.x - uOrigin.x) * aspect, vUv.y - uOrigin.y);

    float angle = atan(p.y, p.x) + radians(uTilt);
    float dist = length(p);
    float a = angle / max(uSpread, 0.01);

    // Três frequências sobrepostas: os feixes ficam irregulares em vez de
    // virar um leque de listras iguais. O expoente afina cada um.
    float beam = 0.0;
    beam += 0.55 * pow(abs(sin(a * 4.0 + uTime * 0.7)), 6.0);
    beam += 0.32 * pow(abs(sin(a * 7.0 - uTime * 0.5 + 1.3)), 9.0);
    beam += 0.22 * pow(abs(sin(a * 11.0 + uTime * 0.95 + 2.6)), 12.0);

    beam *= exp(-dist * uFalloff * 1.6) * uIntensity;

    vec3 color = mix(uColor1, uColor2, clamp(uBlend * (0.35 + 0.65 * dist), 0.0, 1.0));
    color = applySaturation(color, uSaturation);

    gl_FragColor = vec4(color, clamp(beam, 0.0, 1.0) * uOpacity);
  }
`;

function Rays(props: Required<Omit<Props, "className">>) {
  const { viewport, size } = useThree();
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // O ShaderMaterial clona os uniforms no construtor. Criando o material aqui
  // e mexendo em material.uniforms, mexemos no objeto que de fato é renderizado
  // — passar `uniforms` como prop do JSX deixava a mutação numa cópia órfã.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        // Aditivo: os feixes somam luz no fundo escuro em vez de cobrir.
        blending: THREE.AdditiveBlending,
        uniforms: {
          uResolution: { value: new THREE.Vector2(1, 1) },
          uOrigin: { value: new THREE.Vector2(1, 1) },
          uColor1: { value: new THREE.Color("#00e87a") },
          uColor2: { value: new THREE.Color("#00ed9e") },
          uTime: { value: 0 },
          uIntensity: { value: 1 },
          uSpread: { value: 1 },
          uTilt: { value: 0 },
          uSaturation: { value: 1 },
          uBlend: { value: 0.5 },
          uFalloff: { value: 1 },
          uOpacity: { value: 1 },
        },
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    const u = material.uniforms;
    const [x, y] = ORIGINS[props.origin] ?? ORIGINS["top-right"];
    u.uOrigin.value.set(x, y);
    u.uColor1.value.set(props.rayColor1);
    u.uColor2.value.set(props.rayColor2);
    u.uIntensity.value = props.intensity;
    u.uSpread.value = props.spread;
    u.uTilt.value = props.tilt;
    u.uSaturation.value = props.saturation;
    u.uBlend.value = props.blend;
    u.uFalloff.value = props.falloff;
    u.uOpacity.value = props.opacity;
  }, [material, props]);

  useEffect(() => {
    material.uniforms.uResolution.value.set(size.width, size.height);
  }, [material, size]);

  useFrame((_, delta) => {
    if (!reduced.current) material.uniforms.uTime.value += delta * props.speed;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function SideRays({
  speed = 1,
  rayColor1 = "#00e87a",
  rayColor2 = "#00ed9e",
  intensity = 1,
  spread = 1,
  origin = "top-right",
  tilt = 0,
  saturation = 1,
  blend = 0.5,
  falloff = 1.5,
  opacity = 1,
  className = "",
}: Props) {
  return (
    <Canvas
      className={className}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <Rays
        speed={speed}
        rayColor1={rayColor1}
        rayColor2={rayColor2}
        intensity={intensity}
        spread={spread}
        origin={origin}
        tilt={tilt}
        saturation={saturation}
        blend={blend}
        falloff={falloff}
        opacity={opacity}
      />
    </Canvas>
  );
}
