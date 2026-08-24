import EcosystemHero from "../components/EcosystemHero";
import ProjectGallery from "../components/ProjectGallery";
import TransformationFlow3D from "../components/TransformationFlow3D";
import SiteHeader from "../components/SiteHeader";
import MotionController from "../components/MotionController";
import DynamicCursor from "../components/DynamicCursor";
import ContactModal from "../components/ContactModal";
import ContactTrigger from "../components/ContactTrigger";
import { experience, formation, services, tools } from "../data/portfolio";
import { FaChartColumn, FaFileExcel } from "react-icons/fa6";
import { MdApi } from "react-icons/md";
import { SiFastapi, SiFigma, SiLaravel, SiLooker, SiMake, SiNotion, SiPostgresql, SiPydantic, SiPytest, SiPython, SiReact, SiSqlalchemy, SiSqlite, SiSwagger, SiTypescript, SiVercel, SiVite, SiZapier } from "react-icons/si";

const toolIcons = {
  "Power BI": FaChartColumn,
  "Looker Studio": SiLooker,
  Excel: FaFileExcel,
  Zapier: SiZapier,
  Make: SiMake,
  API: MdApi,
  React: SiReact,
  Laravel: SiLaravel,
  Python: SiPython,
  SQL: SiPostgresql,
  Figma: SiFigma,
  Notion: SiNotion,
  TypeScript: SiTypescript,
  Vite: SiVite,
  FastAPI: SiFastapi,
  SQLAlchemy: SiSqlalchemy,
  SQLite: SiSqlite,
  Pydantic: SiPydantic,
  Pytest: SiPytest,
  Swagger: SiSwagger,
  Vercel: SiVercel,
} as const;

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <MotionController />
      <DynamicCursor />
      <ContactModal />

      <EcosystemHero />

      <TransformationFlow3D />

      <section id="sobre-mi" className="about section-pad section-shell">
        <div data-reveal="up"><p className="eyebrow">Sobre mí</p><h2>Tecnología clara,<br/>resultados reales.</h2></div>
        <div className="about-copy" data-reveal="up" style={{"--reveal-delay":"90ms"} as React.CSSProperties}><p>Combino ingeniería de sistemas, análisis de datos y automatización para convertir necesidades complejas en soluciones digitales útiles, escalables y centradas en las personas.</p><div className="principles"><span>Comunicación sencilla</span><span>Decisiones basadas en datos</span><span>Soluciones fáciles de usar</span></div></div>
      </section>

      <section id="servicios" className="section-pad section-shell"><p className="eyebrow">Cómo puedo ayudarte</p><div className="service-grid">{services.map((service, index) => <article className={index === 1 ? "service-card tinted" : "service-card"} key={service.title} data-reveal="up" style={{"--reveal-delay":`${index*80}ms`} as React.CSSProperties}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><a href="#contacto">Conocer el servicio <span>→</span></a></article>)}</div></section>

      <ProjectGallery />

      <section id="experiencia" className="career section-pad section-shell">
        <div><p className="eyebrow">Trayectoria</p><h2>Experiencia profesional</h2><div className="timeline-list">{experience.map((item,index) => <article className={`career-item${index===0?" current":""}`} key={`${item.role}-${item.period}`} data-reveal="left" style={{"--reveal-delay":`${index*70}ms`} as React.CSSProperties}><time>{item.period}</time><div><h3>{item.role}</h3><p className="career-organization">{item.organization}</p><p>{item.description}</p></div></article>)}</div></div>
        <div><p className="eyebrow">Estudios</p><h2>Formación académica</h2><div className="timeline-list">{formation.map((item,index) => <article className={`career-item${index===0?" thesis-featured":""}`} key={item.title} data-reveal="right" style={{"--reveal-delay":`${index*70}ms`} as React.CSSProperties}><time>{item.period}</time><div><h3>{item.title}</h3><p className="career-organization">{item.institution}</p>{item.thesis&&<div className="thesis-note"><span>Tesis destacada</span><p>{item.thesis}</p></div>}</div></article>)}</div></div>
      </section>

      <section className="tools section-pad section-shell" aria-labelledby="tools-title"><p className="eyebrow">Herramientas</p><h2 id="tools-title">Tecnologías que convierto en resultados.</h2><div className="tool-grid">{tools.map((tool,index) => {const Icon=toolIcons[tool.name as keyof typeof toolIcons];return <div className="tool-card" key={tool.name} tabIndex={0} aria-label={`Herramienta: ${tool.name}`} data-reveal="up" style={{"--tool-color":tool.color,"--reveal-delay":`${(index%6)*45}ms`} as React.CSSProperties}><span className="tool-logo"><Icon aria-hidden="true"/></span><span>{tool.name}</span></div>})}</div></section>

      <section id="contacto" className="contact section-shell"><div><p className="eyebrow light">Próximo paso</p><h2>¿Tienes un proyecto en mente?</h2><p>Conversemos sobre cómo transformar datos y procesos en resultados reales.</p></div><ContactTrigger className="button button-coral">Conversemos <span>→</span></ContactTrigger></section>
      <footer className="footer section-shell"><span className="brand"><span className="brand-mark">JC</span> José Carlos Martínez Blanco</span><span>Tecnología al servicio de las personas.</span><div><ContactTrigger className="footer-contact-trigger">Contacto</ContactTrigger><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>
    </main>
  );
}
