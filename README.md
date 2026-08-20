# Portafolio profesional de José Carlos Martínez Blanco

Portafolio web desarrollado con Next.js, React, TypeScript, Three.js y React Three Fiber. Está preparado para despliegue automático en Vercel desde GitHub.

## Requisitos

- Node.js 22.13 o superior
- npm 10 o superior

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Validación

```bash
npm run lint
npm run build
```

## Estructura principal

- `data/portfolio.ts`: servicios, proyectos, experiencia, formación y herramientas.
- `app/page.tsx`: orden general de las secciones.
- `app/globals.css`: sistema visual, responsive y animaciones.
- `components/EcosystemHero.tsx`: portada profesional.
- `components/ProjectGallery.tsx`: tarjetas, filtros y casos de estudio.
- `components/three/`: escenas interactivas con React Three Fiber.
- `public/`: fotografía y recursos visuales alternativos.

## Despliegue en Vercel

1. Importa este repositorio desde Vercel.
2. Mantén la configuración detectada para Next.js.
3. Usa `npm run build` como comando de compilación.
4. No se requieren variables de entorno para la versión actual.

Cada actualización enviada a la rama `main` genera automáticamente un nuevo despliegue de producción.

## WebGL y accesibilidad

Si WebGL está disponible, se cargan las escenas interactivas. En navegadores restringidos se muestran imágenes optimizadas. Las animaciones respetan `prefers-reduced-motion`, y la navegación es accesible mediante teclado.
