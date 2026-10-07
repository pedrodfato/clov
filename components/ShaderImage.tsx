"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { imageShader } from "@/shaders/imageShader"

// Ajuste o efeito por aqui.
const settings = {
    uGridSize: 3.5,
    uDotSize: 0.95,
    uContrast: 1.0,
    uBrightness: 0.02,
    uEffectStrength: 1.05,
    uInvert: 0,
    uColor: "#00ff66",
}

// Sobrescreve os settings acima para uma imagem específica.
type Overrides = Partial<Omit<typeof settings, "uColor">> & { uColor?: string }

// Entrada esticada (ver revealUv no shader). `at` é em segundos desde o
// carregamento da página, para sincronizar com a intro; se a textura chegar
// depois disso, a animação começa quando ela chegar, sem pular etapas.
type Reveal = { from: "left" | "right"; at: number; duration: number }

type Props = {
    src: string
    className?: string
    overrides?: Overrides
    reveal?: Reveal
}

function ImageEffect({ src, overrides, reveal }: { src: string; overrides?: Overrides; reveal?: Reveal }) {
    const { gl, size } = useThree()
    const inicio = useRef<number | null>(null)

    const texture = useMemo(() => new THREE.TextureLoader().load(src), [src])

    const { composer, pass } = useMemo(() => {
        const composer = new EffectComposer(gl)
        const pass = new ShaderPass(imageShader)

        pass.material.transparent = true
        pass.renderToScreen = true
        composer.addPass(pass)

        return { composer, pass }
    }, [gl])

    // Texture + tuning uniforms.
    useEffect(() => {
        const uniforms = pass.uniforms
        const config = { ...settings, ...overrides }

        uniforms.uTexture.value = texture
        uniforms.uGridSize.value = config.uGridSize
        uniforms.uDotSize.value = config.uDotSize
        uniforms.uContrast.value = config.uContrast
        uniforms.uBrightness.value = config.uBrightness
        uniforms.uEffectStrength.value = config.uEffectStrength
        uniforms.uInvert.value = config.uInvert
        uniforms.uColor.value = new THREE.Color(config.uColor)

        const applyImageSize = () => {
            if (!texture.image) return
            uniforms.uImageResolution.value.set(texture.image.width, texture.image.height)
        }

        applyImageSize()
        // A textura pode ainda estar carregando no primeiro render.
        const id = setInterval(() => {
            if (texture.image) {
                applyImageSize()
                clearInterval(id)
            }
        }, 60)

        return () => clearInterval(id)
    }, [pass, texture, overrides])

    // Responsivo: acompanha o tamanho do container.
    useEffect(() => {
        composer.setSize(size.width, size.height)
        pass.uniforms.uResolution.value.set(
            size.width * gl.getPixelRatio(),
            size.height * gl.getPixelRatio()
        )
    }, [composer, pass, gl, size])

    useEffect(() => {
        return () => {
            composer.dispose()
            texture.dispose()
        }
    }, [composer, texture])

    useFrame((_, delta) => {
        pass.uniforms.uTime.value += delta

        if (reveal) {
            const agora = performance.now() / 1000
            if (inicio.current === null && texture.image) inicio.current = Math.max(agora, reveal.at)
            const t = inicio.current === null ? 0 : Math.min(Math.max((agora - inicio.current) / reveal.duration, 0), 1)
            pass.uniforms.uRevealFrom.value = reveal.from === "right" ? 1 : 0
            pass.uniforms.uReveal.value = 1 - Math.pow(1 - t, 3)
        }

        composer.render()
    }, 1)

    return null
}

export default function ShaderImage({ src, className = "", overrides, reveal }: Props) {
    return (
        <Canvas
            className={className}
            // O R3F força overflow:hidden no wrapper, o que corta o canvas quando ele é rotacionado.
            style={{ overflow: "visible" }}
            gl={{ alpha: true, antialias: true }}
            // O resultado é uma trama de pontos de poucos px: renderizar em 2x o
            // devicePixelRatio quadruplica o trabalho por pixel sem diferença visível.
            dpr={1}
            onCreated={({ gl }) => gl.setClearAlpha(0)}
        >
            <ImageEffect src={src} overrides={overrides} reveal={reveal} />
        </Canvas>
    )
}
