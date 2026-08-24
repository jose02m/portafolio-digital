"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaCommentDots, FaRegCommentDots } from "react-icons/fa6";
import ContactTrigger from "./ContactTrigger";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
] as const;
type LinkId = (typeof links)[number]["id"];

export default function SiteHeader() {
  const [active, setActive] = useState<LinkId>("inicio");
  const [indicatorX, setIndicatorX] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  const positionIndicator = useCallback(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!nav || !link) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setIndicatorX(linkBox.left - navBox.left + linkBox.width / 2 - 3);
  }, [active]);

  useEffect(() => {
    let frame = 0;
    const detectSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + 170;
        let current: LinkId = links[0].id;
        for (const link of links) {
          const section = document.getElementById(link.id);
          if (section && section.offsetTop <= marker) current = link.id;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) current = "contacto";
        setActive(current);
      });
    };
    detectSection();
    window.addEventListener("scroll", detectSection, { passive: true });
    window.addEventListener("resize", detectSection);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", detectSection); window.removeEventListener("resize", detectSection); };
  }, []);

  useLayoutEffect(() => {
    positionIndicator();
    const observer = new ResizeObserver(positionIndicator);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [positionIndicator]);

  return <header className="site-header" aria-label="Navegación principal">
    <a className="brand" href="#inicio" aria-label="Ir al inicio" onClick={() => setActive("inicio")}><span className="brand-mark">JC</span><span>José Carlos</span></a>
    <nav ref={navRef} className="nav-links" aria-label="Secciones">
      {links.map(link => <a key={link.id} href={`#${link.id}`} className={active === link.id ? "active" : ""} aria-current={active === link.id ? "page" : undefined} onClick={() => setActive(link.id)}>{link.label}</a>)}
      <i className="nav-indicator" style={{ transform: `translateX(${indicatorX}px)` }} aria-hidden="true"/>
    </nav>
    <ContactTrigger className="button button-outline header-cta"><span className="chat-icon" aria-hidden="true"><FaRegCommentDots className="chat-outline"/><FaCommentDots className="chat-filled"/></span>Hablemos</ContactTrigger>
  </header>;
}
