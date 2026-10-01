import * as THREE from "three";

export type Waypoint = {
  p: [number, number, number];
  t: [number, number, number];
  fov: number;
};

/** Cinematic path through the eight-bay studio. Scroll 0..1. */
export const WAYPOINTS: Waypoint[] = [
  { p: [1.7, 1.38, 2.35], t: [-0.35, 1.08, -0.45], fov: 34 },
  { p: [0.85, 1.28, 1.55], t: [-0.4, 1.05, -0.5], fov: 30 },
  { p: [1.9, 1.55, -8.2], t: [0.1, 1.2, -14.2], fov: 38 },
  { p: [0.1, 1.38, -12.8], t: [0.2, 1.18, -17.6], fov: 34 },
  { p: [1.7, 1.62, -21.0], t: [0.05, 1.32, -27.2], fov: 40 },
  { p: [0.0, 1.42, -25.8], t: [0.2, 1.28, -30.6], fov: 32 },
  { p: [1.65, 1.5, -33.8], t: [0.0, 1.2, -40.0], fov: 36 },
  { p: [0.15, 1.32, -38.6], t: [0.05, 1.14, -42.8], fov: 30 },
  { p: [1.45, 1.52, -46.6], t: [0.0, 1.26, -52.4], fov: 38 },
  { p: [-0.2, 1.36, -51.4], t: [0.15, 1.18, -55.8], fov: 32 },
  { p: [2.1, 1.7, -60.4], t: [0.0, 1.12, -68.8], fov: 42 },
  { p: [0.1, 1.46, -68.6], t: [0.0, 1.1, -75.4], fov: 36 },
  { p: [1.35, 1.42, -81.0], t: [-0.4, 1.16, -85.8], fov: 34 },
  { p: [0.05, 1.52, -89.6], t: [0.0, 1.3, -95.2], fov: 34 },
  { p: [0.0, 1.85, -92.8], t: [0.0, 1.38, -98.4], fov: 38 },
];

const _p = new THREE.Vector3();
const _t = new THREE.Vector3();
const _pA = new THREE.Vector3();
const _pB = new THREE.Vector3();
const _tA = new THREE.Vector3();
const _tB = new THREE.Vector3();

export function samplePath(scroll: number) {
  const n = WAYPOINTS.length - 1;
  const x = Math.min(1, Math.max(0, scroll)) * n;
  const i = Math.min(n - 1, Math.floor(x));
  const f = x - i;
  const s = f * f * (3 - 2 * f);
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  _pA.set(...a.p);
  _pB.set(...b.p);
  _tA.set(...a.t);
  _tB.set(...b.t);
  _p.lerpVectors(_pA, _pB, s);
  _t.lerpVectors(_tA, _tB, s);
  const fov = a.fov + (b.fov - a.fov) * s;
  return { position: _p, target: _t, fov };
}

export const ROOM_Z = {
  workspace: 0,
  data: -14,
  ml: -28,
  research: -42,
  llm: -56,
  projects: -70,
  about: -86,
  contact: -96,
} as const;

export const SECTION_SCROLL = [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1];
