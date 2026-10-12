# 🛡️ Política de Seguridad & Gestión de Vulnerabilidades (Security Policy)

En **GLASTOR®** y el proyecto **Tiandao**, la seguridad de las aplicaciones y la protección de los datos de los usuarios son una prioridad fundamental. Agradecemos la colaboración de la comunidad de ciberseguridad y desarrolladores para mantener nuestro software seguro y resiliente.

---

## 📦 Versiones Soportadas

Actualmente brindamos parches de seguridad activos a las siguientes versiones:

| Versión | Estado de Soporte |
| :--- | :--- |
| `0.1.x` (Rama `master` / Latest) | :white_check_mark: Soportada activamente |
| `< 0.1.0` | :x: No soportada |

---

## 🚨 Reporte Responsable de Vulnerabilidades (Responsible Disclosure)

**Por favor, NO abras issues públicos en GitHub para reportar vulnerabilidades de seguridad no resueltas.**

Si descubres una vulnerabilidad potencial o falla de seguridad en Tiandao, sigue este procedimiento:

1. **GitHub Private Vulnerability Reporting (Recomendado):**
   - Dirígete a la pestaña [Security > Advisories](https://github.com/glastor-dev/tiandao/security/advisories) en el repositorio de GitHub.
   - Haz clic en **"Report a vulnerability"** para abrir un reporte privado y cifrado directamente con los mantenedores del proyecto.

2. **Canal Alternativo / Contacto Directo:**
   - Si la herramienta privada no está disponible, envía un correo detallado a:  
     `security@glastor.dev` (o al mantenedor en `andres@glastor.dev`).
   - Asunto: `[VULNERABILITY] Tiandao - <Breve descripción>`.

---

## 📋 ¿Qué debe incluir tu reporte?

Para ayudarnos a verificar y solucionar el problema con la mayor rapidez posible, incluye:
- **Descripción clara del problema:** Tipo de vulnerabilidad (ej. SSRF, XSS, Bypass de Autenticación, Inyección, etc.).
- **Pasos para reproducir (PoC):** Código de ejemplo, parámetros de consulta HTTP o scripts que permitan reproducir la incidencia de manera controlada.
- **Impacto potencial:** Qué recursos, tokens o datos podrían verse afectados si es explotada.
- **Sugerencias de mitigación (opcional):** Propuestas o referencias para resolver la vulnerabilidad.

---

## ⏱️ Nuestro Compromiso de Respuesta (SLA)

- **Confirmación de recepción:** Responderemos en un plazo máximo de **48 horas laborables**.
- **Evaluación y Triage:** Analizaremos y clasificaremos la severidad (CVSS) en un plazo de **5 días laborables**.
- **Resolución y Publicación:** Trabajaremos en un parche correctivo de manera coordinada antes de publicar cualquier Security Advisory público.

---

© 2010-2026 Andrés Antonio Cardoso — GLASTOR®. Todos los derechos reservados.
