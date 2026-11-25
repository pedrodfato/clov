import type { Metadata } from "next";
import Script from "next/script";
import localfont from "next/font/local";
import "../globals.css";
import Header from "@/components/Header";
import IntroReveal from "@/components/IntroReveal";
import { INTRO_VISTA } from "@/components/intro";
import { SITE } from "@/components/contato";
import { dicionario } from "@/dicionarios";
import { IDIOMAS, caminho, idiomaDe } from "@/dicionarios/idiomas";
import SmoothScroll from "@/components/SmoothScroll";

const ppmori = localfont({
  src: [
    {
      path: "../fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    }
  ],
  variable: "--font-ppmori",
})

// As duas versões saem prontas no build; o proxy escolhe qual servir.
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const idioma = idiomaDe((await params).lang);
  const { meta } = dicionario(idioma);
  return {
    metadataBase: new URL(SITE),
    title: meta.title,
    description: meta.description,
    // Uma URL por idioma para o Google, mesmo chegando por clov.com.br sem www.
    // x-default é a raiz: quem não fala nenhum dos dois cai nela e o proxy decide.
    alternates: {
      canonical: caminho(idioma),
      languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
    },
    icons: {
      icon: "/faviconclov.svg",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const idioma = idiomaDe((await params).lang);
  const d = dicionario(idioma);

  return (
    <html
      lang={d.htmlLang}
      className={`${ppmori.variable} h-full antialiased`}
      // O script INTRO_VISTA põe .sem-intro no <html> antes da hidratação.
      suppressHydrationWarning
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

        {/* Antes do overlay: marca a intro já vista sem esperar o React. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_VISTA }} />
        <IntroReveal />
        <Header t={d.header} idioma={idioma} whatsapp={d.whatsapp} />
        <SmoothScroll>{children}</SmoothScroll>

        {/* Google Tag Manager. São ~300 KB de JavaScript de terceiro (container +
            Analytics) que, num celular de entrada, disputavam a thread com a
            hidratação e as animações da abertura. Ele entra no primeiro toque,
            rolagem ou tecla, ou 4 s depois do load, o que vier antes. O custo
            é não registrar quem sai antes disso sem tocar em nada. */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d){var feito=0,ev=['pointerdown','scroll','keydown','touchstart'];
function gtm(){if(feito)return;feito=1;ev.forEach(function(e){w.removeEventListener(e,gtm,true)});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(w,d,'script','dataLayer','GTM-WFJKJKKM');}
ev.forEach(function(e){w.addEventListener(e,gtm,{capture:true,passive:true})});
setTimeout(gtm,4000);})(window,document);`}
        </Script>
      </body>
    </html>
  );
}
