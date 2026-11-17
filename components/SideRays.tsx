"use client";

import { useEffect, useRef } from "react";

type OriginName =
  | "top-left" | "top-center" | "top-right"
  | "left" | "center" | "right"
  | "bottom-left" | "bottom-center" | "bottom-right";

/** Nome de um canto, ou [x, y] em uv. Valores fora de 0..1 jogam a origem
 *  pra fora do quadro: aí só se vê a faixa já aberta, sem o vértice. */
type Origin = OriginName | [number, number];

// Canto de onde os feixes saem, em coordenadas uv.
const ORIGINS: Record<OriginName, [number, number]> = {
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

// Um triângulo que cobre a tela inteira: o uv sai da própria posição.
const vertexShader = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
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

// Hex em sRGB para linear: a versão em three.js convertia as cores assim, e
// sem isso os feixes sairiam mais claros do que eram.
function linear(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [16, 8, 0].map((s) => {
    const c = ((n >> s) & 255) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
}

// WebGL direto, sem three.js: é um shader num triângulo só, e a biblioteca
// pesava ~880 KB no primeiro carregamento do celular.
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ox, oy] = Array.isArray(origin) ? origin : ORIGINS[origin] ?? ORIGINS["top-right"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: false });
    if (!canvas || !gl) return;

    const compila = (tipo: number, fonte: string) => {
      const s = gl.createShader(tipo)!;
      gl.shaderSource(s, fonte);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    const vs = compila(gl.VERTEX_SHADER, vertexShader);
    const fs = compila(gl.FRAGMENT_SHADER, fragmentShader);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // Aditivo: os feixes somam luz no fundo escuro em vez de cobrir.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    const u = (nome: string) => gl.getUniformLocation(prog, nome);
    gl.uniform2f(u("uOrigin"), ox, oy);
    gl.uniform3fv(u("uColor1"), linear(rayColor1));
    gl.uniform3fv(u("uColor2"), linear(rayColor2));
    gl.uniform1f(u("uIntensity"), intensity);
    gl.uniform1f(u("uSpread"), spread);
    gl.uniform1f(u("uTilt"), tilt);
    gl.uniform1f(u("uSaturation"), saturation);
    gl.uniform1f(u("uBlend"), blend);
    gl.uniform1f(u("uFalloff"), falloff);
    gl.uniform1f(u("uOpacity"), opacity);
    const uTempo = u("uTime");
    const uTela = u("uResolution");

    let tempo = 0;
    const desenha = () => {
      gl.uniform1f(uTempo, tempo);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Gradiente suave: 2x o devicePixelRatio não muda o resultado e
    // quadruplica o custo por pixel.
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      canvas.width = Math.max(1, Math.round(width));
      canvas.height = Math.max(1, Math.round(height));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uTela, canvas.width, canvas.height);
      desenha();
    });
    ro.observe(canvas);

    // Só anima com o hero na tela e sem movimento reduzido.
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let antes = 0;
    const quadro = (t: number) => {
      tempo += (antes ? (t - antes) / 1000 : 0) * speed;
      antes = t;
      desenha();
      raf = requestAnimationFrame(quadro);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      antes = 0;
      if (e.isIntersecting && !reduzido) raf = requestAnimationFrame(quadro);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [speed, rayColor1, rayColor2, intensity, spread, ox, oy, tilt, saturation, blend, falloff, opacity]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} />;
}
