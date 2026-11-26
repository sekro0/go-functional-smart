import type { CoreProductId, FaqItem } from "@/types/catalog";
import { STORE_URL } from "@/data/products";

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface ChronoSlot {
  id: string;
  index: string;
  label: string;
  product: CoreProductId;
  title: string;
  mechanism: string;
  dose: string;
}

export interface IndexedBlock {
  index: string;
  title: string;
  body: string;
}

export const site = {
  name: "Go Functional Smart",
  wordmark: "GO FUNCTIONAL SMART",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gosmart.ar",
  title: "Go Functional Smart — Colágeno, Vitamina C y Magnesio puros",
  description:
    "Fórmulas de un solo ingrediente by Agus Dandri: Colágeno Puro GelcoPEP®, Vitamina C Pura 1000 mg y Citrato de Magnesio 500. Sin TACC, sin azúcares ni maltodextrina. Venta oficial en Buda Market.",
  keywords: [
    "colágeno hidrolizado",
    "colágeno puro",
    "vitamina C pura",
    "citrato de magnesio",
    "Agus Dandri",
    "Go Functional Smart",
    "suplementos sin TACC",
    "GelcoPEP",
    "Buda Market",
    "medicina funcional Argentina",
  ],
} as const;

export const topBar = {
  items: ["2 CUOTAS SIN INTERÉS DESDE $50.000", "10% OFF TRANSFERENCIA", "ENVÍO GRATIS DESDE $180.000"],
  suffix: "DESPACHO OFICIAL BUDA MARKET",
} as const;

export const navLinks: NavLink[] = [
  { label: "Fórmulas", href: "#formulas" },
  { label: "Sinergia", href: "#sinergia" },
  { label: "Protocolo", href: "#protocolo" },
  { label: "Método GO Reset", href: "#go-reset" },
];

export const storeCta = { label: "Tienda Oficial", href: STORE_URL };

export const menuLabels = { open: "Abrir menú", close: "Cerrar menú", title: "Navegación" };

export const hero = {
  eyebrow: "MEDICINA FUNCIONAL · FÓRMULAS PURAS",
  titleLines: ["Pureza clínica.", "Sin rellenos ni", "dosis simbólicas."],
  body: "Colágeno, vitamina C y magnesio formulados por separado, cada uno en su dosis funcional y sin excipientes. Tres ingredientes que se combinan según el momento del día, no dentro del mismo frasco.",
  primaryCta: { label: "Armar mi protocolo", href: "#protocolo" },
  secondaryCta: { label: "Explorar fórmulas", href: "#formulas" },
  mediaNote: "0% ADITIVOS · SIN TACC · ANMAT / INAL",
  specs: [
    { value: "100%", label: "Ingrediente activo" },
    { value: "0 g", label: "Azúcares / Maltodextrina" },
    { value: "GelcoPEP®", label: "Péptidos de colágeno" },
    { value: "Oficial", label: "Venta Buda Market" },
  ],
} as const;

export const philosophy = {
  eyebrow: "¿POR QUÉ POR SEPARADO?",
  quote:
    "No le agregamos vitamina C al colágeno, porque la mayoría de las marcas usa dosis simbólicas. Preferimos que la tomes en la cantidad correcta para que realmente funcione.",
  attribution: "Go Functional Smart",
  chronoEyebrow: "CRONOBIOLOGÍA",
  chronoTitle: "Cronobiología de la sinergia",
  chronoCta: "Abrir ficha técnica",
  chronoBody:
    "Cada fórmula tiene su franja. Tomadas en el orden correcto, la vitamina C activa la síntesis, el colágeno aporta el sustrato y el magnesio acompaña la recuperación.",
};

