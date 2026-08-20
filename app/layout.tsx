import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "José Carlos Martínez Blanco | Sistemas, datos y automatización", description: "Portafolio profesional de José Carlos Martínez Blanco: ingeniería de sistemas, análisis de datos y automatización de procesos.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
