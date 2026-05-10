# Joseph Gavidia — CV Landing Page Design

## 1. Concepto Visual

Landing page single-page para un Cloud DevOps Engineer. Estética dark, técnica y moderna, inspirada en terminales y dashboards cloud. Fondo oscuro profundo con acentos cyan/azul que evocan infraestructura, pipelines y observabilidad. Jerarquía clara: el contenido respira, los elementos clave destacan con brillo sutil. Mobile-first: navegación inferior en móvil, sidebar flotante en desktop. Smooth scroll nativo con anclaje a secciones.

## 2. Paleta de Colores

| Token | Hex | Uso |
|---|---|---|
| `--bg-primary` | `#0B0F19` | Fondo principal |
| `--bg-secondary` | `#111827` | Tarjetas, secciones alternas |
| `--bg-elevated` | `#1F2937` | Hover, elementos elevados |
| `--accent-cyan` | `#22D3EE` | CTAs, links, iconos activos |
| `--accent-blue` | `#3B82F6` | Gradientes, badges |
| `--text-primary` | `#F9FAFB` | Títulos, body principal |
| `--text-secondary` | `#9CA3AF` | Subtítulos, metadatos |
| `--border` | `#374151` | Bordes sutiles |

## 3. Tipografías

- **Headings**: `Inter` (600–800), tracking tight (-0.02em)
- **Body**: `Inter` (400–500), line-height 1.6
- **Mono/Tags**: `JetBrains Mono` (400), para tech stacks, badges, comandos
- **Scale**: Hero 48–64px / H2 28–36px / Body 16px / Small 14px

## 4. Estructura de Secciones

### Hero
- Nombre + título + tagline corto (1 línea)
- CTA primario: "Descargar CV" | CTA secundario: "Ver proyectos"
- Fondo: gradiente radial sutil (`--accent-blue` 5% opacidad)
- Altura: 100vh en desktop, auto en móvil

### About
- Foto circular + bio técnica (3–4 líneas)
- Datos rápidos: ubicación, idiomas, disponibilidad

### Experience
- Timeline vertical: fecha | empresa | rol | bullets técnicos
- Línea conectada en `--accent-cyan`, puntos activos en hover

### Skills
- Grid de categorías: Cloud, CI/CD, IaC, Containers, Scripting
- Cada skill como tag/badge con icono pequeño
- Barra de nivel opcional (subtle)

### Certs
- Tarjetas con logo + nombre + fecha + link verify
- Grid 2–3 columnas según viewport

### Projects
- Cards con imagen/placeholder + título + tech stack + link
- Hover: elevación + borde `--accent-cyan`

### Contact
- Email + LinkedIn + GitHub iconos
- Formulario simple: nombre, email, mensaje (opcional)
- Footer con copyright

## 5. Animaciones Planificadas

| Animación | Trigger | Detalle |
|---|---|---|
| Fade-up | Scroll into view | `opacity 0→1`, `translateY(20px→0)`, 0.5s ease-out |
| Stagger children | Scroll into view | Delay 0.1s entre items de lista/grid |
| Hero text reveal | Load | Secuencial por línea, 0.3s stagger |
| Skill tag pulse | Hover | `scale(1.05)` + shadow glow cyan |
| Nav underline | Hover/Active | Width 0→100% en `--accent-cyan`, 0.2s |
| Scroll progress | Scroll | Barra superior con gradiente cyan→blue |

## 6. Responsive Breakpoints

- Mobile: < 640px (single column, nav bottom)
- Tablet: 640–1024px (2 cols, nav top)
- Desktop: > 1024px (3 cols, nav lateral fija)

## 7. Assets Necesarios

- Foto de perfil (400×400, circular)
- Iconos: Lucide o Heroicons (outline)
- Logos certs: descargar oficiales en SVG/PNG
