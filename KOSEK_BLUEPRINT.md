# KOSEK BLUEPRINT — Go Functional Smart (Landing Page Flagship)

 Cliente Go Functional Smart (distribución oficial vía Buda Market)
 Canal de Conversión `httpswww.budamarket.com.ar`
 Agencia  Dirección KOSEK — Tech Lead & UIUX Architecture
 Ejecución Claude Code
 Estética Objetivo Editorial Apothecary  Swiss Clinical Minimalism (100% Anti-AI-Slop)

---

## 1. STACK TÉCNICO OBLIGATORIO Y QUALITY GATES

- Framework Next.js (App Router, `src` directory), React, TypeScript (`strict true`).
- Estilos Tailwind CSS (CSS variables en `globals.css` + tokens semánticos).
- Animaciones Framer Motion (`framer-motion`) + Smooth Scroll con Lenis (`lenis`).
- Iconografía `lucide-react` con `strokeWidth={1.25}` o `1.5` únicamente para controles funcionales (flechas, cerrar, acordeón). Prohibido usar íconos decorativos en cards.
- Fuentes (`nextfontgoogle`)
  - `--font-serif` `Newsreader` (weights 300, 400, 500 + italic) — Titulares editoriales y citas de marca.
  - `--font-sans` `Plus Jakarta Sans` (weights 400, 500, 600) — Interfaz, cuerpo de texto y CTAs.
  - `--font-mono` `IBM Plex Mono` (weights 400, 500) — Índices, tablas nutricionales, dosis, precios (`tabular-nums`) y códigos de lotereferencia.
- Deploy target Vercel.
- Gate obligatorio al finalizar cada fase
  1. `npx tsc --noEmit` → 0 errores.
  2. `npm run lint` → 0 errores  0 warnings críticos.
  3. `npm run build` → compilación limpia de producción.

---

## 2. MANIFIESTO ANTI-OLOR-A-IA (REGLAS INQUEBRANTABLES DE UIUX)

Claude Code debe seguir estas reglas de dirección de arte sin excepciones

### PROHIBIDO (Zero AI Slop)
1. NO gradientes decorativos ni luces difusas Prohibido `bg-gradient-to-` de adorno, glowing orbs, `blur-3xl` de fondo o fondos `slate-950` azulados.
2. NO cards SaaS genéricas Prohibido el patrón de ícono dentro de cuadradito con fondo tintado + título bold + párrafo centrado ni sombras exageradas (`shadow-xl`, `shadow-2xl`).
3. NO badges pill gritones ni emojis Cero emojis (✨, 🚀, 🌿, 💡) en todo el sitio. Las etiquetas técnicas van en `font-mono text-[11px] uppercase tracking-[0.14em]` sin bordes neón.
4. NO centrado universal Evitar apilar secciones centradas una debajo de la otra. Usar grillas suizas asimétricas de 12 columnas (`lggrid-cols-12`) con alineación izquierda rigurosa, columnas de etiqueta (`lgcol-span-3`) y contenido (`lgcol-span-9`), separadas por líneas finas de `1px`.
5. NO copy de relleno Prohibido usar frases hechas tipo Llevá tu bienestar al siguiente nivel, Descubrí el poder de... o Revolucioná tu salud. Usar exclusivamente lenguaje técnico, calmo, directo y verificable.

### OBLIGATORIO (Firma Visual KOSEK — Editorial Apothecary)
- Sistema de Color (Tokens CSS en `globals.css`)
  - `--bg-canvas #F4F3EE` (Piedra Papel Mate — fondo principal)
  - `--bg-surface #ECEAE2` (Hueso Mineral — marcos fotográficos de estudio y fondos secundarios)
  - `--bg-card #FAF9F5` (Blanco Papel — paneles y sheets)
  - `--bg-dark #141513` (Grafito Orgánico — contraste editorial para CienciaSinergia y Footer)
  - `--ink-primary #171816` (Tinta Carbón)
  - `--ink-secondary #595B55` (Gris Piedra)
  - `--ink-on-dark #EAE8E1` (Marfil sobre oscuro)
  - `--accent-botanical #1E3A2F` (Verde Boticario Profundo — acento de marca contenido)
  - `--accent-amber #8F5B2D` (Ámbar Laboratorio — uso mínimo para etiquetas de ahorro o AMPM)
  - `--hairline rgba(23, 24, 22, 0.12)` y `--hairline-dark rgba(234, 232, 225, 0.14)`
