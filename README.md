# CSS MOTION LAB — Experiencia Interactiva de CSS Avanzado

**CSS MOTION LAB** es una aplicación web estática, interactiva y de diseño inmersivo desarrollada desde cero para resolver e integrar las cuatro preguntas de la evaluación universitaria de **CSS Avanzado**: Transiciones Interactivas, Transformaciones 2D/3D, Universo Animado Autónomo y Compatibilidad Progresiva con CSS Moderno.

El proyecto ha sido concebido como un laboratorio cinético profesional con navegación fluida de página única (SPA sin recargas), soporte completo para teclado y accesibilidad (`:focus-visible` y `@media (prefers-reduced-motion: reduce)`), e inspectores en vivo que facilitan la revisión docente de cada propiedad CSS evaluada.

---

## 1. Tecnologías Utilizadas

- **HTML5 Semántico:** Estructura accesible (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), atributos ARIA y navegación por teclado.
- **CSS3 Avanzado (100% Nativo):**
  - Variables CSS (`--custom-properties`) y tokens de diseño reutilizables.
  - Transiciones multipropiedad (`transition`, `transition-property`, `transition-duration`, `transition-delay`, `transition-timing-function` con `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out` y `cubic-bezier`).
  - Transformaciones 2D y 3D (`translate()`, `translateZ()`, `scale()`, `rotate()`, `skew()`, `perspective`, `transform-style: preserve-3d`, `rotateX()`, `rotateY()`, `transform-origin`, `backface-visibility`).
  - Animaciones autónomas con 14 reglas `@keyframes` coordinadas (`animation-name`, `animation-duration`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-timing-function`, `animation-play-state`).
  - Compatibilidad progresiva con `@supports`, valores de reserva (fallbacks en cascada), prefijos de proveedor (`-webkit-`, `-moz-`) con el estándar al final, y `@media (prefers-reduced-motion: reduce)`.
- **JavaScript Vanilla (ES6+):** Navegación entre vistas sin recarga, sincronización con hash de URL (`#hub`, `#pregunta-1`..`#pregunta-4`), controles de laboratorio en tiempo real y simuladores de compatibilidad.
- **Gráficos SVG Locales:** Emblema y 6 reliquias vectoriales originales alojadas localmente en `./assets/` sin dependencias externas frágiles.

---

## 2. Estructura de Carpetas

```text
Trabajo_Waos/
├── index.html                        # Punto de entrada principal (apertura directa y GitHub Pages)
├── README.md                         # Documentación general y guía de evaluación
├── compatibilidad.txt                # Informe técnico y tabla de pruebas en 2 navegadores (Pregunta 4)
├── css/
│   ├── variables.css                 # Tokens de color, tipografía, curvas Bezier y sombras
│   ├── base.css                      # Reset, layout global, barra de comando y Menú Principal (Hub)
│   ├── pregunta1-transiciones.css    # Estilos e interacciones de la Pregunta 1 (Transiciones)
│   ├── pregunta2-transformaciones.css# Estilos 2D/3D de la Pregunta 2 (Transformaciones)
│   ├── pregunta3-animaciones.css     # Escena autónoma @keyframes de la Pregunta 3 (Universo Animado)
│   └── pregunta4-compatibilidad.css  # @supports, fallbacks, prefijos y reduced-motion (Pregunta 4)
├── js/
│   └── app.js                        # Navegación SPA, telemetría y controles de laboratorio
└── assets/
    ├── logo-motion-lab.svg           # Emblema vectorial del laboratorio
    ├── artifact-chronos.svg          # Reliquia 01: Astrolabio de Chronos
    ├── artifact-valkyrie.svg         # Reliquia 02: Lanza Supersónica Valkiria
    ├── artifact-nebula.svg           # Reliquia 03: Córtex Sináptico Nebula
    ├── artifact-aegis.svg            # Reliquia 04: Monolito Blindado Aegis
    ├── artifact-solaris.svg          # Reliquia 05: Esfera Estelar Solaris
    └── artifact-hyperion.svg         # Reliquia 06: Teseracto Dimensional Hyperion
```

---

## 3. Cómo Abrir la Página Localmente

No se requiere Node.js, servidores backend, instalaciones ni procesos de compilación:

1. Abre la carpeta del proyecto en tu explorador de archivos.
2. Haz **doble clic directamente sobre `index.html`** para abrirlo en cualquier navegador moderno (Google Chrome, Microsoft Edge, Mozilla Firefox o Safari).
3. Todas las rutas son relativas (`./css/...`, `./js/...`, `./assets/...`), por lo que funciona de inmediato desde el sistema de archivos local (`file://`).

---

## 4. Cómo Publicarla en GitHub Pages

El proyecto está diseñado para funcionar directamente desde la raíz o desde una subruta de repositorio en **GitHub Pages** (`https://usuario.github.io/nombre-repositorio/`):

1. Sube todos los archivos de esta carpeta a un repositorio público en GitHub (asegurándote de que `index.html` quede en la raíz del repositorio).
2. En GitHub, entra a **Settings** → **Pages** en el menú lateral.
3. En **Build and deployment** → **Source**, selecciona **Deploy from a branch**.
4. Elige la rama principal (`main` o `master`) y la carpeta `/ (root)`, y haz clic en **Save**.
5. En unos segundos, GitHub Pages publicará el enlace público listo para compartir con el docente.

---

## 5. Qué Realiza Cada Sección y Dónde Están Implementados los Requisitos CSS

### Menú Principal (`#hub` — `index.html` + `css/base.css`)
- Funciona como centro de comando con una escultura giroscópica 3D en CSS puro, telemetría en tiempo real y **cuatro portales interactivos** con previsualizaciones animadas en miniatura.
- Incluye en la barra superior el botón **"Guía Docente"** (muestra cintas de inspección académica en cada pregunta) y **"Reduced Motion"** (permite probar al instante la reducción de movimiento).

### Pregunta 1 — Transiciones Interactivas (`#pregunta-1` — `css/pregunta1-transiciones.css`)
- **Cámara Comparativa de Curvas de Tiempo (`Líneas 69–196`):** Permite disparar y comparar en paralelo `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out` y `cubic-bezier(0.34, 1.56, 0.64, 1)`, además de calibrar `transition-duration` (`0.45s`, `1.1s`, `2.0s`) y `transition-delay` (`0s`, `0.18s`, `0.40s`).
- **Consola de 6 Módulos Tácticos (`Líneas 204–510`):** Implementa `transition` multipropiedad, cascadas secuenciales con `transition-delay` escalonado (`0.00s` a `0.35s`) y estados diferenciados para `:hover`, `:focus-visible` (navegación por teclado) y `:active` (respuesta háptica al presionar).

### Pregunta 2 — Galería de Transformaciones (`#pregunta-2` — `css/pregunta2-transformaciones.css`)
- **Simulador Interactivo 2D/3D y `transform-origin` (`Líneas 18–112`):** Permite aplicar combinaciones de `translate()`, `scale()`, `rotate()`, `skew()`, `perspective`, `rotateX()` y `rotateY()` mientras se cambia el punto de anclaje `transform-origin` (`center`, `top left`, `top right`, `bottom left`, `bottom right`) visualizado con un marcador luminoso.
- **Catálogo de 6 Reliquias Cósmicas (`Líneas 118–395`):**
  1. *Astrolabio de Chronos:* `perspective: 1100px`, `rotateX(14deg)`, `rotateY(-16deg)`, `translateZ(55px)` y `scale(1.18)`.
  2. *Lanza Supersónica Valkiria:* `skew(-14deg, 4deg)` combinado con `translate(12px, -10px)` y `scale(1.22)` sin afectar la lectura del texto.
  3. *Córtex Sináptico Nebula:* `rotate(-120deg)`, `scale(1.24)` y `translate(0, -8px)`.
  4. *Monolito Blindado Aegis:* Compuertas abatibles con `transform-origin: left center`, `right center` y `center bottom`.
  5. *Esfera Estelar Solaris:* Tarjeta con volteo 3D completo de `rotateY(180deg)` y `backface-visibility: hidden`.
  6. *Teseracto Dimensional Hyperion:* Transformación maestra combinada 2D + 3D.

### Pregunta 3 — Universo Animado Autónomo (`#pregunta-3` — `css/pregunta3-animaciones.css`)
- **Observatorio Astral y Esfera de Dyson (`Líneas 48–455`):** Se ejecuta **100% automáticamente al ingresar** sin requerir intervención del usuario, empleando únicamente CSS puro (sin GIF ni video).
- Combina **14 animaciones `@keyframes` coordinadas** (`q3NebulaBreath`, `q3StarTwinkle`, `q3CometPass`, `q3SingularityPulse`, `q3ShockwaveExpand`, `q3DysonRingOuter`, `q3DysonRingMiddle`, `q3DysonRingInner`, `q3OrbitSpin`, `q3CrystalLevitate`, `q3HorizonGridFlow`, `q3EnergyBeamPulse`, `q3StrobeStep`) demostrando `animation`, `animation-duration`, `animation-delay`, `animation-iteration-count: infinite`, `animation-direction` (`normal`, `reverse`, `alternate`, `alternate-reverse`) y `animation-timing-function` (`linear`, `ease-in-out`, `ease-out`, `cubic-bezier`, `steps(2, start)`).

### Pregunta 4 — CSS Moderno y Compatibilidad (`#pregunta-4` — `css/pregunta4-compatibilidad.css` y `compatibilidad.txt`)
1. **Reglas `@supports` con versión base funcional y mejora moderna (`Líneas 59–127`):**
   - Base funcional sólida y de alto contraste (`#0b1120` / `rgba(11, 17, 32, 0.95)`) declarada primero.
   - Tres mejoras progresivas con `@supports`: desenfoque de cristal `backdrop-filter`, mezcla cromática perceptual `color-mix(in oklch, ...)` y selector relacional `selector(:has(*))`.
2. **Propiedades con valores de reserva (fallback) y prefijos ordenados con el estándar al final (`Líneas 62–64, 98–99, 134–188`):**
   - `-webkit-backdrop-filter` seguido por `backdrop-filter`.
   - `color: #38bdf8` (reserva sólida) + `-webkit-background-clip: text` seguido por `background-clip: text`.
   - `-webkit-mask-image` seguido por `mask-image`.
   - Cascada de color `#064e3b` → `rgba(16, 185, 129, 0.2)` → `oklch(32% 0.08 165 / 0.35)` y `-webkit-user-select` → `-moz-user-select` → `user-select`.
3. **Bloque `@media (prefers-reduced-motion: reduce)` (`Líneas 293–331`):**
   - Reduce `animation-duration` y `transition-duration` a `0.01ms` y detiene todos los bucles infinitos cuando el usuario solicita reducción de movimiento.
4. **Documentación de Compatibilidad en Dos Navegadores (`compatibilidad.txt` y `css/pregunta4-compatibilidad.css` `Líneas 4–38`):**
   - Tabla comparativa entre **Google Chrome / Microsoft Edge (Blink)** y **Mozilla Firefox (Gecko)** (con notas para **Safari WebKit**), detallando qué funciona igual, qué cambia, referencias técnicas a **MDN Web Docs** y **Can I Use**, y lista de verificaciones visuales en navegador.
