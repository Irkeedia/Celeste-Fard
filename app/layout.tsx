import type { Metadata, Viewport } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { InteractiveEffects } from "./shared/interactive-effects";
import { LEGAL } from "./shared/legal-info";
import { LangProvider } from "./shared/lang";
import { MainNav } from "./shared/main-nav";
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
  title: {
    default: "Celeste Fard — Chanteuse IA, afro pop incandescente",
    template: "%s · Celeste Fard",
  },
  description:
    "Je suis une IA et je ne dors jamais. Afro pop, super pop, zéro morceau triste : mon seul job est de faire danser le maximum d'humains sur Terre.",
  applicationName: "Celeste Fard",
  authors: [{ name: LEGAL.creator }],
  creator: LEGAL.creator,
  publisher: LEGAL.editor,
  keywords: [
    "Celeste Fard",
    "chanteuse IA",
    "musique générée par IA",
    "afro pop",
    "super pop",
    "artiste virtuelle",
  ],
  icons: {
    icon: "/logo_celeste.png",
    apple: "/logo_celeste.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Celeste Fard",
    title: "Celeste Fard — Chanteuse IA, afro pop incandescente",
    description:
      "Une IA rousse, 21 titres, aucune excuse. Afro pop, chill et trip hop pour vous faire bouger.",
    /* Image d'apercu de partage : 1200x630, le format attendu par les
       plateformes. Le logo carre sur fond blanc y rendait mal — rogne en
       vignette, et en contradiction avec la charte noir/rouge. Il reste le
       favicon (`icons` plus haut), role pour lequel il est parfait. */
    images: [{ url: "/og-celeste.jpg", width: 1200, height: 630, alt: "Celeste Fard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celeste Fard — Chanteuse IA",
    description:
      "Afro pop et super pop générées par une IA qui ne dort jamais. Écoutez, dansez, recommencez.",
    images: ["/og-celeste.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${anton.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const h=window.innerHeight;document.documentElement.style.setProperty("--app-vh",h*0.01+"px");document.documentElement.style.setProperty("--app-height",h+"px");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="site-body">
        <LangProvider>
        <ViewportStable />
        <InteractiveEffects />

        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand-link">
              <span className="brand-logo-ring">
                <Image
                  src="/logo_celeste.png"
                  alt=""
                  width={44}
                  height={44}
                  className="brand-logo"
                  loading="eager"
                />
              </span>
              <span className="brand-link-copy">
                <span className="brand-link-text">CELESTE FARD</span>
                <span className="brand-link-sub">Chanteuse IA</span>
              </span>
            </Link>
            <MainNav />
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="site-footer-glow" aria-hidden />
          <div className="site-footer-inner">
            <div className="site-footer-brand">
              <Link
                href="/"
                className="site-footer-logo-link"
                aria-label="Retour à l'accueil"
              >
                <Image
                  src="/logo_celeste.png"
                  alt="Celeste Fard"
                  width={52}
                  height={52}
                  className="brand-logo brand-logo--footer"
                />
              </Link>
              <p className="site-footer-wordmark">CELESTE FARD</p>
              <p className="site-footer-tagline u-micro">
                Chanteuse IA · Afro pop &amp; super pop · FR / EN / IT
              </p>
            </div>

            <SiteFooterNav />

            <p className="site-footer-legal">
              © {new Date().getFullYear()} {LEGAL.editor} / {LEGAL.creator}. Celeste Fard est
              une représentation artistique assistée par intelligence artificielle.
            </p>
          </div>
        </footer>
        </LangProvider>
      </body>
    </html>
  );
}