export const chronobiology: ChronoSlot[] = [
  {
    id: "am",
    index: "01",
    label: "MAÑANA / AYUNAS",
    product: "vitamina-c-pura",
    title: "Vitamina C Pura",
    mechanism:
      "Se toma en ayunas, 15 a 30 minutos antes de comer. Actúa como cofactor enzimático de la síntesis de colágeno: sin ella, las fibras no se completan.",
    dose: "1000 mg/día en semana 1 · escalable a 2000–5000 mg/día",
  },
  {
    id: "fasting",
    index: "02",
    label: "ROMPER AYUNO O PM",
    product: "colageno-puro",
    title: "Colágeno Puro",
    mechanism:
      "10 g de péptidos tipo I y III para romper el ayuno o antes de dormir. Se disuelve en agua, café o infusiones siempre por debajo de 80°C para no degradarlos.",
    dose: "1 scoop (10 g) · líquido < 80°C",
  },
  {
    id: "night",
    index: "03",
    label: "NOCHE",
    product: "citrato-magnesio-500",
    title: "Citrato de Magnesio 500",
    mechanism:
      "Toma nocturna para favorecer la relajación neuromuscular y el descanso reparador. Soporte del sistema nervioso y la recuperación física.",
    dose: "1 cápsula · 500 mg (80 mg Mg elemental)",
  },
];

export const founder = {
  eyebrow: "LA FIRMA EN EL ENVASE",
  name: "Agus Dandri",
  role: "Fórmulas by Agus Dandri",
  body: "Colágeno Puro y Vitamina C Pura llevan su firma en la etiqueta. Dos ingredientes únicos, cada uno en su dosis, pensados para tomarse por separado.",
  caption: "Agus Dandri con Colágeno Puro y Vitamina C Pura",
};

export const marquee = [
  "Un ingrediente por envase",
  "0 g azúcares",
  "Sin maltodextrina",
  "Sin TACC",
  "GelcoPEP®",
  "ANMAT / INAL",
  "Dosis funcionales",
];

export const theater = {
  eyebrow: "FÓRMULAS CORE",
  intro: "Tres envases. Tres ingredientes. Ninguna mezcla.",
  specLabel: "DOSIS DECLARADA",
  detailCta: "Ficha técnica",
  buyCta: "Comprar",
};

export const catalog = {
  eyebrow: "FÓRMULAS CORE",
  title: "Tres fórmulas. Un ingrediente cada una.",
  body: "Sin mezclas que diluyen la dosis. Cada envase declara exactamente lo que contiene.",
  detailCta: "Ficha técnica y uso",
  buyCta: "Comprar en Buda Market",
  buyShort: "Comprar",
  transferLabel: "10% OFF transferencia",
  listLabel: "Precio lista",
};

export const sheet = {
  close: "Cerrar ficha técnica",
  zoomIn: "Ampliar foto",
  zoomOut: "Reducir foto",
  galleryLabel: "Fotos del producto",
  composition: "Composición",
  tabs: {
    nutrition: "Tabla Nutricional",
    protocol: "Protocolo de Toma",
    synergy: "Sinergia & Dudas",
  },
  protocolMoment: "Momento óptimo",
  rules: "Regla crítica",
  pairsWith: "Se combina con",
  faqs: "Preguntas clave",
  certifications: "SIN TACC · ANMAT / INAL",
  listLabel: "Precio lista",
  transferLabel: "Transferencia · 10% OFF",
  installments: (count: number, amount: string) => `${count} cuotas sin interés de ${amount}`,
  buyCta: "Comprar en Buda Market",
};

export const protocolBuilder = {
  eyebrow: "SELECTOR DE PROTOCOLO",
  title: "Elegí el objetivo. El protocolo se arma solo.",
  body: "Tres combinaciones oficiales disponibles en Buda Market, con horario de toma y desglose de precio.",
  checkoutCta: "Ir al checkout en Buda Market",
  synergyLabel: "POR QUÉ JUNTOS",
};

export const goReset = {
  eyebrow: "MÉTODO GO RESET™",
  title: "Treinta días de acompañamiento nutricional.",
  author: "Vanessa Pekerman",
  authorRole: "Coaching Nutricional",
  body: "El suplemento es una parte del sistema. GO RESET™ ordena los hábitos que determinan si la fórmula rinde: qué comés, cómo dormís, cómo gestionás el estrés y cuánto te movés.",
  cta: "Explorar el método (30 días)",
  pillars: [
    {
      index: "01",
      title: "Alimentación Inteligente",
      body: "Estructura de comidas y elección de alimentos que sostienen el protocolo sin dietas restrictivas.",
    },
    {
      index: "02",
      title: "Descanso Inteligente",
      body: "Rutinas de sueño consistentes como base de la recuperación tisular y hormonal.",
    },
    {
      index: "03",
      title: "Manejo del Estrés",
      body: "Herramientas prácticas para reducir la carga diaria y sostener la constancia.",
    },
    {
      index: "04",
      title: "Movimiento Inteligente",
      body: "Actividad física adaptada a cada etapa, priorizando regularidad por sobre intensidad.",
    },
  ] satisfies IndexedBlock[],
};