- Geometría refinada Contenedores editoriales con bordes `rounded-2xl`  `rounded-3xl` solo en bloques protagonistas, botones y Sheets; uso de divisores arquitectónicos `border-t border-[var(--hairline)]` para estructurar la lectura como una publicación impresa de lujo (referencia estética Aesop, Seed, Diptyque).
- Glassmorphism quirúrgico Solo en el Navbar flotante al scrollear (`bg-[#F4F3EE]80 backdrop-blur-md border-b border-[var(--hairline)]`) y en controles flotantes mínimos.
- Movimiento contenido Curva única `EASE_KOSEK = [0.16, 1, 0.3, 1]`. Revelados sobrios (`opacity 0 - 1`, `y 18 - 0`, `duration 0.75`), líneas divisoras que se trazan (`scaleX 0 - 1`) y parallax fotográfico suave (`useScroll` + `useTransform` dentro de `overflow-hidden`). Cero rebotes (`spring` exagerados prohibidos).

### DIRECTIVA DE MOTION DESIGN (SCROLL STORYTELLING NIVEL AWWWARDS)
No te limites a `whileInView` con fade-in básicos. Quiero coreografías ligadas activamente al scroll (`useScroll` + `useTransform` + `useSpring`) que se sientan físicas, fluidas a 60fps y llamen la atención por precisión, nunca por exageración:

1. **Barra de progreso editorial ultra-fina:** Una línea de `1.5px` fija debajo del Navbar ligada a `useScroll().scrollYProgress` con `useSpring({ stiffness: 140, damping: 24 })`.
2. **Hero con profundidad cinematográfica al scrollear:**
   - Entrada inicial con *masked clip-path reveal* (`clipPath: inset(100% 0% 0% 0%) -> inset(0% 0% 0% 0%)`) para las fotos y *split-line reveal* (`overflow-hidden` + `y: 110% -> 0%`) para el titular.
   - Al empezar a bajar, la imagen del Hero hace un sutil zoom-out (`scale: 1.08 -> 1`) + parallax vertical (`y: 0 -> -40px`) mientras el bloque de texto se desliza a distinta velocidad.
3. **Manifiesto con "Scroll-Scrubbed Text Highlight" (Efecto Apple / Seed):**
   - En `PhilosophySection` (la cita oficial sobre las "dosis simbólicas"), dividí el texto por palabras y atá la `opacity` de cada palabra (`0.18 -> 1`) al progreso real del scroll (`useScroll({ target, offset: ["start 0.8", "end 0.45"] })`). A medida que el usuario scrollea, la frase se va "encendiendo" palabra por palabra.
4. **Transición cromática suave entre Claro y Oscuro:**
   - En el paso hacia las secciones oscuras (`#141513`), aplicá un `scale` sutil de entrada al contenedor (`0.96 -> 1` con `rounded-3xl -> rounded-none` atado al scroll) para que el cambio de atmósfera se sienta inmersivo y arquitectónico.
5. **Vitrina de Productos con Reveal por Cortina + Hover Táctil:**
   - Cada `<StudioMedia>` entra revelando con `clipPath` + ligero `scale: 1.12 -> 1.0`.
   - En desktop, aplicá un micro-parallax asimétrico entre las 3 columnas de `CatalogSection` (ej. la columna central scrollea apenas 24px desfasada respecto a los laterales).
   - Hover limpio en cards: imagen escala suavemente a `1.04`, la flecha `↗` se desplaza en diagonal (`x: 3, y: -3`) y aparece un subrayado animado de izquierda a derecha.
6. **Sticky Storytelling en Timeline / GO RESET:**
   - Columna izquierda `lg:sticky lg:top-28` fija con un indicador numérico/progreso vivo que acompaña mientras los bloques de la derecha avanzan al scrollear.
7. **Reglas estrictas de rendimiento y criterio:**
   - Animar **solo** `transform`, `opacity` y `clipPath` (cero reflows de `width`/`height`/`top`).
   - Respetar `useReducedMotion()` para accesibilidad y desactivar parallax pesado en mobile (`< 768px`) para mantener 60fps clavados.
   - Prohibido el uso de `bounce` exagerados o vibraciones; todo con inercia sedosa (`[0.16, 1, 0.3, 1]` o springs amortiguados).
---

## 3. ARQUITECTURA DE DATOS REALES (`srcdataproducts.ts`)

