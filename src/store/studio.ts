import { create } from "zustand";
import type { ProjectId } from "@/content/portfolio";

export type Quality = "high" | "medium" | "low";
export type ClockMode = "system" | "manual";

type StudioState = {
  webgl: boolean;
  ready: boolean;
  loadProgress: number;
  reducedMotion: boolean;
  readable: boolean;
  quality: Quality;
  autoQuality: boolean;
  mobile: boolean;
  neutral: boolean;
  sound: boolean;
  clockMode: ClockMode;
  manualHour: number;
  manualMinute: number;
  scroll: number;
  section: number;
  camZ: number;
  hovered: string | null;
  activeProject: ProjectId | null;
  controlsOpen: boolean;
  resetToken: number;
  set: (partial: Partial<StudioState>) => void;
  setScroll: (scroll: number) => void;
  cycleQuality: () => void;
  resetCamera: () => void;
};

const QUALITIES: Quality[] = ["low", "medium", "high"];

export const useStudio = create<StudioState>((set, get) => ({
  webgl: true,
  ready: false,
  loadProgress: 0,
  reducedMotion: false,
  readable: false,
  quality: "medium",
  autoQuality: true,
  mobile: false,
  neutral: false,
  sound: false,
  clockMode: "system",
  manualHour: 9,
  manualMinute: 41,
  scroll: 0,
  section: 0,
  camZ: 5,
  hovered: null,
  activeProject: null,
  controlsOpen: false,
  resetToken: 0,
  set: (partial) => set(partial),
  setScroll: (scroll) => {
    const clamped = Math.min(1, Math.max(0, scroll));
    const section = Math.min(7, Math.max(0, Math.round(clamped * 7)));
    set({ scroll: clamped, section });
  },
  cycleQuality: () => {
    const i = QUALITIES.indexOf(get().quality);
    set({ quality: QUALITIES[(i + 1) % QUALITIES.length], autoQuality: false });
  },
  resetCamera: () => set({ resetToken: get().resetToken + 1 }),
}));
