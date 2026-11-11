import type { Metadata } from "next";
import "./globals.css";
import "./project-additions.css";
import "./project-compact-cards.css";

const portfolioIcon =
  "https://www.gstatic.com/bricks/image/a2ebbaaa-17f5-4343-a435-53957e63cea7.png";

export const metadata: Metadata = {
  title: "José Carlos Martínez Blanco | Sistemas, datos y automatización",
  description:
    "Portafolio profesional de José Carlos Martínez Blanco: ingeniería de sistemas, análisis de datos y automatización de procesos.",
  icons: {
    icon: [{ url: portfolioIcon, type: "image/png" }],
    shortcut: [{ url: portfolioIcon, type: "image/png" }],
    apple: [{ url: portfolioIcon, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