Todos los textos, valores nutricionales, precios y URLs viven centralizados en `srcdataproducts.ts` (tipados con interfaces estrictas en `srctypescatalog.ts`). Prohibido hardcodear datos dentro de componentes.

### Condiciones Comerciales Oficiales (Buda Market)
- Tienda oficial de despacho `httpswww.budamarket.com.arpor-marcasgo-smart`
- Beneficios `2 cuotas sin interés desde $50.000` · `10% OFF por transferencia` · `Envío gratis desde $180.000`
- Co-branding oficial Fórmulas by Agus Dandri · Método GO RESET™ por Vanessa Pekerman (Coaching Nutricional).
- Respaldo y Aviso Legal obligatorio Elaborado bajo normativa ANMAT  INAL · Sin TACC · Suplementa dietas insuficientes. Consulte a su médico yo farmacéutico.

### Catálogo Core (3 Fórmulas Principales + 1 Complemento)

1. `colageno-puro` — Colágeno Puro (by Agus Dandri)
   - Código `GFS-01`
   - Precio lista (Buda Market) `$44.590`  Transferencia (10% OFF) `$40.131`
   - URL de compra `httpswww.budamarket.com.arproductoscolageno-go-functional-by-agus-dandri-ihbd8`
   - Formato 300 g en polvo (30 porciones de 10 g) · Sin sabor · Sin TACC.
   - Ingrediente único 100% péptidos bioactivos de colágeno hidrolizado tipo I y III (GelcoPEP®). Sin maltodextrina, sin azúcares, sin saborizantes ni colorantes.
   - Tabla nutricional (por porción de 10 g) Proteínas de alto valor biológico ` 9 g` (glicina, prolina, hidroxiprolina, arginina, lisina) · Carbohidratos `0 g` · Azúcares `0 g` · Grasas totales `0 g`.
   - Protocolo de uso 1 scoop diario (10 g) para romper el ayuno o antes de dormir. Solubilidad instantánea en agua a temperatura ambiente, café, infusiones o licuados. Regla crítica no mezclar en líquidos por encima de 80°C para evitar degradación.
   - Enfoque funcional Firmeza y elasticidad dérmica, articulaciones, tendones, tejido conectivo y estructura vascular.

2. `vitamina-c-pura` — Vitamina C Pura (by Agus Dandri)
   - Código `GFS-02`
   - Precio lista (Buda Market) `$32.590`  Transferencia (10% OFF) `$29.331`
   - URL de compra `httpswww.budamarket.com.arproductosvitamina-c-pura-by-agus-dandri-go-functional-smart-7kgii`
   - Formato 300 g en polvo con dosificador · Sin sabor · 100% Vegana · Sin TACC.
   - Ingrediente único 100% ácido ascórbico puro, sin excipientes ni saborizantes.
   - Tabla nutricional (por porción de 1 g) Vitamina C `1000 mg (2222% IDR)` · Azúcares `0 g` · Grasas `0 g` · Sodio `0 mg`.
   - Protocolo de uso (Dosis funcional progresiva) Tomar en ayunas y esperar 15 a 30 minutos antes de ingerir alimentos. Semana 1 `1000 mgdía` (2 cucharaditas del envase). Desde Semana 3 escalable entre `2000 y 5000 mgdía` según tolerancia digestiva, dividido entre mañana y tarde.
   - Enfoque funcional Cofactor obligatorio (switch metabólico) para la síntesis de fibras de colágeno, escudo antioxidante celular y soporte inmune.

3. `citrato-magnesio-500` — Citrato de Magnesio 500
   - Código `GFS-03`
   - Precio lista (Buda Market) `$12.800`  Transferencia (10% OFF) `$11.520`
   - URL de compra `httpswww.budamarket.com.arproductoscitrato-de-magnesio-500-go-functional-smart-0l538`
   - Formato Cápsulas vegetales · Apto veganos · Sin TACC.
   - Tabla nutricional (por cápsula) Citrato de Magnesio `500 mg` (`80 mg` de magnesio elemental puro · `31% IDR`).
   - Protocolo de uso Toma nocturna (o post-entrenamiento según indicación profesional) para favorecer relajación neuromuscular y descanso reparador.
   - Enfoque funcional Sistema nervioso, función muscular, recuperación física, salud ósea y calidad de sueño.

