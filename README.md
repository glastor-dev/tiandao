<div align="center">
  <a href="https://github.com/glastor-dev/tiandao">
    <img width="1200" alt="Tiandao Banner" src="https://img.shields.io/badge/TIANDAO-DYNAMIC_GITHUB_METRICS-050505?style=for-the-badge&logo=github" />
  </a>
  <br/>

  <h1>✨ Tiandao</h1>
  <p><strong>Generador de métricas dinámicas SVG y PNG de alto rendimiento para perfiles de GitHub.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Powered_by-GLASTOR®-indigo?style=for-the-badge&logo=react" alt="Glastor Core" />
    <img src="https://img.shields.io/badge/Next.js-16_(Turbopack)-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Render-Satori_SVG-orange?style=for-the-badge&logo=svg" alt="Satori" />
    <img src="https://img.shields.io/badge/Security-Nemesis_Audited-purple?style=for-the-badge&logo=shield" alt="Nemesis" />
    <img src="https://img.shields.io/badge/Runtime-Bun-black?style=for-the-badge&logo=bun" alt="Bun" />
  </p>
</div>

---

## ⚡ Sobre el Proyecto

**Tiandao** es una plataforma moderna desarrollada por **GLASTOR®** para generar infografías y tarjetas de estadísticas dinámicas para perfiles de GitHub. Diseñada para reemplazar soluciones lentas o estáticas, genera imágenes vectoriales **SVG** y **PNG** en tiempo real mediante **Satori**, **Edge Computing** y **Next.js 16 (Turbopack)**.

Cuenta con métricas de código, rachas de commits, análisis de lenguajes, actividad reciente, integraciones externas (WakaTime, LeetCode, Spotify, etc.) y una interfaz web interactiva con previsualización en vivo.

---

## 🚀 Características Principales

- 📊 **Métricas Base 100% Dinámicas:**
  - Repositorios públicos reales y acumulado total de estrellas (`stargazers_count`) y bifurcaciones (`forks_count`).
  - Detección automática de la licencia predominante (`spdx_id`).
  - Conteo de releases públicas, paquetes y patrocinadores asociados.
  - Mini-heatmap de actividad real con los eventos y commits de los últimos 9 días.
- 🔥 **Widget de Commit Streaks (Rachas):**
  - Mide la racha actual (`Current Streak`), récord histórico de racha (`Longest Streak`) y actividad total del año en curso.
- 🎨 **8 Temas Populares:**
  - `dark`, `tokyo-night` 🌌, `catppuccin` ☕, `dracula` 🧛, `nord` ❄️, `cyberpunk` ⚡, `hacker` 💻 y `light` ☀️.
- 🏷️ **Logo, Título y Status Badges:**
  - Personalización de logo de cabecera (`logo`) con protección estricta contra SSRF/XSS.
  - Título personalizado (`title`) para sustituir el clásico *"For user accounts"*.
  - Pill de estado de disponibilidad laboral (`status`) junto al nombre (ej. `🟢 Open to work`, `💼 Available for hire`).
- ⚡ **Presets de 1-Clic & Descarga Directa:**
  - Toolbar con plantillas instantáneas: *Minimalist PRO*, *Full Showcase*, *Cyberpunk* y *DevSecOps*.
  - Descarga directa en el navegador de los archivos `.svg` o `.png` con nombrado automático.
- 🛡️ **Resiliencia & Caché Stale-While-Revalidate:**
  - Sistema de respaldo en memoria que almacena renders exitosos; si la API de GitHub sufre límites de cuota temporales, la imagen sigue disponible sin romperse en el README.
- 🔒 **Pipeline DevSecOps Continuo con Nemesis:**
  - Auditoría automatizada con Gitleaks (secretos), Semgrep (SAST), Trivy (dependencias), higiene de repositorio y carga de reportes SARIF a GitHub Security.

---

## 🛠️ Parámetros de la API (`/api/metrics`)

