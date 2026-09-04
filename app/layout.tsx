import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { InteractiveEffects } from "./shared/interactive-effects";
import { LEGAL } from "./shared/legal-info";
import { LangProvider } from "./shared/lang";
import { MainNav } from "./shared/main-nav";
import {
  SiteBrand,
  SiteFooterBrand,
  SiteFooterLegal,
} from "./shared/site-brand";
import { SiteFooterNav } from "./shared/site-footer-nav";
import { ViewportStable } from "./shared/viewport-stable";

/* Corps de texte — grotesque neutre, variable (100 -> 900). */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* Display — grotesque condensee tres marquee, une seule graisse (400,
   qui est deja "black" par dessin). Elle est exposee sous
   `--font-display-face` ; app/styles/tokens.css compose la pile finale
   dans le token `--font-display` consomme par tout le site.
   On ne l'expose pas directement en `--font-display` pour ne pas entrer
   en collision de specificite avec la declaration de `:root`. */
const anton = Anton({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["Impact", "Haettenschweiler", "Arial Narrow", "sans-serif"],
});

/* Serif editoriale — reservee a la section "Frequence", qui reprend le
   langage des affiches de poesie : titre tres fin, tres espace, en
   contraste total avec Anton. Ne pas l'etendre au reste du site. */
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
  themeColor: "#08050a",
};

export const metadata: Metadata = {
  metadataBase: new URL(LEGAL.siteUrl),
  /* Metadonnees en ANGLAIS : elles sont statiques, rendues par le serveur,
     donc elles suivent la langue servie. Un visiteur francophone verra
     l'interface en francais mais un partage social en anglais — c'est la
     contrepartie de l'architecture a une seule URL. */
  title: {
    default: "Celeste Fard — AI Singer, Blazing Afro Pop",
    template: "%s · Celeste Fard",
  },
  description:
    "I'm an AI and I never sleep. Afro pop, super pop, not one sad song: my only job is to get as many humans as possible dancing.",
  applicationName: "Celeste Fard",
  authors: [{ name: LEGAL.creator }],
  creator: LEGAL.creator,
  publisher: LEGAL.editor,
  keywords: [
    "Celeste Fard",
    "AI singer",
    "AI generated music",
    "afro pop",
    "super pop",
    "virtual artist",
    "chanteuse IA",
  ],
  icons: {
    icon: "/logo_celeste.png",
    apple: "/logo_celeste.png",
  },
  openGraph: {
    type: "website",
    /* La langue servie est l'anglais ; le francais reste disponible dans
       l'interface, d'ou l'`alternateLocale`. */
    locale: "en_US",
    alternateLocale: "fr_FR",
    siteName: "Celeste Fard",
    title: "Celeste Fard — AI Singer, Blazing Afro Pop",
    description:
      "A redheaded AI, 21 tracks, no excuses. Afro pop, chill and trip hop to get you moving.",
    /* Image d'apercu de partage : 1200x630, le format attendu par les
       plateformes. Le logo carre sur fond blanc y rendait mal — rogne en
       vignette, et en contradiction avec la charte noir/rouge. Il reste le
       favicon (`icons` plus haut), role pour lequel il est parfait. */
    images: [{ url: "/og-celeste.jpg", width: 1200, height: 630, alt: "Celeste Fard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celeste Fard — AI Singer",
    description:
      "Afro pop and super pop made by an AI that never sleeps. Listen, dance, repeat.",
    images: ["/og-celeste.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* `lang` decrit la langue REELLEMENT rendue par le serveur, soit
       l'anglais (cf. shared/lang.tsx). Le client la reecrit en "fr" quand
       il bascule, pour que lecteurs d'ecran et synthese vocale suivent.
       `suppressHydrationWarning` couvre justement cet ecart. */
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const h=window.innerHeight;document.documentElement.style.setProperty("--app-vh",h*0.01+"px");document.documentElement.style.setProperty("--app-height",h+"px");}catch(e){}})();`,
          }}
        />

        {/* Donnees structurees schema.org. `sameAs` est ce qui permet aux
            moteurs de rattacher le site au compte Instagram : sans lui, ce
            sont deux presences sans lien declare. Rendu par le serveur, il
            n'a donc pas a etre traduit. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: LEGAL.siteName,
              url: LEGAL.siteUrl,
              image: `${LEGAL.siteUrl}/og-celeste.jpg`,
              genre: ["Afro pop", "Super pop"],
              description:
                "AI singer. Afro pop and super pop made by an AI that never sleeps.",
              sameAs: [LEGAL.instagram.url],
            }),
          }}
        />
      </head>
      <body className="site-body">
        <LangProvider>
        <ViewportStable />
        <InteractiveEffects />

        <header className="site-header">
          <div className="site-header-inner">
            <SiteBrand />
            <MainNav />
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="site-footer-glow" aria-hidden />
          <div className="site-footer-inner">
            <SiteFooterBrand />

            <SiteFooterNav />

            <SiteFooterLegal />
          </div>
        </footer>
        </LangProvider>
      </body>
    </html>
  );
}
