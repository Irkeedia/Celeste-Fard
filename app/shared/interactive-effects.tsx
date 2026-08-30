"use client";

import { useEffect } from "react";

function isMobileExperience() {
  return window.matchMedia("(max-width: 860px), (hover: none), (pointer: coarse)").matches;
}

export function InteractiveEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipMotionEffects = prefersReducedMotion || isMobileExperience();

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section, .card, .tile, .video-card, .shop-card, .split-media, .stat, .legal-section",
      ),
    );

    let observer: IntersectionObserver | null = null;

    if (skipMotionEffects) {
      revealTargets.forEach((element) => {
        element.classList.add("reveal-on-scroll", "revealed");
      });
    } else {
      revealTargets.forEach((element) => element.classList.add("reveal-on-scroll"));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            } else {
              entry.target.classList.remove("revealed");
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
      );

      revealTargets.forEach((element) => observer?.observe(element));
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  /* Filet de securite images : si un fichier /image/gen/*.jpg manque, le
     conteneur porte deja `u-image-fallback` (degrade). On efface alors
     l'<img> cassee pour ne pas empiler l'icone "image brisee" + le texte
     alternatif par-dessus le degrade. Le rendu degrade proprement, la page
     n'est jamais cassee. */
  useEffect(() => {
    const markBroken = (img: HTMLImageElement) => {
      img.dataset.imgFailed = "true";
    };

    document.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) markBroken(img);
    });

    /* `error` ne remonte pas : on ecoute en phase de capture. */
    const onError = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLImageElement) markBroken(target);
    };

    document.addEventListener("error", onError, true);
    return () => document.removeEventListener("error", onError, true);
  }, []);

  /* Header flottant : on bascule un attribut sur <html> des que la page
     a defile. Le CSS (globals.css) durcit alors le fond de la pilule
     glass et allume le filet rouge. Aucune hauteur ne change : le hero
     s'appuie sur --site-header-h, un header elastique ferait sauter la
     mise en page. */
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let scrolled: boolean | null = null;

    const apply = () => {
      frame = 0;
      const next = window.scrollY > 8;
      if (next === scrolled) return;
      scrolled = next;
      root.dataset.scrolled = String(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      delete root.dataset.scrolled;
    };
  }, []);

  return null;
}
