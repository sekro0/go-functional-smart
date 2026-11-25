import type { GalleryImage, MediaAsset, MediaKey } from "@/types/catalog";

// Fotos oficiales (Buda Market / gosmart.ar, CDN Tiendanube 1024×1024) copiadas sin recodificar a /public/media/.
// hasWhiteBg medido por píxel (borde ≥253). bounds = bbox del envase para anclar la sombra de contacto.
// Descartadas por artefactos de render IA en el packaging: combo de los 3 (texto deformado, "80 cápsulas"),
// colágeno + magnesio ("DY Agus Dandre", "en un polvo") y magnesio sobre mármol (texto duplicado).

const img = (
  src: string,
  alt: string,
  kind: GalleryImage["kind"],
  label: string,
  hasWhiteBg: boolean,
  bounds?: GalleryImage["bounds"],
): GalleryImage => ({ src: `/media/${src}`, alt, kind, label, width: 1024, height: 1024, hasWhiteBg, bounds });

const colageno = [
  img("colageno-front.webp", "Colágeno Puro by Agus Dandri, pote de 300 g, vista frontal", "front", "Frente", false),
  img("colageno-nutricion.webp", "Información nutricional de Colágeno Puro por porción de 10 g", "nutrition", "Tabla nutricional", true),
  img("colageno-editorial.webp", "Colágeno Puro sobre mármol en estudio", "editorial", "Estudio", false),
];

const vitaminaC = [
  img("vitamina-c-front.webp", "Vitamina C Pura by Agus Dandri, pote de 300 g, vista frontal", "front", "Frente", true, { x0: 0.241, x1: 0.732, y1: 0.845 }),
  img("vitamina-c-nutricion.webp", "Información nutricional de Vitamina C Pura por porción de 1 g", "nutrition", "Tabla nutricional", true),
  img("vitamina-c-editorial.webp", "Vitamina C Pura sobre mármol en estudio", "editorial", "Estudio", false),
];

const magnesio = [
  img("magnesio-front.webp", "Citrato de Magnesio Go Smart, frasco de 30 cápsulas vegetales, vista frontal", "front", "Frente", true, { x0: 0.302, x1: 0.689, y1: 0.919 }),
  img("magnesio-back.webp", "Dorso del frasco de Citrato de Magnesio con ingesta recomendada y rótulo", "back", "Dorso", true, { x0: 0.293, x1: 0.688, y1: 0.918 }),
];

const detox = [
  img("detox-blend.webp", "Go Smart Detox Blend de cúrcuma, canela y jengibre, 50 g", "front", "Frente", true, { x0: 0.351, x1: 0.65, y1: 0.804 }),
  img("detox-blend-tapa.webp", "Tapa del Detox Blend con sello Go Smart", "editorial", "Tapa", false),
];

const comboSinergico = [
  img("combo-sinergico.webp", "Combo Sinérgico: Colágeno Puro y Vitamina C Pura", "front", "Frente", true, { x0: 0.096, x1: 0.926, y1: 0.882 }),
];

export const media: Record<MediaKey, MediaAsset> = {
  hero: {
    src: comboSinergico[0].src,
    type: "image",
    alt: comboSinergico[0].alt,
    figure: "FIG. 00",
    label: "SISTEMA GO FUNCTIONAL SMART",
    hasWhiteBg: true,
    gallery: comboSinergico,
  },
  colagenoPuro: {
    src: colageno[0].src,
    type: "image",
    alt: colageno[0].alt,
    figure: "FIG. 01",
    label: "COLÁGENO PURO 300G",
    hasWhiteBg: false,
    gallery: colageno,
  },
  vitaminaCPura: {
    src: vitaminaC[0].src,
    type: "image",
    alt: vitaminaC[0].alt,
    figure: "FIG. 02",
    label: "VITAMINA C PURA 300G",
    hasWhiteBg: true,
    gallery: vitaminaC,
  },
  citratoMagnesio: {
    src: magnesio[0].src,
    type: "image",
    alt: magnesio[0].alt,
    figure: "FIG. 03",
    label: "CITRATO DE MAGNESIO 500",
    hasWhiteBg: true,
    gallery: magnesio,
  },
  detoxBlend: {
    src: detox[0].src,
    type: "image",
    alt: detox[0].alt,
    figure: "FIG. 04",
    label: "DETOX BLEND 50G",
    hasWhiteBg: true,
    gallery: detox,
  },
  comboSinergico: {
    src: comboSinergico[0].src,
    type: "image",
    alt: comboSinergico[0].alt,
    figure: "FIG. 05",
    label: "COMBO SINÉRGICO",
    hasWhiteBg: true,
    gallery: comboSinergico,
  },
  // Sin foto oficial limpia: la de Buda trae overlays de marketing y la de gosmart.ar tiene texto deformado por IA.
  comboFull: {
    src: null,
    type: "image",
    alt: "Combo GO Sistema Completo: Colágeno, Vitamina C y Citrato de Magnesio",
    figure: "FIG. 06",
    label: "COMBO GO · SISTEMA COMPLETO",
  },
  goReset: {
    src: "/media/go-reset.webp",
    type: "image",
    alt: "Guía digital del Método GO RESET en tablet y teléfono",
    figure: "FIG. 07",
    label: "MÉTODO GO RESET™",
    hasWhiteBg: false,
  },
};

export const logo = { src: "/media/logo-gosmart.webp", width: 960, height: 960, alt: "Go Functional Smart" };

// Fotos de Agus Dandri con los productos. Para sumar más: copiar a /public/media/agus/ y agregar acá.
// Con 2 o más fotos se activa la galería de la sección "La firma".
export const agusPhotos: GalleryImage[] = [
  {
    src: "/media/agus/agus-colageno-vitamina-c.webp",
    alt: "Agus Dandri sosteniendo Colágeno Puro y Vitamina C Pura",
    kind: "editorial",
    label: "Colágeno + Vitamina C",
    width: 574,
    height: 1024,
    hasWhiteBg: false,
  },
];
