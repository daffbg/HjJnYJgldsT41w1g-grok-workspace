import { SECTIONS } from "@/content/portfolio";
import { cn } from "@/lib/cn";
import { useStudio } from "@/store/studio";
import { SECTION_SCROLL } from "@/studio/path";

export function Nav() {
  const section = useStudio((s) => s.section);

  return (
    <nav className="studio-nav" aria-label="Studio rooms">
      <ol>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={cn("nav-dot", i === section && "is-active")}
              onClick={() => {
                const y = SECTION_SCROLL[i] * (document.documentElement.scrollHeight - window.innerHeight);
                window.scrollTo({ top: y, behavior: "smooth" });
              }}
              aria-current={i === section ? "true" : undefined}
              aria-label={`${s.index} ${s.kicker}`}
            >
              <span className="nav-index">{s.index}</span>
              <span className="nav-label">{s.kicker}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
