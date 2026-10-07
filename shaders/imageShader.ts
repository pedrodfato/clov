import * as THREE from "three"

export const imageShader = {
    uniforms: {
        tDiffuse: { value: null as THREE.Texture | null },
        uTexture: { value: null as THREE.Texture | null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uImageResolution: { value: new THREE.Vector2(1, 1) },
        uGridSize: { value: 8 },
        uDotSize: { value: 1.1 },
        uContrast: { value: 1.3 },
        uBrightness: { value: 0 },
        uEffectStrength: { value: 1 },
        uInvert: { value: 0 },
        uReveal: { value: 1 },
        uRevealFrom: { value: 0 },
        uColor: { value: new THREE.Color("#00ff66") },
        uTime: { value: 0 },
    },

    vertexShader: /* glsl */ `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: /* glsl */ `
        precision highp float;

        uniform sampler2D uTexture;
        uniform vec2 uResolution;
        uniform vec2 uImageResolution;
        uniform float uGridSize;
        uniform float uDotSize;
        uniform float uContrast;
        uniform float uBrightness;
        uniform float uEffectStrength;
        uniform float uInvert;
        uniform float uReveal;
        uniform float uRevealFrom;
        uniform vec3 uColor;
        uniform float uTime;

        varying vec2 vUv;

        // Maps canvas uv to texture uv keeping the image aspect (object-fit: cover).
        vec2 coverUv(vec2 uv) {
            float canvasAspect = uResolution.x / uResolution.y;
            float imageAspect = uImageResolution.x / uImageResolution.y;
            vec2 scale = vec2(1.0);

            if (canvasAspect > imageAspect) {
                scale.y = imageAspect / canvasAspect;
            } else {
                scale.x = canvasAspect / imageAspect;
            }

            return (uv - 0.5) * scale + 0.5;
        }

        // Entrada esticada: a imagem nasce na borda de origem (uRevealFrom 0 =
        // esquerda, 1 = direita) e a frente avança até uReveal. A parte já
        // revelada da textura cresce mais devagar (p²) que a área na tela (p),
        // então a ponta chega primeiro, esticada, e relaxa até a proporção real.
        // Em uReveal = 1 o mapeamento é a identidade.
        vec2 revealUv(vec2 uv, out float inside) {
            float p = clamp(uReveal, 0.0001, 1.0);
            float s = mix(uv.x, 1.0 - uv.x, uRevealFrom);
            inside = 1.0 - smoothstep(p - 0.03, p, s) * step(p, 0.9999);
            float lag = p * p;
            float t = 1.0 - lag + (s / p) * lag;
            uv.x = mix(t, 1.0 - t, uRevealFrom);
            return uv;
        }

        float lumaOf(vec3 color) {
            return dot(color, vec3(0.2126, 0.7152, 0.0722));
        }

        // Ordered 4x4 Bayer dithering threshold.
        float bayer(vec2 pixel) {
            int x = int(mod(pixel.x, 4.0));
            int y = int(mod(pixel.y, 4.0));
            int index = x + y * 4;

            if (index == 0)  return 0.0 / 16.0;
            if (index == 1)  return 8.0 / 16.0;
            if (index == 2)  return 2.0 / 16.0;
            if (index == 3)  return 10.0 / 16.0;
            if (index == 4)  return 12.0 / 16.0;
            if (index == 5)  return 4.0 / 16.0;
            if (index == 6)  return 14.0 / 16.0;
            if (index == 7)  return 6.0 / 16.0;
            if (index == 8)  return 3.0 / 16.0;
            if (index == 9)  return 11.0 / 16.0;
            if (index == 10) return 1.0 / 16.0;
            if (index == 11) return 9.0 / 16.0;
            if (index == 12) return 15.0 / 16.0;
            if (index == 13) return 7.0 / 16.0;
            if (index == 14) return 13.0 / 16.0;
            return 5.0 / 16.0;
        }

        void main() {
            vec2 pixel = vUv * uResolution;
            float grid = max(uGridSize, 1.0);

            // Pixelize: sample the color at the center of each grid cell.
            vec2 cell = floor(pixel / grid);
            vec2 cellCenter = (cell + 0.5) * grid;
            // A máscara vem do centro da célula: os pontos da frente aparecem
            // inteiros, em vez de cortados ao meio.
            float inside;
            float unused;
            vec4 pixelated = texture2D(uTexture, coverUv(revealUv(cellCenter / uResolution, inside)));
            vec4 original = texture2D(uTexture, coverUv(revealUv(vUv, unused)));

            float lum = lumaOf(pixelated.rgb);
            // Site de fundo claro satura tudo no raio máximo e vira um bloco
            // sólido; invertido, o branco some e o conteúdo é que acende.
            lum = mix(lum, 1.0 - lum, uInvert);
            lum = (lum - 0.5) * uContrast + 0.5 + uBrightness;
            lum = clamp(lum, 0.0, 1.0);

            // Dither the luminance so flat areas break into a stable pattern.
            float dithered = clamp(lum + (bayer(cell) - 0.5) * 0.25, 0.0, 1.0);

            // Halftone: dot radius grows with luminance inside each cell.
            vec2 local = (pixel - cellCenter) / grid;
            float dist = length(local) * 2.0;
            float radius = sqrt(dithered) * uDotSize;
            float aa = fwidth(dist) + 0.05;
            float dotMask = 1.0 - smoothstep(radius - aa, radius + aa, dist);

            // Scanlines give it the terminal / robot-vision read.
            float scanline = 0.88 + 0.12 * sin((pixel.y / grid) * 3.14159 + uTime * 1.5);

            vec3 effectColor = uColor * dithered * dotMask * scanline;
            float effectAlpha = pixelated.a * dotMask;

            vec3 color = mix(original.rgb, effectColor, uEffectStrength);
            float alpha = mix(original.a, effectAlpha, uEffectStrength);

            gl_FragColor = vec4(color * inside, alpha * inside);
        }
    `,
}
