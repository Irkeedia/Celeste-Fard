"use client";

import { useEffect, useState } from "react";

const POSTER_TIME = 0.35;

type FrameState = {
  src: string;
  poster: string | null;
};

/**
 * Extrait une image de prévisualisation depuis la première seconde de la vidéo.
 * Utile sur mobile où `preload="metadata"` affiche souvent un cadre noir.
 */
export function useVideoPoster(src: string, enabled = true) {
  const [frame, setFrame] = useState<FrameState>({ src: "", poster: null });

  useEffect(() => {
    if (!enabled || !src) return;

    let cancelled = false;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("playsinline", "");
    video.src = src;

    const cleanup = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const captureFrame = () => {
      if (cancelled || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        if (!cancelled) setFrame({ src, poster: dataUrl });
      } catch {
        /* canvas tainted — pas de poster généré */
      }
    };

    const onSeeked = () => {
      captureFrame();
      cleanup();
    };

    const onLoadedData = () => {
      try {
        video.currentTime = POSTER_TIME;
      } catch {
        captureFrame();
        cleanup();
      }
    };

    video.addEventListener("loadeddata", onLoadedData, { once: true });
    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener(
      "error",
      () => {
        if (!cancelled) setFrame({ src, poster: null });
        cleanup();
      },
      { once: true },
    );

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      cleanup();
    };
  }, [src, enabled]);

  return enabled && frame.src === src ? frame.poster : null;
}
