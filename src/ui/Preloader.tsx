import { PERSON } from "@/content/portfolio";
import { useStudio } from "@/store/studio";

export function Preloader() {
  const ready = useStudio((s) => s.ready);
  const webgl = useStudio((s) => s.webgl);
  const readable = useStudio((s) => s.readable);
  const hide = ready || !webgl || readable;

  return (
    <div
      className={`preloader ${hide ? "preloader-hide" : ""}`}
      aria-hidden={hide}
      role="status"
    >
      <p className="preloader-kicker">Entering the studio</p>
      <p className="preloader-name">{PERSON.name}</p>
      <p className="preloader-role">{PERSON.title}</p>
      <div className="preloader-bar" />
    </div>
  );
}
