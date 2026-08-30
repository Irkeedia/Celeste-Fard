import { CtaSection } from "./sections/cta-section";
import { GallerySection } from "./sections/gallery-section";
import { HeroSection } from "./sections/hero-section";
import { ManifestoSection } from "./sections/manifesto-section";
import { MarqueeBand } from "./sections/marquee-band";
import { PlayerSection } from "./sections/player-section";
import { ShopTeaser } from "./sections/shop-teaser";
import { VideoSection } from "./sections/video-section";

/**
 * PAGE D'ACCUEIL — assemblage pur.
 *
 * Aucun style, aucune logique ici : chaque section est autonome
 * (fond, gouttiere `--gutter`, conteneur `--maxw`, halos, grain).
 * On n'enveloppe donc PAS dans `.page-wrap` : cela ajouterait une
 * seconde gouttiere et casserait les sections pleine largeur.
 *
 * Ordre impose : hero -> marquee -> manifesto -> player -> gallery
 * -> video -> shop -> cta.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <ManifestoSection />
      <PlayerSection />
      <GallerySection />
      <VideoSection />
      <ShopTeaser />
      <CtaSection />
    </>
  );
}
