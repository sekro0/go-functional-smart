import type { Combo, ComboId, Synergy, CommercialTerms, CoreProductId, Product, ProductId } from "@/types/catalog";

const BUDA = "https://www.budamarket.com.ar";

export const STORE_URL = `${BUDA}/por-marcas/go-smart/`;
// Slug verificado en el JSON-LD de budamarket.com.ar ("COMBO GO - COLAGENO + VITAMINA C + MAGNESIO").
export const COMBO_GO_URL = `${BUDA}/productos/combo-go-colageno-vitamina-c-magnesio-c5g4o/`;

export const commercialTerms: CommercialTerms = {
  storeUrl: STORE_URL,
  installments: { count: 2, minAmount: 50000 },
  transferDiscount: 0.1,
  freeShippingFrom: 180000,
  coBranding: [
    "Fórmulas by Agus Dandri",
    "Método GO RESET™ por Vanessa Pekerman (Coaching Nutricional)",
  ],
  legal: [
    "Elaborado bajo normativa ANMAT / INAL.",
    "Sin TACC.",
    "Suplementa dietas insuficientes.",
    "Consulte a su médico y/o farmacéutico.",
  ],
};

export const products: Record<ProductId, Product> = {
  "colageno-puro": {
    id: "colageno-puro",
    code: "GFS-01",
    index: "01",
    tier: "core",
    name: "Colágeno Puro",
    coBrand: "by Agus Dandri",
    tagline: "Péptidos bioactivos de colágeno tipo I y III. Un solo ingrediente, 10 g por porción.",
    format: "300 g en polvo · 30 porciones de 10 g",
    attributes: ["Sin sabor", "Sin TACC", "Sin maltodextrina", "Sin azúcares"],
    ingredients:
      "100% péptidos bioactivos de colágeno hidrolizado tipo I y III (GelcoPEP®). Sin maltodextrina, sin azúcares, sin saborizantes ni colorantes.",
    nutrition: {
      serving: "Por porción de 10 g",
      rows: [
        {
          label: "Proteínas de alto valor biológico",
          value: "9 g",
          detail: "Glicina, prolina, hidroxiprolina, arginina, lisina",
        },
        { label: "Carbohidratos", value: "0 g" },
        { label: "Azúcares", value: "0 g" },
        { label: "Grasas totales", value: "0 g" },
      ],
    },
    protocol: {
      moment: "Para romper el ayuno o antes de dormir",
      steps: [
        { label: "Dosis diaria", value: "1 scoop (10 g)" },
        { label: "Momento", value: "Romper el ayuno o antes de dormir" },
        {
          label: "Disolución",
          value: "Agua a temperatura ambiente, café, infusiones o licuados. Solubilidad instantánea.",
        },
      ],
      rules: ["No mezclar en líquidos por encima de 80°C para evitar la degradación de los péptidos."],
    },
    focus: [
      "Firmeza y elasticidad dérmica",
      "Articulaciones y tendones",
      "Tejido conectivo",
      "Estructura vascular",
    ],
    synergy: {
      pairsWith: ["vitamina-c-pura", "citrato-magnesio-500"],
      note: "La vitamina C es cofactor obligatorio en la síntesis de fibras de colágeno. Por eso se toma por separado y en dosis funcional, no como aditivo simbólico.",
    },
    faqs: [
      {
        question: "¿Puedo mezclarlo con café caliente?",
        answer:
          "Sí, siempre que el líquido esté por debajo de 80°C. Por encima de esa temperatura los péptidos se degradan. Dejá reposar el café un par de minutos antes de agregarlo.",
      },
      {
        question: "¿Por qué no trae vitamina C incluida?",
        answer:
          "Porque la mayoría de las fórmulas combinadas usa dosis simbólicas. La Vitamina C Pura se toma aparte, en ayunas y en la cantidad correcta para que funcione como cofactor.",
      },
      {
        question: "¿Tiene sabor?",
        answer: "No. Es un único ingrediente, sin saborizantes ni colorantes, y se disuelve sin alterar la bebida.",
      },
    ],
    price: { list: 44590, transfer: 40131 },
    url: `${BUDA}/productos/colageno-go-functional-by-agus-dandri-ihbd8/`,
    mediaKey: "colagenoPuro",
    cutout: { src: "/media/cutouts/colageno-front.webp", width: 479, height: 755 },
    theme: { bg: "#5FC6CC", fg: "#0E1D1E", accent: "#0B5F66" },
    keySpec: { value: 10, unit: "g", label: "Péptidos tipo I y III por porción" },
  },
  "vitamina-c-pura": {
    id: "vitamina-c-pura",
    code: "GFS-02",
    index: "02",
    tier: "core",
    name: "Vitamina C Pura",
    coBrand: "by Agus Dandri",
    tagline: "Ácido ascórbico puro. 1000 mg por porción, sin excipientes.",
    format: "300 g en polvo con dosificador",
    attributes: ["Sin sabor", "100% Vegana", "Sin TACC"],
    ingredients: "100% ácido ascórbico puro, sin excipientes ni saborizantes.",
    nutrition: {
      serving: "Por porción de 1 g",
      rows: [
        { label: "Vitamina C", value: "1000 mg", detail: "2222% IDR" },
        { label: "Azúcares", value: "0 g" },
        { label: "Grasas", value: "0 g" },
        { label: "Sodio", value: "0 mg" },
      ],
    },
    protocol: {
      moment: "En ayunas, 15 a 30 minutos antes de ingerir alimentos",
      steps: [
        { label: "Semana 1", value: "1000 mg/día (2 cucharaditas del envase)" },
        {
          label: "Desde semana 3",
          value: "Escalable entre 2000 y 5000 mg/día según tolerancia digestiva, dividido entre mañana y tarde",
        },
      ],
      rules: ["Tomar en ayunas y esperar 15 a 30 minutos antes de ingerir alimentos."],
    },
    focus: [
      "Cofactor para la síntesis de fibras de colágeno",
      "Escudo antioxidante celular",
      "Soporte inmune",
    ],
    synergy: {
      pairsWith: ["colageno-puro"],
      note: "Funciona como switch metabólico: sin vitamina C suficiente, el organismo no completa la síntesis de colágeno.",
    },
    faqs: [
      {
        question: "¿Por qué la dosis es progresiva?",
        answer:
          "Para respetar la tolerancia digestiva. Se empieza con 1000 mg/día la primera semana y, desde la tercera, se puede escalar entre 2000 y 5000 mg/día dividido entre mañana y tarde.",
      },
      {
        question: "¿Por qué en ayunas?",
        answer: "Para maximizar su absorción. Esperá 15 a 30 minutos antes de ingerir alimentos.",
      },
      {
        question: "¿Es apta para veganos?",
        answer: "Sí. Es 100% ácido ascórbico, vegana y sin TACC.",
      },
    ],
    price: { list: 32590, transfer: 29331 },
    url: `${BUDA}/productos/vitamina-c-pura-by-agus-dandri-go-functional-smart-7kgii/`,
    mediaKey: "vitaminaCPura",
    cutout: { src: "/media/cutouts/vitamina-c-front.webp", width: 479, height: 653 },
    theme: { bg: "#E6765C", fg: "#1C0F0A", accent: "#7A2614" },
    keySpec: { value: 1000, unit: "mg", label: "Ácido ascórbico por porción" },
  },
  "citrato-magnesio-500": {
    id: "citrato-magnesio-500",
    code: "GFS-03",
    index: "03",
    tier: "core",
    name: "Citrato de Magnesio 500",
    tagline: "500 mg de citrato por cápsula. 80 mg de magnesio elemental.",
    format: "Cápsulas vegetales",
    attributes: ["Apto veganos", "Sin TACC"],
    ingredients: "Citrato de magnesio en cápsula vegetal.",
    nutrition: {
      serving: "Por cápsula",
      rows: [
        { label: "Citrato de Magnesio", value: "500 mg" },
        { label: "Magnesio elemental", value: "80 mg", detail: "31% IDR" },
      ],
    },
    protocol: {
      moment: "Toma nocturna",
      steps: [
        { label: "Dosis", value: "1 cápsula" },
        {
          label: "Momento",
          value: "Por la noche, o post-entrenamiento según indicación profesional",
        },
      ],
      rules: ["Favorece la relajación neuromuscular y el descanso reparador."],
    },
    focus: [
      "Sistema nervioso",
      "Función muscular",
      "Recuperación física",
      "Salud ósea",
      "Calidad de sueño",
    ],
    synergy: {
      pairsWith: ["colageno-puro"],
      note: "Cierra el protocolo en la franja nocturna: el colágeno aporta sustrato tisular y el magnesio acompaña la recuperación y el descanso.",
    },
    faqs: [
      {
        question: "¿Por qué citrato y no otra forma de magnesio?",
        answer: "El citrato es una forma orgánica de magnesio. Cada cápsula aporta 80 mg de magnesio elemental (31% IDR).",
      },
      {
        question: "¿Cuándo conviene tomarlo?",
        answer: "Por la noche, para acompañar el descanso, o post-entrenamiento según indicación profesional.",
      },
    ],
    price: { list: 12800, transfer: 11520 },
    url: `${BUDA}/productos/citrato-de-magnesio-500-go-functional-smart-0l538/`,
    mediaKey: "citratoMagnesio",
    cutout: { src: "/media/cutouts/magnesio-front.webp", width: 399, height: 858 },
    theme: { bg: "#2A1714", fg: "#F1E4D8", accent: "#D0623A" },
    keySpec: { value: 500, unit: "mg", label: "Citrato de magnesio por cápsula" },
  },
  "detox-blend": {
    id: "detox-blend",
    code: "GFS-04",
    index: "04",
    tier: "complement",
    name: "Go Smart Detox Blend",
    tagline: "Cúrcuma, canela y jengibre.",
    format: "50 g",
    attributes: ["Sin TACC"],
    ingredients: "Cúrcuma, canela y jengibre.",
    focus: [],
    faqs: [],
    price: { list: 4750, transfer: 4275 },
    url: `${BUDA}/productos/go-smart-detox-blend/`,
    mediaKey: "detoxBlend",
  },
};

