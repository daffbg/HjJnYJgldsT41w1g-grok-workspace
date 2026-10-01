import { X } from "lucide-react";
import { PROJECTS } from "@/content/portfolio";
import { useStudio } from "@/store/studio";

export function ProjectPanel() {
  const id = useStudio((s) => s.activeProject);
  const set = useStudio((s) => s.set);
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return null;

  return (
    <div
      className="project-backdrop"
      role="presentation"
      onClick={() => set({ activeProject: null })}
    >
      <article
        className="project-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <p className="overlay-kicker">{project.kicker}</p>
          <h2 id="project-title">{project.title}</h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close project"
            onClick={() => set({ activeProject: null })}
          >
            <X size={18} />
          </button>
        </header>
        <p className="project-statement">{project.statement}</p>
        <p className="project-body">{project.body}</p>
        <dl className="project-facts">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="project-tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {project.href && (
          <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
            Visit {project.title}
          </a>
        )}
      </article>
    </div>
  );
}