4. (Complemento discreto en sección de catálogomodal) `detox-blend` — Go Smart Detox Blend
   - Código `GFS-04` · Cúrcuma, canela y jengibre · `$4.750`
   - URL de compra `httpswww.budamarket.com.arproductosgo-smart-detox-blend`

### Combos Sinérgicos Oficiales (Para el Selector de Protocolo)

1. Combo Sinérgico (Colágeno + Vitamina C)
   - Objetivo Piel, cabello, uñas, articulaciones y síntesis real de colágeno.
   - Precio lista `$77.180` · Financiación `2 cuotas sin interés de $38.590` · Transferencia `$69.462`
   - URL `httpswww.budamarket.com.arproductoscombo-sinergico-colageno-vitamina-c-1hhd9`
2. Combo GO — Sistema Completo (Colágeno + Vitamina C + Citrato de Magnesio)
   - Objetivo Protocolo Integral 360° (síntesis tisular AM + recuperación y descanso PM).
   - Precio lista `$82.000` (antes `$89.980` — 9% OFF) · Financiación `2 cuotas sin interés de $41.000` · Transferencia `$73.800`
   - URL `httpswww.budamarket.com.arpor-marcasgo-smart` (constante `COMBO_GO_URL` lista para actualizar con el slug directo cuando se confirme)
3. Protocolo Recuperación & Descanso (Colágeno Puro + Citrato de Magnesio)
   - Objetivo Entrenamiento, articulaciones, recuperación tisular y descanso nocturno.
   - Nota técnica Si se arma con individuales en Buda Market (`$44.590 + $12.800 = $57.390`), deriva a la colección Go Functional Smart en Buda Market con detalle claro de ambos productos.

---

## 4. SISTEMA DE MEDIA LOCAL PLUG-AND-PLAY (`srcdatamedia.ts`)

Dado que las fotosvideos locales finales aún se están produciendo, la arquitectura debe quedar 100% preparada para reemplazo instantáneo sin tocar componentes

- Carpeta reservada `publicmedia`
  - `publicmediahero-still.webp` (o `publicmediahero-loop.mp4`)
  - `publicmediacolageno-puro.webp`
  - `publicmediavitamina-c-pura.webp`
  - `publicmediacitrato-magnesio.webp`
  - `publicmediacombo-sinergico.webp`
  - `publicmediacombo-full.webp`
  - `publicmediametodo-go-reset.webp`
- Componente dedicado `StudioMedia ` (`srccomponentsuiStudioMedia.tsx`)
  - Recibe `mediaKey`, `aspectRatio`, `caption`, `parallax boolean`.
  - Si `src` en `srcdatamedia.ts` es `null` (estado inicial hasta subir los assets), renderiza un marco arquitectónico de estudio editorial sobre fondo `#ECEAE2` con proporción exacta, sutil textura de papelgrilla fina y una ficha tipográfica minimalista en `font-mono` (ej. `FIG. 01 · COLAGENO PURO 300G · 45`) que se ve intencional, elegante y nunca como un cuadro roto gris.
  - En cuanto `src` tenga una ruta válida en `publicmedia...`, renderiza `nextimage` (con `fill`, `object-cover`, `sizes`) o `video autoPlay muted loop playsInline` automáticamente.

---

## 5. ARQUITECTURA DE SECCIONES Y FLUJOS UX

### 5.1. Smooth Scroll & Bloqueo en Modales (`LenisProvider`)
- `srccomponentsprovidersLenisProvider.tsx` expone contexto `{ pauseScroll, resumeScroll }` conectado a la instancia de `Lenis` (`lerp 0.085`, `smoothWheel true`).
- Todo Sheet lateral o Modal llama a `pauseScroll()` al montarseabrirse y `resumeScroll()` al cerrarse (incluyendo tecla `Escape` y click en backdrop), bloqueando también `overflow hidden` y aplicando `data-lenis-prevent` al contenedor scrolleable interno del Sheet para que el scroll dentro de la ficha técnica funcione con fluidez nativa.

### 5.2. Mapa de Secciones (9 Bloques de Ritmo Editorial)

