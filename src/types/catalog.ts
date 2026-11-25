export type ProductId =
  | "colageno-puro"
  | "vitamina-c-pura"
  | "citrato-magnesio-500"
  | "detox-blend";

export type CoreProductId = Exclude<ProductId, "detox-blend">;

export type ComboId = "combo-sinergico" | "combo-go" | "duo-recuperacion";

export type MediaKey =
  | "hero"
  | "colagenoPuro"
  | "vitaminaCPura"
  | "citratoMagnesio"
  | "detoxBlend"
  | "comboSinergico"
  | "comboFull"
  | "goReset";

export type AspectRatio = `${number}/${number}`;

export type GalleryKind = "front" | "back" | "nutrition" | "editorial";

export interface GalleryImage {
  src: string;
  alt: string;
  kind: GalleryKind;
  label: string;
  width: number;
  height: number;
  /** Fondo blanco puro (borde ≥253): se integra con mix-blend-multiply. Si es false, va a sangre (object-cover). */
  hasWhiteBg: boolean;
  /** Bounding box normalizado del envase (solo fondo blanco): ancla la sombra de contacto a la base real. */
  bounds?: { x0: number; x1: number; y1: number };
}

export interface MediaAsset {
  src: string | null;
  type: "image" | "video";
  poster?: string;
  alt: string;
  figure: string;
  label: string;
  hasWhiteBg?: boolean;
  gallery?: GalleryImage[];
}

export interface Cutout {
  src: string;
  width: number;
  height: number;
}

export interface ProductTheme {
  bg: string;
  fg: string;
  accent: string;
}

export interface KeySpec {
  value: number;
  unit: string;
  label: string;
}

export interface Cutout {
  src: string;
  width: number;
  height: number;
}

export interface ProductTheme {
  bg: string;
  fg: string;
  accent: string;
}

export interface KeySpec {
  value: number;
  unit: string;
  label: string;
}

export interface Price {
  list: number;
  transfer: number;
  previous?: number;
  discountLabel?: string;
}

export interface Installments {
  count: number;
  amount: number;
}

export interface NutritionRow {
  label: string;
  value: string;
  detail?: string;
}

export interface NutritionTable {
  serving: string;
  rows: NutritionRow[];
}

export interface ProtocolStep {
  label: string;
  value: string;
}

export interface Protocol {
  moment: string;
  steps: ProtocolStep[];
  rules: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: ProductId;
  code: string;
  index: string;
  tier: "core" | "complement";
  name: string;
  coBrand?: string;
  tagline: string;
  format?: string;
  attributes: string[];
  ingredients: string;
  nutrition?: NutritionTable;
  protocol?: Protocol;
  focus: string[];
  synergy?: {
    pairsWith: ProductId[];
    note: string;
  };
  faqs: FaqItem[];
  price: Price;
  url: string;
  mediaKey: MediaKey;
  cutout?: Cutout;
  theme?: ProductTheme;
  keySpec?: KeySpec;
}

export interface ScheduleSlot {
  moment: "AM" | "PM" | "NOCHE";
  productId: ProductId;
  instruction: string;
}

export interface Synergy {
  pair: [ProductId, ProductId];
  label: string;
  title: string;
  body: string;
}

export interface Combo {
  id: ComboId;
  name: string;
  goal: string;
  objective: string;
  includes: ProductId[];
  schedule: ScheduleSlot[];
  price: Price;
  installments: Installments;
  url: string;
  note?: string;
  mediaKey?: MediaKey;
  synergies: Synergy[];
}

export interface CommercialTerms {
  storeUrl: string;
  installments: { count: number; minAmount: number };
  transferDiscount: number;
  freeShippingFrom: number;
  coBranding: string[];
  legal: string[];
}
