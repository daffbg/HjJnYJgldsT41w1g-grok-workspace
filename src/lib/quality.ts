import type { Quality } from "@/store/studio";

export function detectDevice() {
  const ua = navigator.userAgent;
  const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let quality: Quality = "high";
  if (mobile || cores <= 4 || mem <= 4) quality = "low";
  else if (cores <= 8 || mem <= 8) quality = "medium";

  return { mobile, quality, reducedMotion, cores, mem };
}

export function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export function qualitySettings(q: Quality) {
  return {
    dpr: q === "high" ? ([1, 1.75] as [number, number]) : q === "medium" ? ([1, 1.25] as [number, number]) : 1,
    shadows: q !== "low",
    shadowMap: q === "high" ? 2048 : 1024,
    contactShadows: q !== "low",
    pixelLights: q === "high" ? 6 : q === "medium" ? 4 : 3,
    detail: q,
    antialias: q !== "low",
  };
}
