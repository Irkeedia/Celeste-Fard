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
        ".hero-banner, .section-block, .glass-panel, .photo-tile, .story-gallery-card, .story-hero, .story-chapter, .story-feature-section, .story-paradox-card, .story-manifesto, .cover-card, .fan-moment-card, .video-picker-card",
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

  return null;
}
