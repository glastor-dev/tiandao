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

- **Navegación Core:** Sistema de rutas adaptado a las necesidades B2B e E-Commerce (Inicio `/`, Tienda `/tienda`, Desarrollo en Rust `/home`).
- **Licencia:** Establecimiento de la licencia `AGPL-3.0` para garantizar la apertura y cooperación del software.
- **Metadata Corporativa:** Actualización de los datos del Founder ("CEO & Arquitecto Jefe") en la sección de Nosotros.

### 🐛 Fixed

- **Base de Datos & Panel Admin:** Resolución de _500 Database Error_ oculto (causado por colisiones de valores vacíos en el índice único de slugs de Postgres) que impedía guardar ediciones de precios en `ProductEditorModal`.
- **Interacciones de UI:** Refactorización de inputs numéricos en el administrador para admitir decimales fluidos (`step="any"`) previniendo cuelgues locales por `NaN`.

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
