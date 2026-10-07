import type { Metadata } from "next";
import Script from "next/script";
import localfont from "next/font/local";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import IntroReveal from "@/components/IntroReveal";
import SmoothScroll from "@/components/SmoothScroll";

const ppmori = localfont({
  src: [
    {
      path: "./fonts/PPMori-Extralight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    }
  ],
  variable: "--font-ppmori",
})

// Pixel do título do hero: conversa com a trama de pontos das mãos.
const silkscreen = Silkscreen({
  weight: "700",
  subsets: ["latin", "latin-ext"],
  variable: "--font-silkscreen",
})

export const metadata: Metadata = {
  title: "Clov | Sistemas digitais para empresas em crescimento",
  description:
    "A Clov projeta e constrói a camada digital de empresas que já vendem: site, integrações e automação na mesma arquitetura.",
  icons: {
    icon: "/faviconclov.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${ppmori.variable} ${silkscreen.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) — o GTM pede como 1º elemento do body. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFJKJKKM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <IntroReveal />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>

        {/* Google Tag Manager. lazyOnload em vez de afterInteractive: são ~291 KB
            de JavaScript de terceiro (container + Analytics) e, na thread de um
            aparelho de entrada, isso disputava com a hidratação da página.
            Assim ele carrega depois do load. O custo é não registrar quem sai
            em menos de um segundo. */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WFJKJKKM');`}
        </Script>
      </body>
    </html>
  );
}