1. Top Bar Discreta + Navbar Flotante (`Navbar.tsx`)
   - Micro-barra superior (`text-[11px] font-mono tracking-wider`) `2 CUOTAS SIN INTERÉS DESDE $50.000 · 10% OFF TRANSFERENCIA · ENVÍO GRATIS DESDE $180.000 — DESPACHO OFICIAL BUDA MARKET`.
   - Navbar limpio con wordmark tipográfico `GO FUNCTIONAL SMART`, 4 enlaces (`Fórmulas`, `Sinergia`, `Protocolo`, `Método GO Reset`) y 1 botón directo `Tienda Oficial ↗` (a `budamarket.com.arpor-marcasgo-smart`). Menú mobile full-height limpio.

2. Hero Editorial Asimétrico (`HeroSection.tsx`)
   - Layout 12 columnas con aire generoso (`min-h-[88svh]`)
     - Izquierda (7 cols) Eyebrow mono `MEDICINA FUNCIONAL · FÓRMULAS PURAS`, titular editorial en `Newsreader` (Pureza clínica. Sin rellenos ni dosis simbólicas.), párrafo breve de posicionamiento y 2 acciones CTA primario sólido `#171816` (`Armar mi protocolo`) + link editorial subrayado (`Explorar fórmulas`).
     - Derecha (5 cols) `StudioMedia mediaKey=hero aspectRatio=45 parallax ` con ficha técnica discreta al pie (`0% ADITIVOS · SIN TACC · ANMAT  INAL`).
   - Línea base de 4 especificaciones de laboratorio separadas por hairlines verticales (`100% Ingrediente Activo`, `0g Azúcares  Maltodextrina`, `Péptidos GelcoPEP®`, `Venta Oficial Buda Market`).

3. Manifiesto y Filosofía ¿Por qué por separado (`PhilosophySection.tsx` — Contraste Oscuro `#141513`)
   - Cita textual oficial en `Newsreader italic` de gran escala
     “No le agregamos vitamina C al colágeno, porque la mayoría de las marcas usa dosis simbólicas. Preferimos que la tomes en la cantidad correcta para que realmente funcione.”
   - Componente Interactivo #1 — Cronobiología de Sinergia (AM  Entreno-Ayuno  PM)
     - Selector minimalista con indicador animado `layoutId` (`01 · MAÑANA  AYUNAS`, `02 · ROMPER AYUNO O PM`, `03 · NOCHE`).
     - Muestra el mecanismo real de cada franja horaria (Vitamina C 15–30 min antes como cofactor enzimático - Colágeno 10 g debajo de 80°C - Magnesio 500 mg para sistema nervioso y descanso) con enlace directo para abrir la ficha técnica de ese producto en el Sheet.

4. Vitrina de Fórmulas Core (`CatalogSection.tsx` + `ProductDetailSheet.tsx`)
   - Grilla editorial limpia de los 3 productos principales (`Colágeno Puro`, `Vitamina C Pura`, `Citrato de Magnesio 500`) + fila horizontal compacta y elegante abajo para el complemento (`Go Smart Detox Blend`).
   - Cada tarjeta muestra índice mono (`01`, `02`, `03`), `StudioMedia aspectRatio=45 `, nombre + co-branding (`by Agus Dandri` donde aplica), 1 línea de valor funcional, precio lista y precio con 10% OFF transferencia en `tabular-nums`, y dos acciones limpias
     - `Ficha técnica y uso` → abre `ProductDetailSheet` (panel lateral derecho `max-w-xl`, pausa Lenis).
     - `Comprar en Buda Market ↗` → enlace directo `target=_blank rel=noopener noreferrer` al producto exacto.
   - Contenido del `ProductDetailSheet` (Tabs internos limpios)
     - Tab 1 Composición & Tabla Nutricional (tabla estilo laboratorio con hairlines y `IBM Plex Mono`, ingredientes, certificaciones Sin TACC  ANMAT-INAL).
     - Tab 2 Protocolo de Toma (dosis exacta, escalado de Vitamina C, regla de `80°C` en colágeno, momento óptimo del día).
     - Tab 3 Sinergia & Dudas (con qué combinarlo y 2-3 preguntas clave del producto).
     - Footer sticky dentro del Sheet con precio, 10% OFF transferencia y CTA directo a Buda Market.

5. Componente Interactivo #2 — Selector de Protocolo en 1 Clic (`ProtocolBuilder.tsx`)
   - Sin formularios molestos. 3 botones de objetivo editorial
     1. `Piel, articulaciones y síntesis de colágeno` → Combo Sinérgico (`$77.180` · 2 cuotas si de `$38.590`).
     2. `Sistema integral 360° (Día + Noche)` → Combo GO Completo (`$82.000` · antes `$89.980` · 9% OFF).
     3. `Recuperación muscular y descanso profundo` → Dúo Colágeno + Magnesio (`$57.390` combinados).
   - Transición suave (`AnimatePresence mode=wait`) hacia una ficha editorial horizontal que desglosa qué incluye, horario exacto AMPM, desglose de preciocuotas y botón directo al checkout en Buda Market.