export const isCoreProduct = (id: ProductId): id is CoreProductId => products[id].tier === "core";

export const coreProducts: Product[] = [
  products["colageno-puro"],
  products["vitamina-c-pura"],
  products["citrato-magnesio-500"],
];

export const complementProducts: Product[] = [products["detox-blend"]];

const SYNERGY_C_COLAGENO: Synergy = {
  pair: ["vitamina-c-pura", "colageno-puro"],
  label: "Vitamina C × Colágeno",
  title: "Cofactor + sustrato",
  body: "El colágeno aporta los péptidos tipo I y III. La vitamina C es el cofactor obligatorio de las enzimas que los ensamblan en fibras: sin ella, la síntesis no se completa. Por eso se toma aparte y en dosis funcional (1000 mg), no como aditivo simbólico dentro del pote.",
};

const SYNERGY_COLAGENO_MG: Synergy = {
  pair: ["colageno-puro", "citrato-magnesio-500"],
  label: "Colágeno × Magnesio",
  title: "Estructura + recuperación",
  body: "El colágeno aporta sustrato para tejido conectivo, articulaciones y tendones. El magnesio cierra el día: relajación neuromuscular y descanso reparador, la franja en la que el cuerpo se recupera.",
};

export const combos: Record<ComboId, Combo> = {
  "combo-sinergico": {
    id: "combo-sinergico",
    name: "Combo Sinérgico",
    goal: "Piel, articulaciones y síntesis de colágeno",
    objective: "Piel, cabello, uñas, articulaciones y síntesis real de colágeno.",
    includes: ["colageno-puro", "vitamina-c-pura"],
    schedule: [
      { moment: "AM", productId: "vitamina-c-pura", instruction: "En ayunas, 15–30 min antes de comer" },
      { moment: "AM", productId: "colageno-puro", instruction: "10 g al romper el ayuno, debajo de 80°C" },
    ],
    price: { list: 77180, transfer: 69462 },
    installments: { count: 2, amount: 38590 },
    url: `${BUDA}/productos/combo-sinergico-colageno-vitamina-c-1hhd9/`,
    mediaKey: "comboSinergico",
    synergies: [SYNERGY_C_COLAGENO],
  },
  "combo-go": {
    id: "combo-go",
    name: "Combo GO — Sistema Completo",
    goal: "Sistema integral 360° (Día + Noche)",
    objective: "Protocolo Integral 360°: síntesis tisular AM + recuperación y descanso PM.",
    includes: ["colageno-puro", "vitamina-c-pura", "citrato-magnesio-500"],
    schedule: [
      { moment: "AM", productId: "vitamina-c-pura", instruction: "En ayunas, 15–30 min antes de comer" },
      { moment: "AM", productId: "colageno-puro", instruction: "10 g al romper el ayuno, debajo de 80°C" },
      { moment: "NOCHE", productId: "citrato-magnesio-500", instruction: "1 cápsula antes de dormir" },
    ],
    price: { list: 82000, transfer: 73800, previous: 89980, discountLabel: "9% OFF" },
    installments: { count: 2, amount: 41000 },
    url: COMBO_GO_URL,
    mediaKey: "comboFull",
    synergies: [SYNERGY_C_COLAGENO, SYNERGY_COLAGENO_MG],
  },
  "duo-recuperacion": {
    id: "duo-recuperacion",
    name: "Protocolo Recuperación & Descanso",
    goal: "Recuperación muscular y descanso profundo",
    objective: "Entrenamiento, articulaciones, recuperación tisular y descanso nocturno.",
    includes: ["colageno-puro", "citrato-magnesio-500"],
    schedule: [
      { moment: "PM", productId: "colageno-puro", instruction: "10 g post-entreno o antes de dormir, debajo de 80°C" },
      { moment: "NOCHE", productId: "citrato-magnesio-500", instruction: "1 cápsula por la noche" },
    ],
    price: { list: 57390, transfer: 51651 },
    installments: { count: 2, amount: 28695 },
    url: STORE_URL,
    note: "Se arma con los productos individuales en Buda Market: Colágeno Puro ($44.590) + Citrato de Magnesio 500 ($12.800).",
    synergies: [SYNERGY_COLAGENO_MG],
  },
};

export const comboList: Combo[] = [combos["combo-sinergico"], combos["combo-go"], combos["duo-recuperacion"]];
