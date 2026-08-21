"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaCircleCheck, FaCircleInfo, FaEye, FaRobot, FaXmark } from "react-icons/fa6";
import { projects, type ProjectCategory } from "../data/portfolio";

const categories = ["Todos", "Automatización", "Analítica y BI", "Desarrollo web"] as const;
type Project = (typeof projects)[number];
type FeaturedProject = Project & Required<Pick<Project, "overview" | "agents" | "ecosystemBefore" | "ecosystemAfter" | "continuity">>;
type StandardProject = Project & Required<Pick<Project, "solution" | "beforeItems" | "afterTitle" | "after" | "beforeTime" | "afterTime" | "impact">>;
type DetailedProject = Project & Required<Pick<Project, "solution" | "beforeItems" | "afterTitle" | "after" | "impact">>;

function isFeaturedProject(project: Project): project is FeaturedProject { return Boolean(project.overview && project.agents); }

function ProjectVisual({ kind }: { kind: string }) {
  return <div className={`project-visual ${kind.toLowerCase().replaceAll(" ", "-")}`} aria-hidden="true"><div className="visual-nav"/><div className="visual-sidebar"/><div className="visual-card one"/><div className="visual-card two"/><div className="visual-chart"><i/><i/><i/><i/><i/></div></div>;
}

function EcosystemVisual() {
  return <div className="project-visual agent-ecosystem-visual" aria-hidden="true"><div className="agent-orbit"/><div className="agent-node agent-node-one"><FaRobot/><span>Matriz</span></div><FaArrowRight className="agent-arrow arrow-one"/><div className="agent-node agent-node-two"><FaRobot/><span>Syllabus</span></div><FaArrowRight className="agent-arrow arrow-two"/><div className="agent-node agent-node-three"><FaRobot/><span>Diseño</span></div><div className="human-validation"><FaCircleCheck/><span>Validación experta</span></div></div>;
}

export default function ProjectGallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const [demoNotice, setDemoNotice] = useState("");
  const visible = useMemo(() => filter === "Todos" ? projects : projects.filter(project => project.categories?.includes(filter as ProjectCategory) || (!project.categories && project.category === filter)), [filter]);
  const showDemoNotice = (title: string) => { setDemoNotice(`La demo de ${title} estará disponible próximamente.`); window.setTimeout(() => setDemoNotice(""), 3200); };

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [selected]);

  return <section id="proyectos" className="projects section-pad section-shell">
    <p className="eyebrow">Proyectos seleccionados</p>
    <div className="section-heading"><h2>Soluciones con impacto medible.</h2><p>Cada proyecto parte de una necesidad real y termina en una mejora que puede comprenderse.</p></div>
    <div className="filters" aria-label="Filtrar proyectos">{categories.map(category => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>)}</div>
    <div className="project-grid">{visible.map(project => <article className={project.featured ? "project-card featured" : "project-card"} key={project.title} data-reveal="up">
      {project.featured ? <EcosystemVisual/> : <ProjectVisual kind={project.category}/>}<div className="project-content">{project.featured && <p className="project-label">Proyecto destacado</p>}<p className="project-category">{project.disciplines}</p><h3>{project.title}</h3><p>{project.description}</p><small>{project.result}</small><div className="project-actions"><button className="info-action" type="button" onClick={() => setSelected(project)} aria-label={`Ver información de ${project.title}`}><FaCircleInfo/><span>{project.featured ? "Ver caso de estudio" : "Información"}</span></button><button type="button" className="demo-action" onClick={() => showDemoNotice(project.title)} aria-label={`Consultar demo de ${project.title}`}><FaEye/><span>Demo próximamente</span></button></div></div>
    </article>)}</div>
    {selected && <ProjectModal project={selected} close={() => setSelected(null)} showDemo={() => showDemoNotice(selected.title)}/>} 
    {demoNotice && <div className="demo-toast" role="status" aria-live="polite"><FaEye/><span>{demoNotice}</span></div>}
  </section>;
}