6. Bloque Editorial Método GO RESET™ (`GoResetSection.tsx` + `GoResetModal.tsx`)
   - Dedicado al acompañamiento de 30 días creado por Vanessa Pekerman (Coaching Nutricional).
   - Estructura asimétrica narrativa + `StudioMedia mediaKey=goReset ` + lista arquitectónica numerada (`01` a `04`) con los 4 pilares reales Alimentación Inteligente, Descanso Inteligente, Manejo del Estrés y Movimiento Inteligente.
   - Botón `Explorar el método (30 días)` que abre un Modal limpio con el detalle de los pilares sin ensuciar el scroll principal.

7. Horizonte de Constancia (`TimelineSection.tsx`)
   - 3 columnas editoriales con líneas horizontales que explican expectativas realistas (sin promesas mágicas)
     - `01 · CORTO PLAZO (Semanas 1–3)` — Tolerancia digestiva, adaptación de dosis, energía sostenida y calidad de descanso.
     - `02 · MEDIANO PLAZO (Mes 1–3)` — Hidrataciónfirmeza dérmica, recuperación post-esfuerzo y confort articular.
     - `03 · LARGO PLAZO (+3 Meses)` — Soporte estructural sostenido y pausas conscientes según protocolo profesional.

8. Preguntas Frecuentes (`FaqSection.tsx`)
   - Acordeón minimalista (2 columnas en desktop título sticky a la izquierda, ítems con hairlines a la derecha) cubriendo dudas reales purezaSin TACC, regla de los 80°C, dosis progresiva de Vitamina C, descansos cada 3 meses, envíos y medios de pago en Buda Market, y consulta médica previa.

9. Cierre Editorial + Footer (`Footer.tsx` — Contraste Oscuro `#141513`)
   - CTA final sobrio hacia la colección oficial en Buda Market (`budamarket.com.arpor-marcasgo-smart`).
   - Enlaces a `gosmart.ar`, `@gosmartla`, `budamarket.com.ar` y crédito discreto de diseñoingeniería KOSEK.
   - Aviso legal sanitario obligatorio en bloque tipográfico limpio y legible.

---

## 6. ESTRUCTURA DE CARPETAS PROPUESTA

```text
src
├── app
│   ├── layout.tsx          # Fonts (Newsreader, Plus Jakarta Sans, IBM Plex Mono), Metadata SEO, LenisProvider
│   ├── page.tsx            # Ensamblado de secciones + estado central de SheetModal activo
│   └── globals.css         # Design tokens CSS, estilos base, selección de texto, scrollbar limpio
├── components
│   ├── providers
│   │   └── LenisProvider.tsx
│   ├── layout
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui
│   │   ├── StudioMedia.tsx         # Marcos editoriales  nextimage  video plug-and-play
│   │   ├── HairlineReveal.tsx      # Línea divisora animada on-scroll
│   │   ├── TextReveal.tsx          # Revelado tipográfico limpio
│   │   └── ProductDetailSheet.tsx  # Sheet lateral con tabs + bloqueo de Lenis
│   └── sections
│       ├── HeroSection.tsx
│       ├── PhilosophySection.tsx   # Manifiesto + Cronobiología AMPM
│       ├── CatalogSection.tsx      # Vitrina 3 core + complemento Detox Blend
│       ├── ProtocolBuilder.tsx     # Selector de objetivo 1 clic - Combos Buda Market
│       ├── GoResetSection.tsx      # Método GO RESET™ (Vanessa Pekerman) + Modal
│       ├── TimelineSection.tsx     # Horizonte de constancia real
│       └── FaqSection.tsx          # Acordeón minimalista
├── data
│   ├── media.ts            # Rutas de publicmedia (null por defecto - marco de estudio)
│   ├── products.ts         # Catálogo real, tablas nutricionales, combos y URLs de Buda Market
│   └── content.ts          # Copy editorial, cronobiología, pilares GO Reset y FAQs
└── types
    └── catalog.ts          # Interfaces TypeScript estrictas