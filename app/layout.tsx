import type { Metadata } from "next";
import "./globals.css";
import "./project-additions.css";

export const metadata: Metadata = { title: "José Carlos Martínez Blanco | Sistemas, datos y automatización", description: "Portafolio profesional de José Carlos Martínez Blanco: ingeniería de sistemas, análisis de datos y automatización de procesos.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };

const themeScript = `(function(){try{var saved=localStorage.getItem('portfolio-theme');var theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>; }
