import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  Cloud,
  Download,
  GitBranch,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import content from "../content/cv.json";

type Language = keyof typeof content.locales;
const ids = [
  "sobre-mi",
  "experiencia",
  "skills",
  "proyectos",
  "formacion",
  "contacto",
];
const icons = [Cloud, GitBranch, Workflow, Server, Boxes, Activity, BookOpen];
const initialLanguage = (): Language =>
  new URLSearchParams(window.location.search).get("lang") === "en"
    ? "en"
    : "es";
function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Stack">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function Heading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}

export function CvSite() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cv = content.locales[language];
  const { ui } = cv;
  const person = content.person;
  const resumeBase = `${import.meta.env.BASE_URL}cv/joseph-gavidia-${language}`;
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `Joseph Gavidia — ${ui.resumeTitle}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", cv.profile);
  }, [language, ui.resumeTitle, cv.profile]);
  useEffect(() => {
    const onHistoryChange = () => setLanguage(initialLanguage());
    window.addEventListener("popstate", onHistoryChange);
    return () => window.removeEventListener("popstate", onHistoryChange);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1100) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);
  function changeLanguage(next: Language) {
    setLanguage(next);
    setMenuOpen(false);
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  }
  const navigation = (
    <>
      {ids.map((id, i) => (
        <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
          {ui.nav[i]}
        </a>
      ))}
    </>
  );
  const socialLinks = (
    <div className="hero-social">
      <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
        <Linkedin size={16} aria-hidden="true" />
        LinkedIn
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
      <a href={person.github} target="_blank" rel="noopener noreferrer">
        <Github size={16} aria-hidden="true" />
        GitHub
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </div>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skip}
      </a>
      <header className="site-header" ref={headerRef}>
        <div className="container header-row">
          <a className="brand" href="#inicio" aria-label={ui.home}>
            <span className="brand-icon">
              <Terminal size={19} aria-hidden="true" />
            </span>
            <span>
              joseph<span className="accent">.</span>gavidia
            </span>
          </a>
          <nav className="desktop-nav" aria-label={ui.navigation}>
            {navigation}
          </nav>
          <div className="header-actions">
            <div
              className="language-switch"
              role="group"
              aria-label={language === "es" ? "Idioma" : "Language"}
            >
              <button
                lang="es"
                aria-label="Español"
                aria-pressed={language === "es"}
                onClick={() => changeLanguage("es")}
              >
                ES
              </button>
              <span aria-hidden="true">/</span>
              <button
                lang="en"
                aria-label="English"
                aria-pressed={language === "en"}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
            </div>
            <button
              className="menu-button"
              ref={menuButton}
              aria-label={menuOpen ? ui.menuClose : ui.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label={ui.navigation}
          hidden={!menuOpen}
        >
          {navigation}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section id="inicio" className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" aria-hidden="true" />
                {ui.eyebrow}
              </p>
              <h1>
                <span className="hero-name">{person.name}</span>
                {ui.headline[0]}
                <br />
                <span className="accent">{ui.headline[1]}</span>
              </h1>
              <p className="hero-intro">{ui.intro}</p>
              <p className="location">
                <MapPin size={15} aria-hidden="true" />
                {ui.location}
              </p>
              <div className="button-row">
                <a className="button button-primary" href="#experiencia">
                  {ui.viewWork}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <a
                  className="button button-secondary"
                  href={`${resumeBase}.pdf`}
                  download
                >
                  {ui.download}
                  <Download size={17} aria-hidden="true" />
                </a>
              </div>
              {socialLinks}
            </div>
            <aside
              className="scope-card"
              aria-label={
                language === "es" ? "Áreas de trabajo" : "Areas of work"
              }
            >
              <div className="scope-top">
                <span>
                  <span className="terminal-dots" aria-hidden="true">
                    ● ● ●
                  </span>{" "}
                  infrastructure.profile
                </span>
                <Terminal size={16} aria-hidden="true" />
              </div>
              <div className="scope-body">
                <p className="mono-label">
                  {language === "es"
                    ? "// enfoque de trabajo"
                    : "// areas of focus"}
                </p>
                <div className="scope-cloud">
                  <Cloud size={34} strokeWidth={1.3} aria-hidden="true" />
                  <span>
                    Microsoft Azure
                    <small>
                      {language === "es"
                        ? "Administración cloud"
                        : "Cloud administration"}
                    </small>
                  </span>
                </div>
                <div className="scope-branches" aria-hidden="true" />
                <div className="scope-nodes">
                  <div>
                    <Server size={19} aria-hidden="true" />
                    <strong>Windows Server</strong>
                    <span>{language === "es" ? "Sistemas" : "Systems"}</span>
                  </div>
                  <div>
                    <GitBranch size={19} aria-hidden="true" />
                    <strong>GitOps</strong>
                    <span>Git · Argo CD</span>
                  </div>
                  <div>
                    <Workflow size={19} aria-hidden="true" />
                    <strong>
                      {language === "es" ? "Automatización" : "Automation"}
                    </strong>
                    <span>Ansible · PowerShell</span>
                  </div>
                </div>
                <div className="scope-cert">
                  <ShieldCheck size={20} aria-hidden="true" />
                  <div>
                    Microsoft Certified
                    <small>Azure Fundamentals · AZ-900</small>
                  </div>
                  <Check size={17} aria-hidden="true" />
                </div>
              </div>
              <div className="scope-bottom">
                <span className="accent">›</span>
                {language === "es"
                  ? "configurar. automatizar. documentar."
                  : "configure. automate. document."}
                <span className="cursor" aria-hidden="true">
                  _
                </span>
              </div>
            </aside>
          </div>
          <div className="container stack-ribbon">
            <span className="mono-label">
              {language === "es"
                ? "ENTORNO TECNOLÓGICO"
                : "WORKING ENVIRONMENT"}
            </span>
            <ul>
              {content.featuredStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section id="sobre-mi" className="section container profile-section">
          <Heading label={ui.profileLabel} title={ui.profileTitle} />
          <div className="profile-body">
            <p>{cv.profile}</p>
            <div className="profile-foot">
              <span>
                <Terminal size={16} aria-hidden="true" />
                Sysadmin SSR @ Yoizen
              </span>
              <span>
                <ShieldCheck size={16} aria-hidden="true" />
                Azure Fundamentals · AZ-900
              </span>
            </div>
          </div>
        </section>
        <section id="experiencia" className="section section-surface">
          <div className="container">
            <Heading
              label={ui.experienceLabel}
              title={ui.experienceTitle}
              intro={ui.experienceIntro}
            />
            <div className="timeline">
              {cv.jobs.map((job, index) => (
                <article className="job" key={job.id}>
                  <div className="job-meta">
                    <span
                      className={`timeline-dot ${index === 0 ? "current" : ""}`}
                      aria-hidden="true"
                    />
                    <p>{job.period}</p>
                    <span className="job-index">0{index + 1}</span>
                  </div>
                  <div className="job-content">
                    <div className="job-title">
                      <div>
                        <h3>{job.role}</h3>
                        <p className="company">{job.company}</p>
                      </div>
                      {index === 0 && (
                        <span className="current-badge">{ui.present}</span>
                      )}
                    </div>
                    <details className="job-details" open={index === 0}>
                      <summary>
                        {ui.responsibilities}
                        <ChevronDown size={17} aria-hidden="true" />
                      </summary>
                      <ul>
                        {job.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="skills" className="section container">
          <Heading
            label={ui.stackLabel}
            title={ui.stackTitle}
            intro={ui.stackIntro}
          />
          <div className="skills-grid">
            {cv.skills.map((skill, index) => {
              const Icon = icons[index];
              return (
                <article className="skill-card" key={skill.id}>
                  <div className="card-icon">
                    <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{skill.title}</h3>
                  <Tags items={skill.tags} />
                  <p>{skill.note}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section id="proyectos" className="section section-surface">
          <div className="container">
            <Heading
              label={ui.projectsLabel}
              title={ui.projectsTitle}
              intro={ui.projectsIntro}
            />
            <div className="projects-grid">
              {cv.projects.map((project, index) => (
                <article className="project-card" key={project.id}>
                  <div className="project-top">
                    <span className="mono-label">{ui.projectContext}</span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <Tags items={project.tags} />
                  <details className="project-details">
                    <summary>
                      {ui.details}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </summary>
                    <dl>
                      <dt>{ui.problem}</dt>
                      <dd>{project.problem}</dd>
                      <dt>{ui.contribution}</dt>
                      <dd>{project.contribution}</dd>
                      <dt>{ui.outcome}</dt>
                      <dd>{project.outcome}</dd>
                    </dl>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="formacion" className="section container">
          <Heading label={ui.educationLabel} title={ui.educationTitle} />
          <div className="credentials-grid">
            {cv.credentials.map((item) => (
              <article className={`credential ${item.status}`} key={item.id}>
                <div className="credential-label">
                  {item.status === "earned" ? (
                    <ShieldCheck size={18} aria-hidden="true" />
                  ) : (
                    <GraduationCap size={18} aria-hidden="true" />
                  )}
                  <span>
                    {
                      ui[
                        item.status as
                          "earned" | "learning" | "course" | "school"
                      ]
                    }
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className="credential-issuer">{item.issuer}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="languages">
            <h3>{ui.languages}</h3>
            <p>{cv.languages}</p>
          </div>
        </section>
        <section id="contacto" className="section contact-section">
          <div className="container">
            <div className="contact-layout">
              <div>
                <p className="eyebrow">{ui.contactLabel}</p>
                <h2>{ui.contactTitle}</h2>
                <p className="section-intro">{ui.contactIntro}</p>
                <a className="contact-email" href={`mailto:${person.email}`}>
                  {person.email}
                  <ArrowUpRight size={24} aria-hidden="true" />
                </a>
                <p className="contact-phone">
                  <Phone size={15} aria-hidden="true" />
                  <a href={`tel:${person.phone}`}>{person.phoneDisplay}</a>
                </p>
                {socialLinks}
              </div>
              <aside className="download-card">
                <Download size={27} strokeWidth={1.4} aria-hidden="true" />
                <h3>{ui.download}</h3>
                <p>
                  {language === "es"
                    ? "La misma experiencia, en un formato simple para compartir."
                    : "The same experience, in a straightforward format to share."}
                </p>
                <a
                  className="button button-primary"
                  href={`${resumeBase}.pdf`}
                  download
                >
                  {ui.downloadPdf}
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a
                  className="download-secondary"
                  href={`${resumeBase}.txt`}
                  download
                >
                  {ui.downloadText}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  className="download-secondary"
                  href={`${resumeBase}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui.print}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-row">
          <a className="footer-brand" href="#inicio">
            Joseph Gavidia<span className="accent">.</span>
          </a>
          <span>{ui.footer}</span>
          <small>{ui.updated}</small>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={`mailto:${person.email}`}
        aria-label={ui.emailLabel}
      >
        <Mail size={20} aria-hidden="true" />
      </a>
    </>
  );
}
