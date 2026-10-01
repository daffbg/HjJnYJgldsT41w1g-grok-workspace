import { type ComponentType, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { detectDevice, detectWebGL } from "@/lib/quality";
import { useStudio } from "@/store/studio";
import { ControlPanel } from "@/ui/ControlPanel";
import { Nav } from "@/ui/Nav";
import { Overlay } from "@/ui/Overlay";
import { Preloader } from "@/ui/Preloader";
import { ProjectPanel } from "@/ui/ProjectPanel";
import { SemanticDocument } from "@/ui/Readable";

export function StudioApp() {
  const [Experience, setExperience] = useState<ComponentType | null>(null);
  const webgl = useStudio((s) => s.webgl);
  const readable = useStudio((s) => s.readable);
  const ready = useStudio((s) => s.ready);
  const set = useStudio((s) => s.set);
  const setScroll = useStudio((s) => s.setScroll);
  const activeProject = useStudio((s) => s.activeProject);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const { mobile, quality, reducedMotion } = detectDevice();
    const gl = detectWebGL();
    set({
      mobile,
      quality,
      reducedMotion,
      webgl: gl,
      readable: !gl,
    });
    if (gl) {
      void import("@/studio/Experience").then((m) => setExperience(() => m.Experience));
    } else {
      set({ ready: true, loadProgress: 1 });
    }
    const failSafe = window.setTimeout(() => {
      if (!useStudio.getState().ready) useStudio.getState().set({ ready: true });
    }, 7000);
    return () => window.clearTimeout(failSafe);
  }, [set]);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
      lerp: useStudio.getState().reducedMotion ? 1 : 0.09,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;
    const onScroll = (instance: Lenis) => {
      setScroll(instance.progress);
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScroll]);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (activeProject || readable) lenisRef.current.stop();
    else lenisRef.current.start();
  }, [activeProject, readable]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") set({ activeProject: null, controlsOpen: false });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [set]);

  const showWorld = Boolean(webgl && !readable && Experience);

  return (
    <>
      <a className="skip-link" href="#content" onClick={() => set({ readable: true })}>
        Skip to content
      </a>
      {showWorld && Experience ? <Experience /> : null}
      {showWorld ? <div className="scroll-track" aria-hidden="true" /> : null}
      <SemanticDocument visible={readable || !webgl} />
      {!readable && webgl ? (
        <>
          <Nav />
          <Overlay />
          <ControlPanel />
        </>
      ) : null}
      {activeProject ? <ProjectPanel /> : null}
      <Preloader />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      {ready && !readable && webgl ? (
        <p className="brand-mark">
          Sudipta Mondal Suvo
          <span>Studio</span>
        </p>
      ) : null}
    </>
  );
}