| Parámetro | Tipo | Por defecto | Descripción |
| :--- | :---: | :---: | :--- |
| `username` | string | `ricsg` | Usuario de GitHub a consultar |
| `theme` | string | `dark` | Tema visual (`dark`, `tokyo-night`, `catppuccin`, `dracula`, `nord`, `cyberpunk`, `hacker`, `light`) |
| `format` | string | `png` | Formato de salida: `svg` o `png` |
| `logo` | string | `""` | URL del logo o avatar de marca para la cabecera (HTTPS validado) |
| `title` | string | `"For user accounts"` | Título descriptivo en la cabecera |
| `status` | string | `""` | Badge pill de estado (ej. `🟢 Open to work`, `💼 Available for hire`) |
| `streak` | boolean | `false` | Activa el módulo de rachas de commits (`Current & Longest Streak`) |
| `languages` | boolean | `false` | Activa el análisis de lenguajes más usados con porcentajes |
| `stargazers` | boolean | `false` | Muestra el desglose de Stargazers & Forks acumulados |
| `habits` | boolean | `false` | Muestra hábitos y días de mayor actividad semanal |
| `licenses` | boolean | `false` | Muestra la distribución de licencias de repositorios |
| `issues` | boolean | `false` | Muestra el total de issues y pull requests |
| `achievements` | boolean | `false` | Muestra los logros de GitHub desbloqueados |
| `isocalendar` | boolean | `false` | Calendario isométrico 3D de contribuciones |

---

## 📋 Ejemplos de Integración en tu Perfil de GitHub

Incrustar tu tarjeta de métricas en tu `README.md` de GitHub es tan simple como copiar una sola línea de código:

### Formato Markdown

```markdown
![Métricas de GitHub](https://tu-dominio-tiandao.vercel.app/api/metrics?username=ricsg&theme=tokyo-night&streak=true&status=🟢+Open+to+work&format=svg)
```

### Formato HTML (Con Enlace Clickeable y Centrado)

```html
<p align="center">
  <a href="https://github.com/ricsg">
    <img src="https://tu-dominio-tiandao.vercel.app/api/metrics?username=ricsg&theme=catppuccin&streak=true&languages=true&format=svg" alt="Métricas Tiandao" />
  </a>
</p>
```

---

## 🎛️ Presets de 1-Clic en la Interfaz

El generador web incluye configuraciones predefinidas optimizadas para diferentes estilos de desarrollador:

- ⚡ **Minimalist PRO:** Vista limpia y compacta enfocada en los indicadores base esenciales.
- 🚀 **Full Showcase:** Activa métricas base, rachas de commits (`streak`), desglose de lenguajes y gráficos de hábitos.
- 🌌 **Cyberpunk:** Tema synthwave fluorescente con módulo de rachas y badge de disponibilidad.
- 🛡️ **DevSecOps:** Tema nórdico frío con análisis de licencias de código abierto e insignias de proyectos.

## 💻 Desarrollo Local

### Requisitos Previos

- [Bun](https://bun.sh/) (recomendado) o Node.js 20+.

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/glastor-dev/tiandao.git
   cd tiandao
   ```

2. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   # Token de GitHub (opcional pero recomendado para mayor cuota de API)
   GITHUB_TOKEN=tu_token_aqui

   # Usuarios autorizados para funciones PRO
   PRO_USERS=glastor-dev
   ```

3. Instala dependencias y corre el servidor:
   ```bash
   bun install
   bun run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con el configurador visual.

---

## 🧪 Pruebas y Calidad de Código

```bash
# Ejecutar suite de pruebas unitarias
bun test

# Verificación estricta de tipos TypeScript
bun run typecheck

# Construir bundle de producción
bun run build
```

---

## 🤝 Contribución

Nos tomamos muy en serio la calidad técnica y el estándar de excelencia del ecosistema GLASTOR. Si deseas contribuir a **Tiandao**, asegúrate de revisar nuestras directrices:

- 📖 [Guía de Contribución](.github/CONTRIBUTING.md)
- ⚖️ [Código de Conducta](.github/CODE_OF_CONDUCT.md)
- 🛠️ [Protocolo de Soporte](.github/SUPPORT.md)

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia **AGPL-3.0**. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

<br/>

<div align="center">
  © 2010-2026 Andrés Antonio Cardoso — GLASTOR®. Todos los derechos reservados.
</div>