function ProjectModal({ project, close, showDemo }: { project: Project; close: () => void; showDemo: () => void }) {
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}><div className={`project-modal${project.featured ? " ecosystem-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button className="modal-close" type="button" onClick={close} aria-label="Cerrar"><FaXmark/></button><p className="project-category">{project.disciplines}</p><h2 id="project-modal-title">{project.title}</h2><p className="modal-context">{project.context}</p>{isFeaturedProject(project) ? <FeaturedCase project={project} showDemo={showDemo}/> : <StandardCase project={project as DetailedProject} showDemo={showDemo}/>}</div></div>;
}

function FeaturedCase({ project, showDemo }: { project: FeaturedProject; showDemo: () => void }) {
  return <><section className="solution-first"><span>Visión general de la solución</span><p>{project.overview}</p></section><section className="ecosystem-flow" aria-label="Flujo articulado de agentes"><span>Flujo articulado</span><div>{project.agents.map((agent, index) => <span key={agent.number} style={{display:"contents"}}><article><b>{agent.number}</b><FaRobot/><strong>{agent.name}</strong></article>{index < project.agents.length - 1 && <FaArrowRight/>}</span>)}</div></section><div className="before-after ecosystem-comparison"><article className="before-panel"><span>Antes</span><ul>{project.ecosystemBefore.map(item => <li key={item}><FaXmark aria-hidden="true"/><span>{item}</span></li>)}</ul></article><div className="change-arrow" aria-hidden="true">→</div><article className="after-panel"><span>Después</span><div className="after-heading"><FaCircleCheck/><h3>Ecosistema articulado con trazabilidad y validación humana</h3></div><p>{project.ecosystemAfter}</p><div className="ecosystem-results"><strong>3 agentes</strong><span>Productos conectados</span><span>Supervisión experta</span></div></article></div><section className="agent-modules"><span>Módulos del ecosistema</span><div>{project.agents.map(agent => <article key={agent.number}><b>{agent.number}</b><h3>{agent.name}</h3><p>{agent.description}</p><strong>{agent.metric}</strong><small>{agent.validation}</small></article>)}</div></section><Participation project={project}/><section className="continuity-note"><strong>Continuidad del proceso</strong><p>{project.continuity}</p></section><Skills project={project}/><DemoButton action={showDemo}/></>;
}

function StandardCase({ project, showDemo }: { project: DetailedProject; showDemo: () => void }) {
  const timedProject = project as Partial<StandardProject>;
  return <><section className="solution-first"><span>Solución desarrollada</span><p>{project.solution}</p></section><div className="before-after"><article className="before-panel"><span>Antes</span><ul>{project.beforeItems.map(item => <li key={item}><FaXmark aria-hidden="true"/><span>{item}</span></li>)}</ul></article><div className="change-arrow" aria-hidden="true">→</div><article className="after-panel"><span>Después</span><div className="after-heading"><FaCircleCheck aria-hidden="true"/><h3>{project.afterTitle}</h3></div><p>{project.after}</p>{timedProject.beforeTime && timedProject.afterTime ? <div className="time-shift"><small>De {timedProject.beforeTime}</small><b>→</b><strong>{timedProject.afterTime}</strong></div> : project.outcome ? <div className="outcome-statement">{project.outcome}</div> : null}<p className="impact-line">{project.impact}</p></article></div>{project.features ? <section className="project-features"><span>Funcionalidades</span><div>{project.features.map(feature => <article key={feature}><FaCircleCheck aria-hidden="true"/><p>{feature}</p></article>)}</div></section> : null}<Participation project={project}/><Skills project={project}/><DemoButton action={showDemo}/></>;
}

function Participation({ project }: { project: Project }) { return <section className="participation"><span>Mi participación</span><p>{project.participation}</p></section>; }
function Skills({ project }: { project: Project }) { return <section className="skills-section"><span>Skills y tecnologías</span><div className="tech-tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div></section>; }
function DemoButton({ action }: { action: () => void }) { return <button className="modal-demo-action" type="button" onClick={action}><FaEye/> Demo próximamente</button>; }