export const timeline = {
  eyebrow: "HORIZONTE DE CONSTANCIA",
  title: "Qué esperar, y cuándo.",
  body: "Resultados que dependen de la constancia, no de promesas.",
  stages: [
    {
      index: "01 · CORTO PLAZO",
      title: "Semanas 1–3",
      body: "Tolerancia digestiva, adaptación de dosis, energía sostenida y calidad de descanso.",
    },
    {
      index: "02 · MEDIANO PLAZO",
      title: "Mes 1–3",
      body: "Hidratación y firmeza dérmica, recuperación post-esfuerzo y confort articular.",
    },
    {
      index: "03 · LARGO PLAZO",
      title: "+3 Meses",
      body: "Soporte estructural sostenido y pausas conscientes según protocolo profesional.",
    },
  ] satisfies IndexedBlock[],
};

export const faq = {
  eyebrow: "PREGUNTAS FRECUENTES",
  title: "Dudas reales, respuestas directas.",
  items: [
    {
      question: "¿Qué significa que sean fórmulas puras?",
      answer:
        "Cada producto contiene un único ingrediente activo: péptidos de colágeno GelcoPEP®, ácido ascórbico o citrato de magnesio. Sin maltodextrina, azúcares, saborizantes ni colorantes. Todas las fórmulas son Sin TACC.",
    },
    {
      question: "¿Por qué el colágeno no se puede mezclar con líquidos calientes?",
      answer:
        "Por encima de 80°C los péptidos se degradan y pierden su función. Podés tomarlo en agua a temperatura ambiente, café o infusiones tibias y licuados.",
    },
    {
      question: "¿Cómo se dosifica la Vitamina C?",
      answer:
        "De forma progresiva: 1000 mg/día durante la primera semana (2 cucharaditas del envase). Desde la tercera semana se puede escalar entre 2000 y 5000 mg/día según tolerancia digestiva, dividido entre mañana y tarde. Siempre en ayunas, 15 a 30 minutos antes de comer.",
    },
    {
      question: "¿Hay que hacer descansos?",
      answer:
        "Se recomiendan pausas conscientes cada 3 meses, según indicación de tu profesional de salud.",
    },
    {
      question: "¿Cómo compro y cuáles son los medios de pago?",
      answer:
        "La venta y el despacho oficial se realizan a través de Buda Market: 2 cuotas sin interés desde $50.000, 10% OFF pagando por transferencia y envío gratis desde $180.000.",
    },
    {
      question: "¿Necesito consultar a un médico antes de empezar?",
      answer:
        "Sí. Los suplementos dietarios complementan dietas insuficientes y no reemplazan una alimentación variada. Consultá a tu médico y/o farmacéutico, especialmente si estás embarazada, en lactancia o bajo medicación.",
    },
  ] satisfies FaqItem[],
};

export const footer = {
  ctaEyebrow: "DESPACHO OFICIAL",
  ctaTitle: "La colección completa, en Buda Market.",
  ctaLabel: "Ir a la tienda oficial",
  ctaHref: STORE_URL,
  links: [
    { label: "gosmart.ar", href: "https://gosmart.ar" },
    { label: "@gosmartla", href: "https://www.instagram.com/gosmartla/" },
    { label: "budamarket.com.ar", href: "https://www.budamarket.com.ar" },
  ],
  credit: "Diseño e ingeniería — KOSEK",
  legal:
    "Elaborado bajo normativa ANMAT / INAL. Sin TACC. Suplementa dietas insuficientes. Consulte a su médico y/o farmacéutico.",
};
