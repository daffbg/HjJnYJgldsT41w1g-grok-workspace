import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PROJECTS, SECTIONS } from "@/content/portfolio";
import { useStudio } from "@/store/studio";

export function Overlay() {
  const section = useStudio((s) => s.section);
  const hovered = useStudio((s) => s.hovered);
  const ready = useStudio((s) => s.ready);
  const readable = useStudio((s) => s.readable);
  const webgl = useStudio((s) => s.webgl);
  const copyRef = useRef<HTMLDivElement>(null);
  const s = SECTIONS[section];
  const hoverProject = PROJECTS.find((p) => p.id === hovered);

  useEffect(() => {
    if (!copyRef.current) return;
    gsap.fromTo(
      copyRef.current.children,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" },
    );
  }, [section]);

  if (readable || !webgl) return null;

  return (
    <div className="studio-overlay" aria-hidden={!ready}>
      <div className="overlay-copy" ref={copyRef} key={s.id}>
        <p className="overlay-kicker">
          <span>{s.index}</span>
          {s.kicker}
        </p>
        <h2 className="overlay-title">{s.title}</h2>
        <p className="overlay-sub">{s.subtitle}</p>
        <p className="overlay-body">{s.body}</p>
      </div>
      <p className="overlay-hint">{section === 0 ? "Scroll to walk the studio" : "Scroll"}</p>
      {hoverProject && (
        <p className="overlay-hover">
          {hoverProject.title}
          <span>Open</span>
        </p>
      )}
    </div>
  );
}
