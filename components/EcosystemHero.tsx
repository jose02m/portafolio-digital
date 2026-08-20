import Image from "next/image";

export default function EcosystemHero() {
  return <section id="inicio" className="hero section-shell">
    <div className="hero-copy"><p className="eyebrow">Ingeniero de Sistemas · Analista de Datos</p><h1>Menos tareas manuales,<br/><span>más tiempo para decidir.</span></h1><p className="hero-lead">Diseño soluciones digitales que organizan la información, conectan procesos y convierten los datos en decisiones útiles.</p><div className="hero-actions"><a className="button button-primary" href="#proyectos">Ver proyectos</a><a className="text-link" href="#sobre-mi">Conocer mi perfil <span>→</span></a></div><div className="availability"><i/>Disponible para nuevos proyectos <span className="avatar">JM</span></div></div>
    <div className="portrait-stage" aria-label="Retrato profesional de José Carlos Martínez Blanco">
      <div className="portrait-aura"/>
      <div className="portrait-frame"><Image src="/jose-carlos-martinez-blanco.png" width={1024} height={1539} priority unoptimized sizes="(max-width: 960px) 90vw, 48vw" alt="José Carlos Martínez Blanco, ingeniero de sistemas y analista de datos"/></div>
      <span className="floating-cube cube-one"/><span className="floating-cube cube-two"/><span className="floating-cube cube-three"/>
      <div className="portrait-signature"><strong>José Carlos Martínez Blanco</strong><span>Sistemas · Datos · Automatización</span></div>
    </div>
  </section>;
}
