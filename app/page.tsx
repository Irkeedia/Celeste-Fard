import { CtaSection } from "./sections/cta-section";
import { FrequenceSection } from "./sections/frequence-section";
import { GallerySection } from "./sections/gallery-section";
import { HeroSection } from "./sections/hero-section";
import { ManifestoSection } from "./sections/manifesto-section";
import { MarqueeBand } from "./sections/marquee-band";
import { PhotoStrip } from "./sections/photo-strip";
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
 * Ordre : hero -> marquee -> manifesto -> player -> frequence -> gallery
 * -> photo strip -> video -> shop -> cta.
 *
 * "Frequence" suit le lecteur : on vient de parcourir le catalogue, la
 * section met en avant un seul titre, en plein ecran.
 *
 * Le ruban de photos est place APRES la galerie : la galerie pose le
 * regard sur quelques images choisies, le ruban enchaine sur le volume.
 * L'inverse ecraserait la galerie.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <ManifestoSection />
      <PlayerSection />
      <FrequenceSection />
      <GallerySection />
      <PhotoStrip />
      <VideoSection />
      <ShopTeaser />
      <CtaSection />
    </>
  );
}
