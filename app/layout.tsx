import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
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
              CELESTE FARD
            </Link>
            <MainNav />
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-copy">
            <p>France, Racines FR / IT / EN, Pop couture sincère</p>
            <p>
              © {new Date().getFullYear()} {LEGAL.editor} / {LEGAL.creator}. Celeste Fard est une
              représentation artistique assistée par intelligence artificielle.
            </p>
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
