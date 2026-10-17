# Changelog

<p align="center">
  <img src="https://img.shields.io/badge/Format-Keep%20a%20Changelog-blue.svg" alt="Keep a Changelog">
  <img src="https://img.shields.io/badge/Versioning-SemVer%202.0.0-green.svg" alt="Semantic Versioning">
  <img src="https://img.shields.io/badge/Status-Maintained-success.svg" alt="Maintenance Status">
</p>

---

## Acerca de este Changelog

Todos los cambios notables en **Tiandao** son documentados en este archivo.

Este proyecto se adhiere a:

- **Formato:** [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
- **Versionado:** [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

### Categorías de Cambios

- **Added** ✨ - Nuevas características o funcionalidades
- **Changed** 🔄 - Cambios en funcionalidades existentes
- **Deprecated** ⚠️ - Características que serán eliminadas en el futuro
- **Removed** 🗑️ - Características eliminadas en esta versión
- **Fixed** 🐛 - Correcciones de errores
- **Security** 🔒 - Correcciones de vulnerabilidades de seguridad

---

## [Unreleased]

### ✨ Added

- **Métricas Base 100% Dinámicas:** Módulo de estadísticas base (`fetchBaseData`) en `src/plugins/base/index.ts` que extrae en tiempo real repositorios públicos, preferencia de licencia calculada por frecuencia (`spdx_id`), conteo de releases, paquetes publicados, sponsors, total de estrellas acumuladas y forks acumulados.
- **Actividad Reciente (Mini Heatmap):** Renderizado de los 9 bloques de actividad reciente mapeando los eventos y commits reales de los últimos 9 días del usuario.
- **Personalización de Logo y Título:** Soporte para parámetros `logo` (URL de imagen/logo) y `title` (título personalizado de cabecera) en la API de métricas y el configurador web con previsualización en vivo.
- **Widget de Commit Streaks:** Módulo de rachas de GitHub (`StreakModule` y `fetchStreakData`) con cálculo de racha actual (`Current Streak`), racha histórica máxima (`Longest Streak`) y total de contribuciones anuales con soporte GraphQL y fallback REST.
- **Paleta de 5 Nuevos Temas Populares:** Incorporación de temas `tokyo-night`, `catppuccin` (Mocha), `dracula`, `nord` y `cyberpunk` (synthwave) tanto en el generador SVG como en el selector UI, ampliando la biblioteca a 8 temas disponibles.
- **Toolbar de Presets de 1-Clic:** Plantillas preconfiguradas en el panel web (*Minimalist PRO*, *Full Showcase*, *Cyberpunk*, *DevSecOps*) para activar combinaciones recomendadas con un solo clic.
- **Descarga Directa de SVG y PNG:** Botones de descarga en el cliente que generan y descargan el archivo formateado (`tiandao-metrics-{usuario}.svg/png`) sin recargar la página.
- **Status Badge de Disponibilidad:** Parámetro `status` para incrustar un pill decorativo de estado personalizable (ej. `🟢 Open to work`, `💼 Available for hire`).
- **Pipeline DevSecOps con Nemesis:** Nuevo workflow `.github/workflows/security-audit.yml` y configuración `.nemesis.yml` para auditoría continua de secretos (Gitleaks), código estático SAST (Semgrep), dependencias SCA (Trivy), higiene de repositorio y reportes SARIF.
- **Caché en Memoria Resiliente (SWR):** Mecanismo Stale-While-Revalidate en memoria que almacena los renderizados exitosos para prevenir imágenes rotas si la API de GitHub sufre límites de cuota temporales.
- **Suite de Pruebas Unitarias:** Nuevos tests unitarios en `__tests__/plugins.test.ts` para verificar la extracción y cálculo de rachas (`fetchStreakData`), alcanzando 11 pruebas automatizadas exitosas.

### 🔄 Changed

- **Identidad de Marca:** Actualización de la barra de navegación superior izquierda con el sello corporativo **GLASTOR®**.
- **Localización al Español:** Traducción del encabezado principal en la UI a *"Perfil SVG Dinámico para GitHub"*.

### 🐛 Fixed

- **Tolerancia a Fallos en GitHub API:** Fallback automático a peticiones públicas sin cabecera `Authorization` cuando el `GITHUB_TOKEN` configurado responde `401 Bad credentials` (token expirado o inválido), impidiendo que las métricas caigan a cero.

### 🔒 Security

- **Validación Estricta de URLs de Imagen (SSRF/XSS):** Sanitización y validación exhaustiva de URLs externas en el parámetro `logo` (`isValidImageUrl`) para restringir protocolos a HTTP/HTTPS y formatos seguros de imagen.

---

## [1.0.0] - 2026-07-05

**Nombre del Release:** "Fundación de Arquitectura y Diseño Awwwards"
**Tipo de Release:** Major Stable Release

### 🎉 Highlights del Release

Versión inicial de producción para el ecosistema completo de la agencia GLASTOR. Establece la arquitectura base del Frontend (Next.js 16, React 19, Tailwind v4, Framer Motion) y las bases del Backend de ultra alto rendimiento en Rust.

### ✨ Added

#### Core Frontend & Estética

- **Motor de Renderizado:** Integración completa de React 19 con Next.js (App Router) para builds ultra-rápidos y SSR/SSG.
- **Diseño Premium (Brutalismo Tecnológico):**
  - Implementación de paleta cromática restringida (`#050505` base, `#00ff66` acento).
  - Tipografía responsiva fluida (Clamp) usando Inter y clases monoespaciadas.
- **Cinemática y Micro-interacciones:**
  - Sistema de _Smooth Scrolling_ con Lenis.
  - Animaciones inerciales, _MaskedReveals_, y transiciones avanzadas mediante Framer Motion.
- **Componentes Estructurales:**
  - `Header` interactivo con efecto de glassmorphism y botón CTA hacia WhatsApp.
  - `Footer` con métodos de pago oficiales (Visa, Mastercard, Tether, Bitcoin) enlazados.
  - Enlace oficial a Data Fiscal AFIP implementado con normativas visuales.
- **Secciones de Negocio:**
  - "Configurador B2B" dinámico para estimación de presupuestos modulares.
  - Integración nativa con Cal.com para agenda de auditorías mediante enlaces HTML puros.
  - "Founders Section" y "Anti-Timeline" para reforzar el storytelling corporativo.

#### SEO Técnico y Accesibilidad (WCAG AAA)

- Inyección de etiquetas `robots.txt` y `sitemap.xml` dinámicos.
- Marcado Schema.org (JSON-LD) para metadatos empresariales.
- Etiquetas Meta Fallback y OpenGraph en `index.html`.
- Contraste visual garantizado superior a 7:1 y anillos de foco de teclado adaptables.

#### Infraestructura y Configuración de Herramientas

- **Linter & Formatter:** Biome (para reemplazo de Prettier/ESLint) y Oxlint configurados.
- **Gestión de dependencias:** Configuración base usando Bun.
- **Monorepo Structure:** Estructura unificada para `/frontend` (React) y `/backend` (Rust).

### 🐛 Fixed

- Resolución de conflictos en hooks de React detectados por Oxlint.
- Refactorización de tipos `any` en TypeScript (`icon: string`) en `PretextMasonryGrid`.
- Redirección forzada nativa para botones de Cal.com evadiendo bloqueadores de anuncios (AdBlockers).
- Limpieza de sub-repositorios anidados en la estructura git inicial (`backend/.git`).

### 🔒 Security

- Reubicación de archivos de variables de entorno `.env` en el `.gitignore`.
- Botones de pagos y enlaces legales ejecutados con atributos `rel="noopener noreferrer"`.
- Cumplimiento de enlace ISO 27001 visual en pie de página.

---

## Enlaces & Recursos

- 📖 [README.md](README.md) - Documentación Principal
- 🛠️ [DESIGN_RULES.md](../DESIGN_RULES.md) - Reglas de Diseño y Arquitectura
