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

    const isDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const outerHeart = document.getElementById("cursor-heart-outline");
    const innerHeart = document.getElementById("cursor-heart-solid");

    let frameId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    if (isDesktopPointer && outerHeart && innerHeart) {
      let cursorActivated = false;

      const placeInner = (x: number, y: number) => {
        innerHeart.style.setProperty("--cursor-x", `${x}px`);
        innerHeart.style.setProperty("--cursor-y", `${y}px`);
      };

      const animateOuter = () => {
        currentX += (targetX - currentX) * 0.09;
        currentY += (targetY - currentY) * 0.09;
        outerHeart.style.setProperty("--cursor-x", `${currentX}px`);
        outerHeart.style.setProperty("--cursor-y", `${currentY}px`);
        frameId = window.requestAnimationFrame(animateOuter);
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!cursorActivated) {
          cursorActivated = true;
          document.body.classList.add("heart-cursor-enabled");
          outerHeart.style.opacity = "1";
          innerHeart.style.opacity = "1";
          currentX = event.clientX;
          currentY = event.clientY;
        }
        targetX = event.clientX;
        targetY = event.clientY;
        placeInner(targetX, targetY);
      };

      const onMouseLeave = () => {
        outerHeart.style.opacity = "0";
        innerHeart.style.opacity = "0";
      };

      const onMouseEnter = () => {
        outerHeart.style.opacity = "1";
        innerHeart.style.opacity = "1";
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("mouseenter", onMouseEnter);
      frameId = window.requestAnimationFrame(animateOuter);

      return () => {
        observer?.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("mouseenter", onMouseEnter);
        window.cancelAnimationFrame(frameId);
        document.body.classList.remove("heart-cursor-enabled");
        outerHeart.style.opacity = "0";
        innerHeart.style.opacity = "0";
      };
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <svg
        id="cursor-heart-outline"
        className="cursor-heart cursor-heart-outline"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        id="cursor-heart-solid"
        className="cursor-heart cursor-heart-solid"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" />
      </svg>
    </>
  );
}
