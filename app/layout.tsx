import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { InteractiveEffects } from "./shared/interactive-effects";
import { MainNav } from "./shared/main-nav";

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Celeste Fard | Pop Couture",
  description:
    "Univers officiel de Celeste Fard, chanteuse franco-italienne : storytelling, musique, clips courts et shop premium.",
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
    >
      <body className="site-body">
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
          <p>Paris x Milano - Pop couture emotionnelle</p>
          <p>© {new Date().getFullYear()} Celeste Fard. Tous droits reserves.</p>
        </footer>
      </body>
    </html>
  );
}
