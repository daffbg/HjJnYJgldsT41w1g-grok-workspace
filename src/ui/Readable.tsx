import { useState } from "react";
import { EDUCATION, PERSON, PROJECTS, SECTIONS, SKILLS } from "@/content/portfolio";
import { useStudio } from "@/store/studio";

export function SemanticDocument({ visible }: { visible: boolean }) {
  const [copied, setCopied] = useState(false);
  const set = useStudio((s) => s.set);

  return (
    <div className={visible ? "readable" : "sr-only"} id="content">
      <header className="readable-hero">
        <p className="overlay-kicker">Dhaka, Bangladesh</p>
        <h1>{PERSON.name}</h1>
        <p className="readable-title">{PERSON.title}</p>
        <p className="readable-lead">{PERSON.statement}</p>
        {!visible && (
          <p>
            Immersive 3D studio portfolio covering data science, machine learning, computer vision,
            RAG systems, and applied AI engineering.
          </p>
        )}
        {visible && (
          <button type="button" className="text-btn" onClick={() => set({ readable: false })}>
            Enter the studio
          </button>
        )}
      </header>

      <section>
        <h2>About</h2>
        {PERSON.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>Journey: {PERSON.journey.join(" → ")}</p>
      </section>

      {SECTIONS.filter((s) => s.id !== "hero" && s.id !== "about" && s.id !== "contact").map((s) => (
        <section key={s.id} id={s.id}>
          <h2>
            {s.kicker}: {s.title}
          </h2>
          <p>{s.subtitle}</p>
          <p>{s.body}</p>
        </section>
      ))}

      <section id="projects">
        <h2>Selected work</h2>
        {PROJECTS.map((p) => (
          <article key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.statement}</p>
            <p>{p.body}</p>
            <p>{p.tags.join(" · ")}</p>
            {p.facts.map((f) => (
              <p key={f.label}>
                {f.label}: {f.value}
              </p>
            ))}
            {p.href && (
              <p>
                <a href={p.href}>{p.href}</a>
              </p>
            )}
          </article>
        ))}
      </section>

      <section id="education">
        <h2>Education</h2>
        <ol>
          {EDUCATION.map((e) => (
            <li key={e.id}>
              <strong>
                {e.level} — {e.title}
              </strong>
              <span> {e.school}</span>
              {e.note && <p>{e.note}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section id="skills">
        <h2>Technical toolkit</h2>
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group}>
            <h3>{group}</h3>
            <p>{items.join(" · ")}</p>
          </div>
        ))}
      </section>

      <section id="contact">
        <h2>Let’s build something intelligent.</h2>
        <p>{PERSON.location}</p>
        <p>
          Conversations about applied machine learning, retrieval systems, and computer vision are
          welcome. Personal channels are shared in professional correspondence.
        </p>
        <p>
          Project: <a href="https://agnxai.com">agnxai.com</a>
        </p>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const text = `From: ${fd.get("name")} <${fd.get("email")}>\n\n${fd.get("message")}`;
            void navigator.clipboard.writeText(text).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2400);
            });
          }}
        >
          <label>
            Name
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit" className="text-btn primary">
            {copied ? "Copied" : "Copy message"}
          </button>
        </form>
      </section>
    </div>
  );
}
