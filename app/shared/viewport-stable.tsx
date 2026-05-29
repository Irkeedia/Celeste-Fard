"use client";

import { useEffect } from "react";

function applyStableViewportHeight() {
  const height = window.innerHeight;
  document.documentElement.style.setProperty("--app-vh", `${height * 0.01}px`);
  document.documentElement.style.setProperty("--app-height", `${height}px`);
}

export function ViewportStable() {
  useEffect(() => {
    applyStableViewportHeight();
    window.addEventListener("orientationchange", applyStableViewportHeight);
    return () => window.removeEventListener("orientationchange", applyStableViewportHeight);
  }, []);

  return null;
}
