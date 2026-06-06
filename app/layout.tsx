import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { InteractiveEffects } from "./shared/interactive-effects";
import { LEGAL } from "./shared/legal-info";
import { MainNav } from "./shared/main-nav";
import { ViewportStable } from "./shared/viewport-stable";

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
};

export const metadata: Metadata = {
  title: "Celeste Fard | Pop Couture",
  description:
    "Celeste Fard, 25 ans, etudiante en sciences et chanteuse. Rap pop sombre, humeurs en FR/IT/EN, transparence radicale et humanite imparfaite.",
  icons: {
    icon: "/logo_celeste.png",
    apple: "/logo_celeste.png",
  },
  openGraph: {
    images: [{ url: "/logo_celeste.png", width: 512, height: 512, alt: "Celeste Fard" }],
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
      className={`${nunito.variable} ${cormorant.variable} h-full antialiased`}
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
        <ViewportStable />
        <InteractiveEffects />
        <div className="ambient-glow ambient-left" />
        <div className="ambient-glow ambient-right" />
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand-link">
              <Image
                src="/logo_celeste.png"
                alt=""
                width={44}
                height={44}
                className="brand-logo"
                priority
              />
              <span className="brand-link-text">CELESTE FARD</span>
            </Link>
            <MainNav />
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo-link" aria-label="Retour à l'accueil">
              <Image
                src="/logo_celeste.png"
                alt="Celeste Fard"
                width={52}
                height={52}
                className="brand-logo brand-logo--footer"
              />
            </Link>
            <div className="site-footer-copy">
              <p>France, Racines FR / IT / EN, Pop couture sincère</p>
              <p>
                © {new Date().getFullYear()} {LEGAL.editor} / {LEGAL.creator}. Celeste Fard est une
                représentation artistique assistée par intelligence artificielle.
              </p>
            </div>
          </div>
          <nav className="site-footer-nav" aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/cgu">CGU</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
